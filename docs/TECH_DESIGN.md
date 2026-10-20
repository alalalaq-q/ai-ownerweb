# 技术设计文档 · 星空个人主页

| 项目 | 内容 |
| --- | --- |
| 文档版本 | v1.0 |
| 对应需求 | `docs/PRD.md`（v3.0 简化版） |
| 用途 | AI 课程作业 / 个人作品展示 |
| 目标 | 用一个仓库同时交付「前台展示 + 可改内容的后台」 |

---

## 1. 目标与技术取舍

需求只有三件事：深色星空、多端适配、后台可改内容。所以技术选型的原则是「一个进程、一个数据文件、零外部依赖」：

- 不引入数据库、云服务、对象存储，执行 `npm run dev` 就能完整运行；
- 不引入 UI 组件库和 CSS 框架，样式全部写在 `app/globals.css`；
- 不引入 Markdown 库，用一个约 170 行的自写解析器（components/Prose.tsx）覆盖作业需要的语法；
- 前台与后台放在同一个 Next.js 项目里，数据读写抽到 `lib/db.ts` 一处。

这样做的代价写在「6. 局限与风险」里，答辩时需要能说清楚。

---

## 2. 技术栈

### 2.1 前端

| 项 | 选择 | 版本 | 说明 |
| --- | --- | --- | --- |
| 框架 | Next.js（App Router） | 15.5.28 | Server Components 直接读数据，无需自建 API |
| UI 运行时 | React | 19.1.10 | 只有 4 个客户端组件（Starfield、Nav、AdminNav、ConfirmButton） |
| 语言 | TypeScript | 5.9（package.json 声明 ^5.7，strict） | `npx tsc --noEmit` 零错误 |
| 样式 | 原生 CSS | — | `app/globals.css` 单文件，CSS 变量 + Grid/Flex |
| 动效 | 原生 Canvas 2D + CSS | — | 星空背景；不引入动画库 |
| 字体 | 系统中文栈 | — | PingFang SC / HarmonyOS Sans / Microsoft YaHei |

### 2.2 后端

没有独立的服务端进程，全部跑在 Next.js 的 Node 运行时里：

| 项 | 方案 |
| --- | --- |
| 页面渲染 | React Server Components，服务端直接 `await readDb()` |
| 写操作 | Server Actions（`app/admin/actions.ts`，文件顶部 `"use server"`） |
| 校验 | 每个 action 先 `guard()` 判登录，再校验必填字段 |
| 刷新 | action 内 `revalidatePath("/", "layout")` 后 `redirect(...)` |
| 缓存 | 根布局 `export const dynamic = "force-dynamic"`，保证保存后前台立即生效 |

### 2.3 数据存储

| 项 | 方案 |
| --- | --- |
| 存储介质 | 项目根目录 `data/db.json`（单个 JSON 文件） |
| 读写方式 | `fs/promises`，Node 运行时（不能用 Edge） |
| 写入安全 | 先写 `db.json.tmp`，再 `rename` 覆盖，避免写一半损坏 |
| 并发控制 | 模块级 Promise 队列 `updateDb()`，写操作串行执行 |
| 首次启动 | `db.json` 不存在时自动写入内置示例数据（`lib/db.ts` 的 `seed`） |
| 版本管理 | `data/db.json` 已加入 `.gitignore`，不入库 |
| 线上只读模式 | 检测到 Vercel / Cloudflare Pages，或手动设置 `READ_ONLY_DATA=1` 时，`readDb()` 直接返回构建时内嵌的 `data/content.json`，不读写文件系统；写操作被拒绝 |
| 快照生成 | `npm run snapshot` 把当前 `data/db.json` 导出为 `data/content.json`（需要提交） |

### 2.4 鉴权

