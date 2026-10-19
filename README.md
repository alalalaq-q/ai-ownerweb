# 星空个人主页（作业简化版）

深色星空风格的个人展示网站，带一个可以修改内容的简易后台。

- 前台：首页、关于、项目列表 / 详情、博客列表 / 详情，三端适配
- 后台：登录后可修改个人信息、技能、项目、文章，保存后前台立即生效
- 数据：本地 `data/db.json`，首次启动自动生成示例内容
- 不依赖数据库、云服务、对象存储

## 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:3000

后台地址：http://localhost:3000/admin
演示密码：`admin123`

生产模式：

```bash
npm run build
npm start
```

## 部署（只读演示）

线上只放前台展示，后台修改只在本地进行。数据在构建时打进包里，因此不需要数据库，也不需要可写磁盘。

1. 本地改好内容后执行 `npm run snapshot`，生成 `data/content.json`（需要提交到仓库）
2. 推送到 GitHub，在 Vercel 里 Import 这个仓库即可，无需额外配置
3. Vercel / Cloudflare Pages 会自动进入只读模式：

- 页面读取构建时内嵌的 `data/content.json`，完全不碰 `data/db.json`
- `/admin` 和页脚的后台入口自动隐藏
- 其他平台部署时手动设置环境变量 `READ_ONLY_DATA=1`

只读模式下所有写操作都会跳回首页，避免出现「保存看起来成功、其实没生效」的误解。

## 目录结构

```
app/
  (site)/            前台页面（首页 / 关于 / 项目 / 博客）
  admin/             登录页
  admin/(panel)/     登录后的后台页面
  globals.css        全部样式
components/          星空、导航、页脚、Markdown 渲染、卡片
lib/
  db.ts              JSON 读写 + 示例数据
  mode.ts            只读模式开关（线上部署用）
  auth.ts            密码与登录 Cookie
  types.ts           数据类型
scripts/
  snapshot.mjs       把 data/db.json 导出为只读快照
data/
  db.json            运行时生成的数据文件（已加入 .gitignore）
  content.json       只读快照，部署时打包进去（需要提交）
docs/
  PRD.md             简化版需求文档
  TECH_DESIGN.md     技术设计文档（技术栈、架构、数据模型）
  PRD-detailed.md    早期完整版方案（备查，与当前实现无关）
AGENTS.md            AI 开发规范与测试要求
```

## 后台能改什么

| 页面 | 内容 |
| --- | --- |
| `/admin/profile` | 姓名、身份、定位语、简介、头像链接、邮箱、GitHub、状态标签 |
| `/admin/skills` | 新增、修改、删除技能（分类 + 等级 + 说明） |
| `/admin/projects` | 新建、编辑、删除项目；设置首页精选 |
| `/admin/posts` | 新建、编辑、删除文章（支持简单 Markdown） |

## 环境变量（可选）

在项目根目录新建 `.env.local`：

```bash
ADMIN_PASSWORD=换成你自己的密码
SESSION_SECRET=一串随机字符串
```

不配置时使用演示默认值，仅适合本地作业演示。

## 重置数据

删除 `data/db.json`，重启或刷新页面即会重新生成示例数据。

## 说明

- 图片使用链接填写，未上传文件，避免引入额外存储。
- 文章正文支持简单 Markdown：`##` 标题、`-` 列表、`**加粗**`、`` `代码` ``、代码块、链接。
- 开启系统「减少动效」后，星空停止闪烁与流星。