| 项 | 方案 |
| --- | --- |
| 账号 | 单一管理员，不开放注册 |
| 密码 | 环境变量 `ADMIN_PASSWORD`，未配置时默认 `admin123` |
| 会话 | HMAC-SHA256 签名的 Cookie，7 天有效 |
| Cookie 属性 | `httpOnly`、`sameSite=lax`、`path=/`，生产环境 `secure` |
| 比较方式 | `crypto.timingSafeEqual`，避免时序攻击 |
| 拦截位置 | `app/admin/(panel)/layout.tsx` 中 `if (!(await isLoggedIn())) redirect("/admin/login")` |

---

## 3. 技术架构

```
浏览器
  │
  ├── 访客请求 ──► app/(site)/*  (Server Component)
  │                   └── await readDb() ──► lib/db.ts ──► data/db.json
  │
  └── 管理员请求 ─► app/admin/(panel)/*（布局先校验 Cookie）
                      ├── 读取：readDb()
                      └── 写入：<form action={serverAction}>
                                └── app/admin/actions.ts
                                      ├── guard() 校验登录
                                      ├── 校验字段
                                      ├── updateDb(mutate) 串行写盘
                                      ├── revalidatePath("/", "layout")
                                      └── redirect("...?saved=1")
```

分层职责：

1. **页面层**（`app/**/page.tsx`）：只负责取数据和渲染，不写业务判断。
2. **动作层**（`app/admin/actions.ts`）：所有写操作唯一入口，负责鉴权、校验、落库、跳转。
3. **数据层**（`lib/db.ts`）：唯一的文件读写实现，对外暴露 `readDb` / `writeDb` / `updateDb` / `newId` / `today`。
4. **展示组件层**（`components/`）：无状态优先，只有星空 Canvas、导航高亮（Nav / AdminNav）与删除确认四处需要 `"use client"`。

---

## 4. 路由与页面

| 路由 | 类型 | 说明 |
| --- | --- | --- |
| `/` | RSC | 首页：Hero、精选项目、最新文章、联系方式 |
| `/about` | RSC | 关于：头像、简介、技能分组、社交链接 |
| `/projects` | RSC | 项目列表（1 / 2 / 3 列） |
| `/projects/[id]` | RSC | 项目详情，未找到走 404 |
| `/blog` | RSC | 文章列表，按 `createdAt` 倒序 |
| `/blog/[id]` | RSC | 文章详情，正文经 Markdown 渲染 |
| `/admin/login` | RSC + Action | 登录页，已登录则跳 `/admin` |
| `/admin` | RSC | 后台概览：数量统计与快捷入口 |
| `/admin/profile` | RSC + Action | 修改个人信息 |
| `/admin/skills` | RSC + Action | 技能增删改 |
| `/admin/projects` | RSC + Action | 项目列表、删除 |
| `/admin/projects/[id]` | RSC + Action | 新建（`id=new`）/ 编辑项目 |
| `/admin/posts` | RSC + Action | 文章列表、删除 |
| `/admin/posts/[id]` | RSC + Action | 新建（`id=new`）/ 编辑文章 |
| `not-found` | RSC | 全局 404 |

统一约定：新建和编辑共用 `[id]` 页面，`id === "new"` 表示新建，避免重复写两套表单。

---

## 5. 项目结构

```
ai-ownerweb/
├── app/
│   ├── layout.tsx                  根布局：metadata、force-dynamic、引入样式
│   ├── globals.css                 全部样式（设计变量 + 组件 + 响应式）
│   ├── not-found.tsx               404
│   ├── (site)/                     前台路由组（带星空与导航）
│   │   ├── layout.tsx              星空、顶部导航、页脚、底部导航
│   │   ├── page.tsx                首页
│   │   ├── about/page.tsx          关于
│   │   ├── projects/
│   │   │   ├── page.tsx            列表
│   │   │   └── [id]/page.tsx       详情
│   │   └── blog/
│   │       ├── page.tsx            列表
│   │       └── [id]/page.tsx       详情
│   └── admin/
│       ├── actions.ts              全部 Server Actions（唯一写入口）
│       ├── login/page.tsx          登录
│       └── (panel)/                需登录的后台路由组
│           ├── layout.tsx          鉴权 + 侧边栏
│           ├── page.tsx            概览
│           ├── profile/page.tsx
│           ├── skills/page.tsx
│           ├── projects/page.tsx
│           ├── projects/[id]/page.tsx
│           ├── posts/page.tsx
│           └── posts/[id]/page.tsx
├── components/
│   ├── Starfield.tsx               Canvas 星空（client）
│   ├── Nav.tsx                     顶部导航 + 移动端底部导航
│   ├── AdminNav.tsx                后台侧栏导航（client，usePathname）
│   ├── ConfirmButton.tsx           删除二次确认（client）
│   ├── Prose.tsx                   轻量 Markdown 渲染
│   ├── ProjectCard.tsx             项目卡片
│   ├── PostRow.tsx                 文章行
│   └── Footer.tsx                  页脚
├── lib/
│   ├── types.ts                    Profile / Skill / Project / Post / DB / LEVELS
│   ├── db.ts                       seed 数据、JSON 读写、串行队列、只读分支、id 生成
│   ├── mode.ts                     只读模式开关（READ_ONLY）
│   ├── auth.ts                     密码校验、Cookie 签发与验证
│   └── format.ts                   日期格式化、阅读时长
├── scripts/
│   └── snapshot.mjs                data/db.json -> data/content.json
├── data/
│   ├── db.json                     运行时生成，不入库
│   └── content.json                只读快照，部署时打包，需要提交
├── docs/
│   ├── PRD.md                      需求文档（简化版）
│   ├── TECH_DESIGN.md              本文档
│   └── PRD-detailed.md             早期完整方案（备查）
├── AGENTS.md                       AI 开发规范
├── next.config.ts                  默认空配置
├── package.json                    next / react / react-dom / typescript
└── tsconfig.json                   路径别名 @/* -> ./*
```

---

## 6. 数据模型

完整类型定义见 `lib/types.ts`，存储格式即 `DB` 的 JSON 序列化：

```json
{
  "profile": {
    "name": "林星",
    "role": "AI 专业学生 · 全栈开发爱好者",
    "headline": "用代码把想法做成能用的产品",
    "subheadline": "关注 AI 应用与前端体验……",
    "bio": "支持简单 Markdown 的长简介",
    "avatar": "图片链接，可为空",
    "location": "杭州",
    "email": "linxing@example.com",
    "github": "https://github.com/example",
    "website": "",
    "status": "正在寻找 AI 应用开发实习"
  },
  "skills": [
    {
      "id": "s1",
      "name": "Python",
      "category": "编程语言",
      "level": "熟练",
      "note": "数据处理、脚本与模型训练"
    }
  ],
  "projects": [
    {
      "id": "p1",
      "title": "AI 作业助手",
      "summary": "一句话摘要，用于卡片",
      "content": "Markdown 正文",
      "tech": ["Python", "PyTorch"],
      "cover": "",
      "demoUrl": "",
      "repoUrl": "https://github.com/example/ai-homework",
      "featured": true,
      "createdAt": "2026-09-20"
    }
  ],
  "posts": [
    {
      "id": "a1",
      "title": "我是如何从零做一个个人网站的",
      "excerpt": "列表页摘要",
      "content": "Markdown 正文",
      "tags": ["前端", "随笔"],
      "createdAt": "2026-09-28"
    }
  ]
}
```

约束：

| 类型 | 约束 |
| --- | --- |
| `Level` | 只能是 `熟练` / `熟悉` / `了解`，见 `LEVELS` |
| `id` | `s` / `p` / `a` 前缀 + `randomUUID()` 前 8 位 |
| `createdAt` | `YYYY-MM-DD`，文章与项目按它倒序 |
| `tech` / `tags` | 输入用逗号分隔（中英文逗号均可），存为字符串数组 |
| 空值 | `avatar` / `cover` / `demoUrl` 等允许空字符串，前端做兜底显示 |
| 缺字段 | `normalize()` 用 `seed` 补齐 `profile`，数组缺失则回退示例数据 |

---

## 7. 关键技术点

### 7.1 数据一致性

所有写入必须走 `updateDb(fn)`：

- 它把写操作排进模块级 Promise 队列，串行执行，避免两个保存请求互相覆盖；
- 先写临时文件再 `rename`，避免进程中断留下半个 JSON；
- 读失败（文件不存在 / JSON 损坏）时自动写回 `seed`，保证页面永远有内容。

### 7.2 保存后立即生效

根布局导出 `dynamic = "force-dynamic"`，页面不做静态缓存；每个写 action 结束前再 `revalidatePath("/", "layout")`，所以后台保存后刷新前台就能看到新内容，不需要重启或重新构建。

### 7.3 鉴权边界

- 密码只存在于环境变量中，源码不出现明文判断分支；
- Cookie 里只有 `过期时间.签名`，不含任何用户信息，且 `httpOnly` 前端读不到；
- 后台所有页面都挂在 `(panel)` 路由组下，布局先校验再渲染，避免漏掉某个页面。

### 7.4 星空性能

- 全站只用一个 Canvas，三层视觉：CSS 星云（底）+ 静态星点 + 少量呼吸星点；
- `devicePixelRatio` 上限取 2，避免高分屏上像素过多；
- 页面 `visibilitychange` 隐藏时取消 `requestAnimationFrame`；
- 手机（`innerWidth < 768`）减少星点数量并关闭流星；
- 系统开启「减少动效」时只绘制一帧静态星空。

### 7.5 响应式

- 断点：手机 `< 768px`、平板 `768–1023px`、桌面 `≥ 1024px`；
- 首屏用 `min-height: 100svh`，规避手机地址栏导致的高度跳动；
- 手机端改为底部 4 项导航，触控区域不小于 44px；
- 项目卡片 1 / 2 / 3 列，后台表格在窄屏横向滚动。

### 7.6 中文 URL 与 Markdown

- 详情页使用短 id（`/projects/p1`、`/blog/a1`），避免中文 slug 的编码与转义问题；
- Markdown 由 components/Prose.tsx 自行解析，支持：一级到三级标题、引用、无序与有序列表、三个反引号包裹的代码块、加粗、行内代码、链接；
- 链接只接受 `http(s)://` 或 `/` 开头的地址，防止 `javascript:` 注入；
- 不支持原始 HTML，也不做 XSS 过滤之外的全量 Markdown 兼容。

---

## 8. 局限与风险

| 局限 | 影响 | 说明 |
| --- | --- | --- |
| 单进程 + 单 JSON 文件 | 不支持多实例部署、并发写能力有限 | 作业场景为单机演示，可接受 |
| 无图片上传 | 只能用图片链接 | 避免引入对象存储 |
| 无分页 / 搜索 | 内容多时体验下降 | 示例数据量小，暂不需要 |
| 单一管理员 | 无法多用户协作 | 需求明确不开放注册 |
| 自写 Markdown | 语法覆盖有限 | 只保证作业要求的几种语法 |
| 密码默认值 | 未配置环境变量时较弱 | 仅本地演示，正式环境需配置 `ADMIN_PASSWORD` 与 `SESSION_SECRET` |
| 线上只读 | 部署后无法在网页里改内容 | 数据来自构建时的 `data/content.json`，改完需重新运行 `npm run snapshot` 并重新部署 |

---

## 9. 运行与验证

```bash
npm install
npm run dev          # http://localhost:3000 ，后台 /admin ，密码 admin123

npx tsc --noEmit     # 类型检查，必须 0 错误
npm run build        # 生产构建，必须成功
npm start            # 生产模式运行
```

验收标准见 `docs/PRD.md` 第 8 节；开发规范与测试要求见根目录 `AGENTS.md`。

---

## 10. 部署（Cloudflare Workers，只读演示）

部署目标只包含前台展示，后台只在本机使用。核心改动是把「运行时读文件」换成「构建时内嵌快照」，因此线上不需要可写磁盘。

平台选 Cloudflare Workers，用 `@opennextjs/cloudflare` 把 Next.js 构建产物转换成 Worker。不走 Pages 静态托管：本站页面全部是动态路由（`app/layout.tsx` 声明了 `force-dynamic`），需要 Worker 运行时来渲染。

### 10.1 模式判断

`lib/mode.ts` 中：

```ts
export const READ_ONLY =
  process.env.READ_ONLY_DATA === "1" ||
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.CF_PAGES) ||
  Boolean(process.env.WORKERS_CI);
```

| 环境 | READ_ONLY | 数据来源 | 后台 |
| --- | --- | --- | --- |
| 本地 `npm run dev` | false | `data/db.json` | 可用，可写 |
| Cloudflare Workers | true（`wrangler.jsonc` 的 `vars`） | 构建时内嵌的 `data/content.json` | `/admin` 跳首页，入口隐藏 |
| Vercel / Cloudflare Pages | true | 同上 | 同上 |
| 其他平台 | 手动设 `READ_ONLY_DATA=1` | 同上 | 同上 |

### 10.2 代码路径

- `readDb()`：只读模式直接 `normalize(snapshot)` 返回，**不触碰文件系统**；因此连 `data/db.json` 不存在时也能正常渲染。
- `writeDb()` / `updateDb()`：只读模式抛出明确错误，防止「保存成功但没生效」的假象。
- `app/admin/(panel)/layout.tsx`、`app/admin/login/page.tsx`、`actions.ts` 的 `guard()`：只读模式统一 `redirect("/")`。
- `components/Footer.tsx`：只读模式不渲染「管理后台」入口。

### 10.3 Cloudflare 相关文件

| 文件 | 作用 |
| --- | --- |
| `wrangler.jsonc` | Worker 入口 `.open-next/worker.js`、静态资源 `.open-next/assets`、`nodejs_compat` 与 `global_fetch_strictly_public` 标志、`vars.READ_ONLY_DATA=1` |
| `open-next.config.ts` | 适配器配置，本项目用默认值，不接 R2 缓存 |
| `next.config.ts` | 末尾调用 `initOpenNextCloudflareForDev()`，只影响本地开发 |
| `public/_headers` | `/_next/static/*` 长缓存 |
| `.dev.vars` | 本地预览用，已加入 `.gitignore` |

命令：

```bash
npm run preview   # 构建并在 workerd 中预览（默认 8787 端口）
npm run deploy    # 构建并部署到 Cloudflare
npm run upload    # 只上传新版本，用于灰度发布
```

### 10.4 发布流程

```bash
# 1. 本地改内容（npm run dev + /admin）
# 2. 导出快照
npm run snapshot
# 3. 本地验证 Worker 运行时
npm run preview
# 4. 提交并推送
git add data/content.json
git commit -m "update content snapshot"
git push
# 5. Cloudflare Workers Builds 自动构建部署
```

Workers Builds 的构建设置：

- Build command：`npx @opennextjs/cloudflare build`
- Deploy command：`npx @opennextjs/cloudflare deploy`

注意：`data/content.json` 必须在构建前存在，否则 `lib/db.ts` 的静态导入会导致构建失败；首次部署前先执行一次 `npm run snapshot`。

### 10.5 已知取舍

- 不接 R2 增量缓存：作业规模下页面每次按需渲染即可，省掉建桶与绑定配置。
- `nodejs_compat` 让 `fs` / `path` / `crypto` 能在 Worker 里被解析，保证 `lib/db.ts` 的模块能正常加载；只读模式下这些 API 一次都不会被调用。
- 线上没有后台，内容更新只能走「本地改 → snapshot → push」。
