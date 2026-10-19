# 个人展示网站 · 产品需求文档（PRD）

| 项目 | 内容 |
| --- | --- |
| 产品名称 | Personal Portfolio（暂定名：Starfield） |
| 文档版本 | v2.1（后台方案已定） |
| 更新日期 | 2026-10-19 |
| 文档状态 | 待评审 |
| 产品形态 | Web 站点 + 管理后台（桌面 / 平板 / 手机三端适配） |
| 核心定位 | 以「星空」为视觉母题的个人品牌站，配套可自主维护内容的后台 |

**变更记录**

| 版本 | 日期 | 主要变更 |
| --- | --- | --- |
| v1.0 | 2026-10-19 | 初版：纯静态内容站，内容以 Git 仓库中的 Markdown 管理 |
| v2.0 | 2026-10-19 | 新增管理后台、数据库、鉴权、媒体库、草稿预览与发布、消息中心；内容源由 Git 文件改为数据库，前台改为按需静态再生成 |
| v2.1 | 2026-10-19 | 确定后台采用 Payload CMS 3（不做自研后台）；部署面向国内访问（阿里云 + 备案）；第 4、7 章与工期按此重写 |

---

## 1. 产品概述

### 1.1 一句话定义

一个深色星空视觉、以内容为中心的开发者个人网站，附带一套**不需要改代码、不需要懂 Git**的管理后台：站长登录后即可修改首页文案、头像、技能、经历、项目、文章与站点外观，保存发布后前台立即生效。

### 1.2 背景与目标

简历和社交主页只能承载碎片信息，缺少统一的品牌表达和长期内容沉淀；而纯文件驱动（Git 即 CMS）的方案对非工程场景不友好——改一句自我介绍也要打开编辑器、提交、等待构建。本产品由两部分组成：

- **访客端**：展示个人品牌与内容，追求极致的首屏观感、性能与可读性。
- **管理端**：一个轻量、聚焦的个人内容管理系统（CMS），覆盖站点上所有「会变的内容」。

产品目标按优先级排列：

1. **建立可信的个人品牌**：访客首屏 5 秒内看懂身份与专长。
2. **促成有效转化**：项目 → 文章 → 联系（面试邀约、合作、关注）。
3. **零代码维护**：95% 的日常内容变更在后台 3 分钟内完成，无需开发者介入、无需重新部署。
4. **体验即作品**：前台性能与完成度、后台的可靠与顺手，共同构成能力证明。

### 1.3 用户与角色

**访客端**

| 用户类型 | 场景 | 核心诉求 |
| --- | --- | --- |
| 招聘方 / HR | 从简历或社交平台点入，停留 1–3 分钟 | 快速确认技术栈、项目复杂度、联系方式 |
| 同行 / 潜在合作方 | 从技术文章或分享链接进入 | 评估专业深度，找到可合作点 |
| 技术社区读者 | 搜索或分享进入博客详情 | 直接读到内容，不被视觉干扰 |

**管理端**

| 角色 | 权限 | 说明 |
| --- | --- | --- |
| 站长（owner） | 全部权限，含账号、备份、集成配置 | MVP 只有这一个账号，不开放注册 |
| 编辑（editor） | 内容增删改、发布，不可改账号与系统设置 | 数据结构预留，V2 视需要启用 |

### 1.4 成功指标

| 层级 | 指标 | 目标值 |
| --- | --- | --- |
| 北极星 | 有效触达数（浏览 ≥ 2 页 或 停留 ≥ 60s 的会话） | 上线 3 个月月均 ≥ 300 |
| 转化 | 联系行为（表单提交、邮件点击、复制邮箱） | ≥ 5% 会话 |
| 内容 | 博客详情到达率 / 平均阅读完成度 | ≥ 25% / ≥ 60% |
| 维护 | 修改一段首页文案并发布的耗时 | ≤ 2 分钟 |
| 维护 | 新增一篇带图文章从进入到发布 | ≤ 15 分钟 |
| 体验 | Lighthouse 移动端 Performance / SEO / A11y | 均 ≥ 90 |
| 性能 | 前台 LCP / CLS / INP | < 2.0s / < 0.05 / < 200ms |
| 稳定 | 后台可用性 / 数据丢失事件 | ≥ 99.9% / 0 |

### 1.5 功能范围

**访客端**

| 模块 | 内容 | 优先级 |
| --- | --- | --- |
| 首页 | Hero、精选项目、最新文章、联系 CTA | P0 |
| 关于 | 简介、头像、时间线、简历下载、社交 | P0 |
| 技能 | 分类、等级、说明 | P0 |
| 项目 | 列表、筛选、详情、图集 | P0 |
| 博客 | 列表、详情、标签、归档、RSS | P0（归档 P1） |
| 搜索 | 全站搜索（文章 + 项目） | P1 |
| 联系 | 表单落库 + 邮件通知 | P0 |
| 全局 | 导航、页脚、404、星空背景、深色主题 | P0 |
| SEO | 元信息、OG、结构化数据、sitemap | P0 |

**管理端**

| 模块 | 内容 | 优先级 |
| --- | --- | --- |
| 登录与会话 | 账号密码、限流锁定、找回密码、2FA | P0（2FA P1） |
| 仪表盘 | 内容统计、最近更新、快捷入口 | P0 |
| 个人信息 | 姓名、定位语、简介、头像、联系方式、社交、简历 | P0 |
| 技能与经历 | 分类、技能、时间线排序与显隐 | P0 |
| 项目管理 | 增删改查、封面/图集、技术栈、精选、发布 | P0 |
| 博客管理 | 编辑器、标签、草稿、预览、发布、定时 | P0（定时 P1） |
| 媒体库 | 上传、压缩、裁剪、alt、引用检查 | P0 |
| 外观配置 | 星空参数、首页模块顺序与文案、导航、页脚 | P0 |
| SEO 配置 | 默认标题模板、描述、OG 图 | P0 |
| 消息中心 | 联系表单收件、标记已读 | P1 |
| 系统设置 | 改密、2FA、备份导出、分析埋点 | P0（2FA P1） |
| 操作日志 | 关键写操作留痕 | P1 |

**明确不做**

- 访客注册登录、评论系统、付费内容、多作者协作工作流、在线代码运行。
- 可视化页面搭建器（拖拽生成任意布局）；后台只允许在预设模块内调整顺序、显隐与文案。
- 移动端完整编辑器；手机端后台支持查看与轻量修改（如改状态、改文案），长文编辑以桌面为主。

### 1.6 关键闭环

```
站长登录后台 → 编辑内容 → 保存（草稿）
                     → 预览（带 token 的前台链接，仅本人可见）
                     → 发布
                          ↓
              写入数据库 + 触发缓存失效
                          ↓
        访客下次访问命中最新静态页面（通常 < 1s 生效）
```

这条链路是 v2.0 的核心：**前台仍然是静态优先（快），但内容不再由 Git 构建决定，而是由后台发布动作驱动再生成。**

---

## 2. 信息架构

### 2.1 访客端站点地图

```
/                      首页（Hero + 精选项目 + 最新文章 + 联系）
/about                 关于我
/skills                技能
/projects              项目列表（?tech= 筛选）
/projects/[slug]       项目详情
/blog                  博客列表（分页）
/blog/[slug]           博客详情
/blog/tags/[tag]       标签聚合
/blog/archive          归档（P1）
/search                搜索结果（P1）
/rss.xml               RSS
/sitemap.xml           站点地图
/404                   未找到
```

### 2.2 管理端站点地图

后台由 Payload CMS 提供，路由遵循框架约定：

```
/admin                              登录 / 仪表盘
/admin/collections/posts            文章列表
/admin/collections/posts/create     新建文章
/admin/collections/posts/:id        编辑文章（含版本、预览）
/admin/collections/projects         项目列表
/admin/collections/projects/create  新建项目
/admin/collections/projects/:id     编辑项目
/admin/collections/media            媒体库
/admin/collections/skills           技能
/admin/collections/skill-categories 技能分类
/admin/collections/experiences      经历
/admin/collections/tags             标签
/admin/collections/contact-messages 消息中心（P1）
/admin/collections/users            管理员账号（仅 owner）
/admin/collections/audit-logs       操作日志（P1）
/admin/globals/profile              个人信息
/admin/globals/site-settings        站点设置（导航 / 页脚 / SEO / 维护模式）
/admin/globals/appearance           外观（首页模块 / 星空 / 动效 / CTA）
/admin/account                      我的账号（改密、会话）
```

侧边栏分组：**内容**（个人信息 / 技能 / 经历 / 项目 / 文章 / 媒体 / 标签）、**站点**（外观 / 站点设置 / 消息）、**系统**（账号 / 操作日志）。移动端侧边栏收为抽屉。

### 2.3 导航结构

**访客端桌面（≥ 1024px）**：顶部固定条，左 Logo，中间导航（首页 / 项目 / 博客 / 关于 / 技能），右侧搜索图标 + 「联系我」按钮。滚动超过首屏后由透明变为毛玻璃 + 1px 底边线。

**访客端移动（< 768px）**：顶部仅 Logo + 搜索，底部固定 4 项 Tab（首页 / 项目 / 博客 / 关于），带 `env(safe-area-inset-bottom)`。技能入口收进「关于」页内链。

**管理端**：使用 Payload 内置管理界面。左侧固定侧边栏（桌面 240px，可折叠；移动端收为抽屉），按「内容 / 站点 / 系统」分组；顶部为当前页面、保存状态、预览与发布按钮、账号菜单。布局沿用 Payload 默认结构，只做主题 token 与中文化定制（见 5.8）。

### 2.4 数据流

| 场景 | 路径 |
| --- | --- |
| 访客读取 | 请求 → CDN/静态页（命中）→ 返回；未命中则由服务端从数据库渲染并缓存 |
| 后台读取 | `/admin/*` 全部动态渲染（不缓存），每次请求校验会话 |
| 后台写入 | Payload REST / Local API → 鉴权 → 字段校验 → 写库 → hook 失效缓存并写入审计 |
| 草稿预览 | 后台生成一次性预览链接 → 访客 URL 携带 token → 服务端校验后渲染最新草稿，不写缓存 |
| 图片 | 后台上传 → 服务端压缩转码 → 对象存储 → 返回 CDN URL → 内容保存时引用 media id |

---

## 3. 访客端核心功能

优先级：**P0** MVP 必须；**P1** 上线后 1 个月内；**P2** 后续迭代。

### F1. 首页（P0）

**目标**：5 秒内建立身份认知，并给出明确下一步动作。

**页面结构（自上而下，顺序可在后台调整）**

1. **Hero 区（~100svh）**
   - 状态徽标：如「● 正在寻找远程前端岗位」，圆点呼吸动画；后台可开关与改文案，关闭时整行不渲染。
   - 主标题：姓名，桌面 60–72px，可含少量渐变文字。
   - 一句话定位：1–2 行。
   - 补充说明：2 行内。
   - 主 CTA「查看项目」+ 次 CTA「阅读博客」（文案与跳转均可在后台配置）。
   - 社交图标行：3–5 个，来自后台社交链接配置。
   - 滚动提示：向下箭头，2s 轻微浮动。
   - 星空为全局背景层（见 5.3），Hero 额外允许流星。
2. **精选项目**：`featured` 项目卡片（2–3 个）+「查看全部项目 →」。区块标题与副标题可在后台修改。
3. **最新文章**：最近 3 篇已发布文章 +「查看全部文章 →」。
4. **联系 CTA**：邀请语 + 邮箱复制按钮 + 社交链接。

**交互规则**

- 首屏入场：元素按 80ms 间隔淡入上移 8px，仅每会话首次进入播放，时长 ≤ 500ms。
- 关闭 JS 时首屏文字完整可见（初始态即可见，动画为增强）。
- 不自动播放视频、不做鼠标跟随大面积光斑。
- 所有 CTA 点击区域 ≥ 44×44px。

**验收标准**

- 移动端首屏不滚动即可看到姓名、定位、主 CTA。
- 后台关闭「状态徽标」后，前台该行不占位、不留空隙。
- 首页三个区块数据全部来自数据库，后台新增并发布后无需部署即可出现。

### F2. 关于我（P0）

**内容**

- 头像（可选，圆角 16px、1px 发光描边，后台未上传时用星形占位）。
- 简介 200–400 字，支持 Markdown（多段、加粗、链接）。
- 经历时间线：公司/项目、角色、起止时间、1–3 条量化成果。
- 教育/证书（可选，`type=education` 归入时间线）。
- 「下载简历」：PDF，新窗口打开并显示文件大小；未上传则隐藏按钮。
- 联系信息：邮箱（可复制）、城市与时区、社交链接。

**规则**

- 时间线倒序；`end_date` 为空显示「至今」并高亮。
- 时间线支持后台拖拽排序与单条隐藏。

### F3. 技能展示（P0）

- 按类别分组（前端 / 后端 / 工程化 / 数据与 AI / 设计等，类别在后台维护，空类别不渲染）。
- 技能卡：图标（可选）+ 名称 + 等级标签 + 一句话说明。
- 三级等级，禁止百分比：**熟练**（可设计并落地复杂项目）、**熟悉**（可独立开发与排错）、**了解**（有实践、可在指导下使用）。
- hover：上移 2px、边框 6% → 14%、外发光。
- 等级同时用三格信号条和文字表达，不单靠颜色。
- 点击技能跳转 `/projects?tech=xxx`（P1 随筛选上线）。

**布局**：< 480px 1 列；480–1023px 2 列；1024–1279px 3 列；≥ 1280px 4 列。

**验收标准**：技能为 0 时区块整体隐藏；等级在灰度模式下仍可区分。

### F4. 项目展示（P0）

**列表页 `/projects`**

- 卡片网格 1 / 2 / 3 列（手机 / 平板 / 桌面），间距 24–32px。
- 卡片：封面（16:9，懒加载 + 模糊占位）、标题、摘要（2 行截断）、技术标签（最多 4 个 + `+N`）、入口（详情 / Demo / 源码）。
- 整卡可点进详情；hover 封面 `scale(1.03)`、标题提亮。
- 排序：`featured` 优先 → 项目结束时间倒序。
- 筛选（P1）：技术标签多选，URL 同步 `?tech=`；无结果展示空状态 + 清除筛选。
- `status=ongoing` 显示「进行中」角标。

**详情页 `/projects/[slug]`**

1. 头部：返回、标题、摘要、元信息（角色 / 周期 / 状态）。
2. 外链按钮：Demo、源码（空则隐藏）。
3. 封面大图（首屏 eager，`fetchpriority="high"`）。
4. 正文（Markdown 渲染），推荐小节：背景与问题 / 方案与取舍 / 实现要点 / 成果与数据。
5. 图集：2–6 张，点击 Lightbox（遮罩 80% 黑、左右切换、Esc 关闭、方向键可用）。
6. 底部：上一篇 / 下一篇 + 返回列表。

**验收标准**

- 无封面时用渐变占位 + 首字母，不出现破图。
- 正文最大宽 720px，代码块横向滚动不撑破布局。
- 后台删除项目后，其详情页返回 404，列表与首页同步移除。

### F5. 博客（P0）

**列表页 `/blog`**

- 每项：标题、摘要（2 行截断）、日期、阅读时长、标签、封面（可选）。
- 日期倒序；分页每页 10 篇，使用真实可抓取的链接。
- 草稿与定时未到文章不出现。
- 标签页 `/blog/tags/[tag]`、归档 `/blog/archive`（按年分组，P1）。

**详情页 `/blog/[slug]`**

- 标题、发布日期、更新日期、阅读时长、标签、作者。
- 正文 720px，字号 17px（移动 16px），行高 1.8，段间距 1.4em。
- 目录：≥ 1280px 固定右侧并滚动高亮；移动端折叠为顶部「目录」浮层。
- 代码块：暗色高亮、语言标签、复制按钮（成功 1.5s 反馈）、超长横向滚动、可选行高亮。
- 图片：点击放大、支持图注、懒加载。
- 阅读进度条（P1）：顶部 2px 渐变。
- 文末：标签、相关文章（同标签最多 3 篇）、上一篇/下一篇、RSS 引导。
- 标题锚点 hover 显示 `#`，点击复制链接。
- 自定义组件（P1）：`<Callout>`、`<CodeGroup>`、`<Video>`、`<Figure>`。

**搜索（P1）**

- 触发：导航图标或 `Ctrl/Cmd + K`；浮层居中，输入即搜，防抖 250ms。
- 结果：标题 + 摘要片段 + 类型（文章 / 项目）。
- 键盘：↑↓ 选择、Enter 打开、Esc 关闭；无结果给引导文案。
- 实现：`/api/search` 查询数据库（标题、摘要、正文、标签），500 篇以内足够；不做客户端全量索引。

**订阅**：`/rss.xml` 输出最近 20 篇（推荐全文），文章页声明 `<link rel="alternate">`。

**验收标准**

- 文章中的外链默认新窗口 + `rel="noopener noreferrer"`。
- 代码块中的 `<`、`>` 不被解析为 HTML。
- 后台保存草稿后，前台列表与 RSS 均不出现；预览链接可看到最新内容。
- TOC 跳转后标题不被固定导航遮挡（`scroll-margin-top: 96px`）。

### F6. 全局能力（P0）

| 功能 | 说明 |
| --- | --- |
| 主题 | 默认深色；不提供亮色（V2 可选）。提供「减少动效」开关，与系统 `prefers-reduced-motion` 联动并持久化 |
| 导航 | 桌面顶部固定，移动底部 Tab；滚动锁定与浏览器回退正常 |
| 搜索 | P1，`Cmd/Ctrl + K` |
| 返回顶部 | 滚动 > 600px 出现，40px 圆形按钮，平滑滚动 |
| 页脚 | 版权（年份自动）、社交、RSS、备案号（后台可配）、最后更新时间 |
| 404 | 星空 + 「这颗星球不存在」+ 返回首页 / 搜索 |
| 加载态 | 顶部 2px 进度条或骨架屏，禁止白屏闪烁 |
| 错误兜底 | 内容读取失败展示「内容加载失败」+ 重试，不阻塞整站 |
| 无障碍跳转 | 首个可聚焦元素为「跳到主内容」，聚焦时显示 |
| 维护模式 | 后台一键开启，前台展示维护页（仅站长可绕过） |

### F7. 联系与转化（P0）

- 联系表单：姓名（可选）、邮箱（必填）、内容（10–1000 字）；蜜罐字段 + 频率限制（同 IP 10 分钟内 3 次）+ 提交后邮件通知站长。
- 提交结果写入数据库，后台消息中心可查看（P1 提供收件箱 UI，P0 至少落库 + 邮件）。
- 邮箱展示：`mailto:` + 点击复制（失败降级为选中文本），成功后 toast。
- 社交链接：按后台配置渲染，空值不渲染；支持排序。
- 反垃圾：服务端校验 + 关键词黑名单；不引入验证码（避免破坏体验），必要时升级为 Turnstile。

### F8. SEO 与分享（P0）

- 每页唯一 `<title>`（≤ 60 字符）与 description（≤ 160 字符），支持模板变量（如 `{title} · {siteName}`）。
- Open Graph / Twitter Card，`og:image` 1200×630；无自定义图时用站点默认图。
- 动态 OG 图（P1）：按文章标题生成卡片图。
- 结构化数据：首页 `Person`、文章 `BlogPosting`、列表 `BreadcrumbList`。
- `sitemap.xml`、`robots.txt`、`canonical` 全站覆盖；`dateModified` 与内容更新时间同步。
- 语义化标签，每页唯一 `h1`；`lang="zh-CN"`。
- 发布/删除内容后自动重建 sitemap 与 RSS（同一发布链路）。

---

## 4. 管理后台（基于 Payload CMS 3）

### 4.0 实现方式与设计原则

后台不自研，采用 **Payload CMS 3** 嵌入 Next.js 同一个应用：管理界面、登录、权限、上传、草稿、版本、回收站、定时任务由框架提供；我们只做三件事：

1. **定义数据**：Collections（列表型内容）与 Globals（单例配置）。
2. **中文化与说明**：每个字段写中文 label，description 里注明「显示在前台哪里、字数上限、留空会怎样」。
3. **挂 hook**：发布后失效缓存、删除前检查引用、新消息发通知。

需要自行开发的界面只有 4 处：仪表盘统计卡（P0）、文章代码块（P0）、全站导出入口（P1）、星空参数实时预览（P1）；其余使用 Payload 官方组件。

**设计原则**

1. **表单即说明**：不依赖文档，字段旁就能看懂怎么填。
2. **保存 ≠ 发布**：开启 drafts，默认存草稿，显式发布才对外。
3. **可回退**：版本历史 + 回收站双保险。
4. **路径最短**：高频字段放第一屏；列表直接显示状态与更新时间。
5. **95% 的内容维护不改代码**：所有前台可见文案都有后台入口（验收依据见 6.3）。

**框架配置要点**

- 管理界面语言设为 `zh`（fallback `en`），字段全部中文。
- `admin.user = 'users'`；`admin.meta` 设置标题与 favicon；`admin.autoRefresh = true`。
- `serverURL`、`cors`、`csrf` 限定自有域名。
- 生产环境关闭 GraphQL Playground（若启用 GraphQL）；REST 仅保留必要端点。
- 开启 `jobs`（任务队列）用于定时发布、回收站清理、备份触发。

### 4.1 账号与登录（P0）

- **Users Collection**（`auth: true`），字段：`name`、`email`、`password`、`role`（`owner` / `editor`）、`totpSecret`（可空）、`lastLoginAt`。
- **关闭公开注册**：`create` 权限仅 owner；首个账号由 `npm run seed:admin` 读取环境变量创建，密码不入仓。前台无任何注册入口。
- **会话**：Payload 默认 `useSessions: true`（服务端会话，可吊销），Cookie 为 httpOnly；`tokenExpiration` 设为 7 天，`admin.autoRefresh` 保持活跃会话。
- **登录保护**：使用 Payload 内置 `maxLoginAttempts: 5` + `lockTime: 15 分钟`（按账号锁定）；另在网关/中间件层按 IP 限流（15 分钟 20 次），防撞库。
- **找回密码**：Payload 内置 forgot-password 流程，需配置邮件 adapter；重置链接 30 分钟有效、使用后失效。
- **2FA（P1）**：TOTP，自定义登录钩子或社区插件实现，提供 10 个一次性恢复码。
- **账号安全**：密码 ≥ 10 位含字母与数字；Payload 使用 PBKDF2-SHA256 加盐哈希（框架默认，历史哈希在登录时自动升级），不自行实现加密。
- **会话管理**：系统设置中查看活跃会话（IP、UA、最后活跃），支持单独吊销与「登出所有设备」。

**验收标准**

- 未登录访问 `/admin` 或任意后台接口均被拦截，不泄露数据。
- 连续 5 次密码错误后账号锁定 15 分钟。
- 修改密码后，其他设备会话立即失效（依赖 `useSessions: true`）。
- 前台与接口均不存在注册入口。

### 4.2 仪表盘（P0）

Payload 默认仪表盘是集合卡片列表，替换为自定义视图（`admin.components.views.dashboard`）：

- **统计卡**：已发布文章、草稿数、项目数、未读消息、本月访问（P1）。
- **最近编辑**：最近 5 条内容（标题、类型、状态、更新时间、直达链接）。
- **快捷操作**：写文章、加项目、改首页文案、上传图片。
- **站点健康**：数据库连接、存储可用、上次备份时间、缓存失效状态；异常标红。
- **首次登录引导**：3 步（完善个人信息 → 添加第一个项目 → 写第一篇文章），可跳过且不再出现。

**验收标准**：登录后 5 秒内能回答「有多少内容、最近改了什么、下一步做什么」。

### 4.3 个人信息（Global: `profile`，P0）

单例 Global，用 Tabs 分 5 组。保存即生效，同时开启 versions 便于回滚。

| Tab | 字段 | 说明（写入字段 description） |
| --- | --- | --- |
| 基本信息 | `displayName`、`englishName`、`headline`、`subheadline`、`location`、`timezone`、`email` | headline ≤ 40 字，显示在首页 Hero；email 用于联系与页脚 |
| 头像与简历 | `avatar`、`resume`（upload → media） | 头像 1:1 裁切，自动生成 512/128 两档；简历 PDF ≤ 10MB |
| 状态徽标 | `statusEnabled`、`statusText`、`statusTone` | 关闭后前台整行不渲染；文案 ≤ 20 字 |
| 简介 | `bio`（Lexical 富文本） | 关于页正文，实时字数统计 |
| 社交链接 | `socials`：array(`platform`、`label`、`url`、`icon`、`visible`) | 行内排序；URL 仅允许 http/https |

**规则**

- 邮箱修改需二次确认；头像上传后即时预览裁切结果。
- 中文名、定位语、状态文案超长时后台提示，并给出前台截断效果说明。
- 保存成功后 toast 附带「查看前台」链接。

**验收标准**

- 修改姓名保存 → Hero、页脚版权、SEO 标题模板同步更新。
- 关闭状态徽标 → 前台无残留空行，Hero 布局不塌陷。
- 上传头像无需手工压缩，单次 ≤ 5s 完成并生成多尺寸。

### 4.4 技能与经历（P0）

**Collections**

| 集合 | 字段 | 关键配置 |
| --- | --- | --- |
| `skill-categories` | `name`、`slug`、`order`、`visible` | 删除前 hook 检查是否仍有 skills，有则阻止并提示迁移 |
| `skills` | `name`、`category`、`level`、`note`、`icon`、`order`、`visible` | `level` 为 select：`expert` / `proficient` / `familiar`；note ≤ 60 字 |
| `experiences` | `org`、`role`、`type`、`startDate`、`endDate`、`highlights`、`order`、`visible` | `type`：`work` / `education`；校验结束时间不早于开始时间 |

- 列表默认排序：分类 order → 技能 order；支持按分类筛选、批量切换 visible。
- 排序方式：MVP 用 `order` 数字 + 列表「上移/下移」操作；拖拽排序作为 P1 自定义组件（Payload 官方无内置拖拽排序）。
- 图标：内置图标集下拉选择（P0），上传自定义 SVG 作为 P2（需清洗）。

**验收标准**

- 隐藏条目前台消失、数据保留，可随时恢复。
- 删除仍被引用的分类时操作被阻止，并列出受影响技能。
- 调整 order 后刷新页面顺序保持，前台同步。

### 4.5 项目管理（Collection: `projects`，P0）

开启 `drafts`、`versions`（20 版）、`trash`。

**表单分 4 个 Tab**

1. **基本信息**：`title`、`slug`、`summary`（≤ 60，实时计数）、`role`、`startDate` / `endDate`、`status`（`completed` / `ongoing`）、`featured`、`order`、`demoUrl`、`repoUrl`。
2. **封面与图集**：`cover`（16:9 裁切预览）、`gallery`（array：图片 + `alt` + `caption`，可排序）。
3. **正文**：Lexical 富文本，含自定义 Code Block（语言选择 + 代码，前台用 Shiki 高亮）。
4. **SEO**：接入 `@payloadcms/plugin-seo`，提供 meta title / description / image 与分享预览；留空由 title/summary 兜底。

**列表与操作**

- 列：封面缩略、title、techStack、发布状态、featured、updatedAt。
- 默认排序：featured desc → order asc → publishedAt desc。
- 批量：发布、转草稿、移入回收站。
- 预览：`admin.preview` 指向 `/api/preview?collection=projects&slug=...`，进入 Next.js Draft Mode，`noindex`。

**规则与验收**

- slug 由标题自动生成、可手改；重复时阻止保存并提示「已被占用」。
- 新建到发布全流程 ≤ 5 分钟（不含写作）。
- 删除进入回收站，30 天内可恢复，恢复后详情页 URL 立即可用。
- 无封面时前台使用渐变占位，不出现破图。

### 4.6 博客管理（Collection: `posts`，P0）

开启 `drafts`、`versions`（20 版）、`autosave`、`trash`。

**编辑器决策：使用 Payload 原生 Lexical，不自建 Markdown 编辑器**

- 理由：媒体插入、链接、表格、版本对比、自动保存开箱即用；自建 Markdown 编辑器需额外 5–7 人日，且要自行处理粘贴上传、快捷键与预览。
- 代价：正文以 Lexical JSON 存储。通过官方 HTML 转换器输出 HTML 供前台渲染；导出时用 turndown 转 Markdown，保证可迁移。
- 代码块：用自定义 Block（语言 select + 代码 textarea）实现；若官方代码块特性满足需求则直接用官方。
- **待确认**：若你更看重「纯 Markdown 写作」，可在开工前改为自定义 Markdown 字段（CodeMirror + 分栏预览），工期 +5 人日。

**字段**

`title`、`slug`、`excerpt`（≤ 120）、`content`、`cover`、`tags`（relationship，可内联新建）、`featured`、SEO 字段、`publishedAt`（发布时自动写入）。

**列表**

title、tags、状态、publishedAt、updatedAt；支持按状态/标签筛选、标题搜索、批量发布与删除。

**发布与预览**

- 预览：`admin.preview` → `/api/preview?collection=posts&slug=...`，Draft Mode 渲染最新草稿，可随时撤销，`noindex` 且不缓存。
- 定时发布（P1）：使用 Payload Jobs + 平台 cron，或路由 `/api/cron/publish` 每 5 分钟扫描到点草稿。
- 阅读时长：`beforeChange` hook 从 Lexical 纯文本计算（中文 300 字/分钟）。
- 版本对比：使用 Payload 内置版本视图，回滚本身生成新版本。

**验收标准**

- 发布后 1 分钟内，列表、详情、RSS、sitemap 全部更新；取消发布同步消失。
- 预览链接撤销后立即失效（404）。
- slug 唯一（含草稿）；正文中的脚本在预览与线上均被过滤。
- 粘贴截图自动上传并插入 CDN 地址，不使用 base64。

### 4.7 媒体库（Collection: `media`，P0）

- **Upload 集合**，`imageSizes`：thumb 128、card 640、hero 1280、large 2048；`formatOptions` 输出 WebP + AVIF，保留 JPEG fallback。
- `focalPoint: true`、`crop: true`；`alt` 必填（validate），`caption` 可选。
- **存储**：`@payloadcms/storage-s3` 接阿里云 OSS / 腾讯云 COS（S3 兼容端点），`disableLocalStorage: true`，CDN 域名走环境变量。
- **上传限制**：单文件 ≤ 10MB；允许 jpg/png/webp/avif/gif/pdf；禁止 SVG。
- **删除保护**：`beforeDelete` hook 查询 posts/projects/profile 对 media 的引用；被引用时阻止删除并返回引用清单。
- **回收站**：media 开启 trash，7 天后由任务物理清理。
- **列表**：缩略图、文件名、尺寸、大小、上传时间；支持搜索与类型筛选。
- **用量**：显示已用容量 / 上限（P1）。

**验收标准**

- 上传 5MB 照片，前台移动端首图实际传输 ≤ 300KB。
- 删除被文章引用的图片被阻止，并列出引用文章。
- 文件名基于内容哈希，CDN 可长期缓存。

### 4.8 站点配置与外观（Globals: `site-settings`、`appearance`，P0）

拆成两个 Global，避免单页过长；均开启 versions。

**`site-settings`**

| 分组 | 字段 |
| --- | --- |
| 基础 | `siteName`、`logo`、`favicon`、`footerText`、`icpRecord`、`maintenanceMode` |
| 导航 | `nav`：array(`label`、`href`、`visible`、`order`)，支持显示/隐藏搜索入口与「联系」CTA |
| SEO | 标题模板（`{title} · {siteName}`）、默认描述、默认 OG 图 |
| 集成 | 分析服务 ID、CDN 刷新密钥（仅存环境变量，后台只读展示是否已配置） |

**`appearance`**

| 分组 | 字段 |
| --- | --- |
| 首页模块 | `homeSections`：array(`key`：hero / featuredProjects / latestPosts / contact，`visible`、`title`、`subtitle`、`order`) |
| Hero CTA | 主/次按钮文案与链接 |
| 星空 | `enabled`、`density`（low/medium/high）、`twinkle`、`meteor`、`parallax`、`nebula` |
| 动效 | 入场动画开关、强制减少动效 |
| 联系 CTA | 标题、描述、按钮文案、邮箱展示方式 |
| 文案 | 404 标题/描述、页脚补充说明等 |

**交互**

- 每个分组提供「恢复默认」。
- 星空提供实时预览（P1 自定义组件复用前台 Canvas）；MVP 先用示意图 + 参数说明。
- 关闭星空时自动切换为静态渐变背景，保持深色氛围。
- 保存后由 hook 触发 `revalidateTag('settings')`。

**验收标准**

- 星空密度由「中」调到「低」，前台星点明显减少且帧率不降。
- 调整首页模块顺序后，桌面与移动端顺序一致。
- 关闭某个模块后，导航与页内锚点同步移除。

### 4.9 消息中心（Collection: `contact-messages`，P1）

- `create` 权限关闭（仅服务端 Local API 写入），`read`/`update` 仅登录用户。
- 字段：`name`、`email`、`content`、`sourcePath`、`ipHash`、`status`（`new` / `read` / `replied` / `archived` / `spam`）。
- 列表：状态筛选、未读计数、邮箱搜索；行内快速标记已读/归档。
- 详情：完整内容、复制邮箱、唤起系统邮件、查看来源页。
- 通知：`afterChange` hook 发邮件给站长；邮件失败不影响入库。
- 保留 12 个月，超期由任务归档；被反垃圾规则拦截的记录标记 `spam`，不进入收件箱。

### 4.10 系统设置与备份（P0）

- **账号**：改姓名/邮箱/密码（Payload account 视图）、活跃会话管理。
- **安全**：登录尝试次数与锁定时长、IP 白名单（中间件读取环境变量）、2FA（P1）。
- **邮件**：SMTP / 邮件服务 adapter（阿里云邮件推送、Resend 等），提供「发送测试邮件」。
- **备份**：云数据库自动快照 + 每日 `pg_dump` 到对象存储（保留 30 天）；对象存储开启版本控制。
- **导出**：CLI `npm run export` 输出 `site-export-<date>.zip`（JSON + Markdown/HTML + 媒体清单）；后台「导出全站」按钮为 P1。
- **回收站**：统一查看与恢复，展示剩余保留天数。
- **维护模式**：一键开启，前台展示维护页，登录用户可绕过。

**验收标准**

- 备份任务连续 7 天成功，后台显示上次备份时间。
- 导出包可在不依赖本系统的情况下还原全部文章与项目文本。
- 开启维护模式后，访客看到维护页，站长仍可访问后台与预览。

### 4.11 发布、缓存与预览机制（P0）

| 机制 | 实现 |
| --- | --- |
| 状态机 | Payload drafts：`draft` → `published`；`trash` 软删除；定时发布由任务队列实现（P1） |
| 缓存失效 | `afterChange` / `afterDelete` hook 调 `revalidateTag` / `revalidatePath`；key 见 7.4 |
| 兜底 | 访客页面 ISR 60s，即使失效失败也会在 1 分钟内自愈 |
| 预览 | `admin.preview` + Next.js Draft Mode + `PREVIEW_SECRET`；`noindex`、不缓存、可撤销 |
| 版本 | posts/projects 保留 20 版，globals 10 版；支持对比与回滚 |
| 并发 | autosave + `updatedAt` 提示；严格冲突检测为 P1 |
| 回收站 | collections 开启 `trash`，保留 30 天，可恢复或彻底删除 |
| 任务 | Payload Jobs / 平台 cron：定时发布、回收站清理、备份、媒体清理 |

**验收标准**

- 发布后刷新首页可见新内容，实测生效时间 < 60s（典型 < 5s）。
- 预览链接撤销后立即 404。
- 回收站恢复内容后，前台 URL 可用且列表顺序正确。
- 两窗口同时编辑同一文章，后保存者至少看到 `updatedAt` 变化提示，不静默覆盖。

### 4.12 权限、审计与安全（P0）

- **角色**：`owner`（全部）、`editor`（内容读写，不可改 users / site-settings）。用 access functions 实现，字段级限制 owner。
- **集合访问**：posts/projects 公开只读已发布；写操作需登录；media 公开读、登录写；messages 仅登录读；users 仅 owner。
- **审计（P1）**：Payload 无内置审计日志，用 `afterChange` / `afterDelete` hook 写入 `audit-logs`（action、collection、docId、user、diff 摘要、ip、ua），不记录密码与密钥。
- **输入安全**：字段校验 + 自定义 validate；Lexical 输出经 HTML 清洗（禁止 script/iframe/on* 属性）。
- **上传安全**：MIME 与文件头校验、随机化文件名、禁止 SVG、Sharp 重编码剥离潜在载荷。
- **传输与头**：全站 HTTPS；CSP、HSTS、`X-Frame-Options: DENY`（后台）、`Referrer-Policy`、`Permissions-Policy`。
- **密钥**：`PAYLOAD_SECRET`、数据库、OSS、SMTP、`PREVIEW_SECRET`、`CRON_SECRET` 全部走环境变量，不入库不入仓；轮换流程写入运维文档。
- **依赖**：锁定版本；季度升级，先在 preview 环境验证；高危漏洞 7 天内修复。

### 4.13 后台交互规范（P0）

| 场景 | 规范 |
| --- | --- |
| 中文化 | 所有 collection / global / field 的 label 与 description 为中文；description 写明「显示位置、字数上限、留空行为」 |
| 列表 | 默认列 5–6 个；状态用徽标；空列表给说明与「新建」入口 |
| 表单 | Tabs 分组；长表单右侧固定保存栏；必填与错误提示中文化 |
| 保存 | Payload 顶部 toast；发布后追加「查看前台」；失败保留输入并说明原因 |
| 危险操作 | 删除为「移入回收站」；彻底删除需二次确认并说明影响 |
| 编辑长文 | autosave 每 2s 防抖；顶部显示保存状态；离开有未保存提示 |
| 后台移动端 | 列表与简单编辑可用；长文编辑提示转桌面；发布/状态切换单手可完成 |
| 快捷入口 | 列表页顶部「查看前台」；编辑页「复制预览链接」 |

### 4.14 后台验收标准（整体）

1. 非开发人员 10 分钟内完成：改首页文案 → 换头像 → 发布一篇带图文章。
2. 所有前台可见文案都能在 `profile` / `site-settings` / `appearance` 或内容集合中找到入口。
3. 任何保存/发布都有明确反馈；发布后前台 1 分钟内生效。
4. 误删内容 30 天内可从回收站恢复；误改可从版本历史回滚。
5. 手机可完成「改一句话并发布」，布局不溢出。
6. 未登录无法访问后台与接口；登录失败锁定生效；非法文件上传被拒绝。
7. 数据库备份与全站导出至少各成功执行一次。

---

## 5. 设计要点

### 5.1 设计原则

1. **内容优先**：星空是背景，不是主角；装饰不得降低正文可读性。
2. **一层光**：整页只允许一个视觉焦点发光，避免满屏霓虹。
3. **动效克制**：只用于说明状态变化与引导视线，单次 150–500ms，可关闭。
4. **一致性**：前台与后台共用 token；不出现「这块长得不一样」。
5. **可访问**：对比度、键盘操作、减少动效与视觉同等优先。

### 5.2 视觉语言

**色彩 Token**

| Token | 值 | 用途 |
| --- | --- | --- |
| `--bg-base` | `#05060A` | 页面底色 |
| `--bg-deep` | `#03040A` | 页脚 / Hero 最深处 |
| `--surface` | `#0B0E16` | 卡片、面板、后台内容区 |
| `--surface-2` | `#11151F` | 后台侧边栏、表头、hover |
| `--border` | `rgba(255,255,255,0.07)` | 默认描边 |
| `--border-strong` | `rgba(255,255,255,0.14)` | hover / 分割强调 |
| `--text-primary` | `#E9ECF4` | 标题、正文（≥ 14:1） |
| `--text-secondary` | `#A0A8BA` | 摘要、次要信息（≥ 7:1） |
| `--text-muted` | `#6E7686` | 时间、脚注（仅非关键信息，≥ 4.5:1） |
| `--accent` | `#7AA2FF` | 星蓝：主按钮、链接、焦点环 |
| `--accent-2` | `#A78BFA` | 星云紫：渐变副色 |
| `--accent-3` | `#5EEAD4` | 极光青：标签、成功点缀 |
| `--gradient-brand` | `linear-gradient(120deg, #7AA2FF, #A78BFA)` | 主按钮、标题高亮 |
| `--success` / `--warning` / `--error` | `#4ADE80` / `#FBBF24` / `#F87171` | 状态反馈 |

规则：强调色面积 ≤ 5%；渐变文字仅用于 Hero 姓名或单个关键词；不使用纯黑纯白；正文对比度始终 ≥ 4.5:1。

**字体**

- 中文：`"PingFang SC", "HarmonyOS Sans SC", "Noto Sans SC", "Microsoft YaHei", sans-serif`
- 西文/数字：`Inter`，数据与时间启用 `tabular-nums`
- 代码：`"JetBrains Mono", ui-monospace, monospace`
- 字体文件 ≤ 2 个，子集化，`font-display: swap`，关键字体 preload。

**字号阶**

| 用途 | 桌面 | 移动 | 字重 | 行高 |
| --- | --- | --- | --- | --- |
| Display（Hero 姓名） | 72 | 40 | 600 | 1.1 |
| H1 | 48 | 32 | 600 | 1.2 |
| H2 | 30 | 24 | 600 | 1.3 |
| H3 | 22 | 20 | 600 | 1.4 |
| 正文 | 17 | 16 | 400 | 1.7–1.8 |
| 次要 | 14 | 14 | 400 | 1.5 |
| 标签/元信息 | 12 | 12 | 500 | 1.4 |

**间距与形状**：4px 基数（4/8/12/16/24/32/48/64/96/128）；区块间距桌面 96–128px、移动 64–80px；内容最大宽 1200px、正文 720px；圆角 8/16/24，标签全圆；描边优先于阴影；毛玻璃仅用于顶部导航与浮层（`blur(16px) saturate(140%)` + `rgba(5,6,10,0.72)`）。

### 5.3 星空系统（核心视觉专项）

由 4 层叠加构成，容器为 `position: fixed; inset: 0; z-index: -1; pointer-events: none`。

| 层级 | 内容 | 实现 | 说明 |
| --- | --- | --- | --- |
| L0 深空 | 2–3 处径向星云光晕 | CSS `radial-gradient`，accent 8–12% | 零成本，随断点调整位置 |
| L1 远景星点 | 800–1200 颗，0.5–1px，亮度 20–40% | Canvas 一次性绘制 | 静态层，尺寸/滚动变化时重绘 |
| L2 中景星点 | 150–300 颗，1–1.8px | Canvas 逐帧，透明度 0.3–1 缓慢呼吸（3–8s 随机） | 唯一的动态层 |
| L3 流星 | 每 8–20s 一颗，1.2s 划过 | Canvas 带拖尾线段 | 仅 Hero；移动端与减少动效时关闭 |
| 视差 | L1/L2 随滚动位移 | `translateY(scrollY × 0.02 / 0.05)` | 仅 ≥ 768px 且未开启减少动效 |

**性能约束（硬性）**

- 全站只允许一个 `<canvas>`；rAF 驱动，帧率上限 60，单帧绘制 ≤ 4ms。
- 星点数量 `clamp(round(area / 2000), 200, 1200)`；`deviceMemory ≤ 4` 或宽度 < 768px 时 ×0.5。
- DPR 上限 2；页面不可见时暂停；滚动中可降至 30fps。
- Canvas `aria-hidden="true"`；不阻塞 LCP，Hero 文本不等待 Canvas。

**降级**

- `prefers-reduced-motion: reduce` 或后台关闭动效：仅保留 L0 + 静态 L1。
- 不支持 Canvas：回退为 CSS 多重径向渐变星点纹理。
- `saveData`：仅 L0 + 静态 L1。
- 星空层之上，正文区域必要时加半透明底或径向遮罩，保证对比度。

### 5.4 动效规范

| 场景 | 属性 | 时长 | 缓动 |
| --- | --- | --- | --- |
| 卡片 hover | transform / border-color / shadow | 180ms | ease-out |
| 按钮 | background / scale(0.98) | 120ms | ease-out |
| 首屏入场 | opacity + translateY(8px) | 500ms，stagger 80ms | cubic-bezier(0.22,1,0.36,1) |
| 页面切换 | opacity | 150ms | ease-out |
| 抽屉/浮层 | transform | 240ms | cubic-bezier(0.32,0.72,0,1) |
| Toast | opacity + translateY | 200ms / 150ms | ease-out |

只动画 `transform` 与 `opacity`（及颜色、阴影）；禁止动画 `width/height/top/left`；不劫持滚动；hover 效果包在 `@media (hover: hover)` 内。

### 5.5 组件清单

| 组件 | 关键状态 |
| --- | --- |
| Button | primary / secondary / ghost / danger / disabled / loading |
| Card | default / hover / focus-visible / skeleton |
| Tag / Chip | default / active（可筛选） |
| Navbar / TabBar | 透明 / 毛玻璃 / 当前项高亮 |
| TOC | 默认 / 当前小节高亮 / 移动折叠 |
| Lightbox | 打开 / 切换 / 关闭 / 加载中 |
| SearchDialog | 空态 / 输入中 / 有结果 / 无结果 |
| Toast | success / error / info |
| CodeBlock | 默认 / 复制成功 / 超宽滚动 |
| Timeline | 进行中 / 已结束 |
| EmptyState | 插画 + 说明 + 操作 |
| DataTable | 排序 / 筛选 / 批量选择 / 空态 / 加载 |
| FormField | 默认 / 聚焦 / 错误 / 禁用 / 帮助文本 |
| MediaPicker | 空 / 已选 / 上传中 / 上传失败 |
| Editor | 编辑 / 分屏预览 / 自动保存中 / 冲突 |

> 后台的列表、表单、富文本编辑器、媒体选择器直接使用 Payload 内置组件；上表中后台相关项仅在需要定制时自行实现。

### 5.6 多端适配

| 断点 | 范围 | 设备 | 布局 |
| --- | --- | --- | --- |
| xs | 0–479px | 手机竖屏 | 单列、底部 Tab、字号降一档、后台单列 |
| sm | 480–767px | 大屏手机/横屏 | 单列，卡片内可 2 列 |
| md | 768–1023px | 平板 | 项目 2 列，后台侧边栏折叠为图标 |
| lg | 1024–1279px | 小笔记本 | 项目 3 列，后台完整侧边栏 |
| xl+ | ≥ 1280px | 桌面 | 三列 + 文章右侧 TOC；后台编辑左右分栏 |

**关键适配点**

- 移动端用 `100svh`；固定元素加 `env(safe-area-inset-*)`。
- 触控目标 ≥ 44×44px，相邻间距 ≥ 8px。
- 移动端禁用鼠标专属交互（悬停显示、3D 倾斜）。
- 底部 Tab 不遮挡内容：主容器 `padding-bottom: 72px + safe-area`。
- 图片 `srcset` + `sizes` 分档，移动端不加载 2048px 大图。
- 横屏低高度（`max-height: 500px`）Hero 改紧凑布局。
- 超宽屏内容限宽 1200px，光晕适度外扩。
- 打印样式：隐藏星空/导航/页脚，正文黑字白底，链接展开 URL。
- 后台：移动端仅保证「查看 + 轻量编辑」，长文编辑提示转桌面端。

### 5.7 无障碍

- 对比度：正文 ≥ 4.5:1，大标题 ≥ 3:1；不用颜色单独传达状态。
- 焦点可见：`outline: 2px solid var(--accent); outline-offset: 2px`，禁止全局 `outline: none`。
- 键盘可完成全流程；浮层打开时焦点锁定，Esc 关闭并归还焦点。
- 语义结构完整，标题层级连续，当前导航 `aria-current="page"`。
- 图标按钮有 `aria-label`；图片有 `alt`；Canvas 与装饰图形 `aria-hidden`。
- 动效可关闭（系统 + 站内开关）。
- 表单：label 关联、错误 `aria-describedby`、错误摘要置顶；后台新增内容后同样要求。

### 5.8 后台视觉与交互规范

后台主体使用 Payload 默认管理界面，只做轻量定制。以下规范适用于主题覆盖与 4 个自定义组件（仪表盘、星空参数预览、文章代码块、全站导出）。

**主题定制**

- 通过 `admin.theme` 与 CSS 变量把管理界面统一到前台的深色 token，不提供浅色后台。
- 侧边栏背景 `--surface-2`，当前项左侧 2px accent 竖线 + 文字提亮。
- 表单输入框底色比页面略亮（`#11151F`），避免「黑洞感」；表格斑马纹用 2% 白叠加。
- 后台正文 14px，表格行高 48px，控件高 36px（移动 44px）；字体与前台一致。

**中文化**

- 所有 Collection / Global / Field 的 label 与 description 为中文；description 写清「显示位置、字数上限、留空行为」。
- Payload 自带文案（保存、删除、发布、校验错误）通过 i18n 覆盖为中文，避免中英混杂。

**反馈与空状态**

- 保留 Payload toast；发布成功后追加「查看前台」链接。
- 列表空态增加一句引导与「新建」按钮，不出现纯空白表格。
- 自定义组件中的异步操作防重复提交；失败给出可操作原因（如「图片超过 10MB」）。

**引导**

- 首次登录的 3 步引导由自定义 dashboard 区块实现，可关闭且不再重复。

**移动端**

- 沿用 Payload 响应式布局；长文编辑提示转桌面端，发布/状态切换保证单手可完成。

### 5.9 反模式清单

- ❌ 满屏粒子 + 鼠标拖尾光斑。
- ❌ 大面积霓虹渐变与发光边框堆叠。
- ❌ 首屏自动播放视频 / 大体积 3D 场景。
- ❌ 循环打字机效果。
- ❌ 滚动劫持、整页横向滑动。
- ❌ 用百分比表示技能熟练度。
- ❌ 浅灰字（低于 4.5:1）作为正文。
- ❌ 后台使用纯白浅色主题造成前后割裂。
- ❌ 后台保存即发布、无草稿与回退。
- ❌ 表单错误只提示「操作失败」。

---

## 6. 数据模型

### 6.1 实体关系概览

```
admin_users ──< audit_logs
     │
     └──< sessions

profile (单例) ──> media (avatar, resume)
site_settings (单例)
social_links ──> profile
skill_categories ──< skills
experiences
projects ──> media (cover / gallery) ──> tags(tech, text[])
posts ──< post_tags >── tags
posts / projects ──< revisions
media ──< 引用关系（由内容字段反查）
contact_messages
```

说明：下表是**逻辑模型**，用于说明字段与关系；实际表结构由 Payload 生成（列名、版本表、关联表由框架管理），不在代码中手写 DDL。标签与图集用关系表或 JSONB，按查询需要选择（项目技术栈用 `text[]`，文章标签用关系表以支持标签页聚合）。

**逻辑模型 → Payload 落地映射**

| 逻辑实体 | Payload 类型 | 说明 |
| --- | --- | --- |
| `admin_users` | Collection `users` | `auth: true`，关闭公开注册 |
| `sessions` | Payload 会话表 | `useSessions` 默认开启，框架管理 |
| `profile` | Global `profile` | 单例，开 versions |
| `site_settings` + 外观配置 | Global `site-settings`、`appearance` | 拆两个 Global，避免单页过长 |
| `social_links` | `profile` 内的 array 字段 | 无需独立表 |
| `skill_categories` / `skills` / `experiences` | Collections | 命名 kebab-case |
| `projects` / `posts` / `tags` / `media` | Collections | 开 drafts / versions / trash 按 4.5–4.7 |
| `contact_messages` | Collection | 仅服务端写入 |
| `revisions` | Payload 版本表（`_posts_v` 等） | 框架自动生成，不手工建 |
| `audit_logs`（P1） | Collection `audit-logs` | hook 写入，只读 |

### 6.2 表定义

**admin_users**

| 字段 | 类型 | 约束 |
| --- | --- | --- |
| id | uuid | PK |
| email | text | 唯一、非空、小写 |
| password_hash / salt | text | 由 Payload 认证模块管理（PBKDF2-SHA256，登录时自动升级） |
| name | text | 显示名 |
| role | enum | `owner` / `editor`，默认 owner |
| totp_secret | text | 可空，加密存储 |
| failed_attempts | int | 默认 0 |
| locked_until | timestamptz | 可空 |
| last_login_at | timestamptz | 可空 |
| created_at / updated_at | timestamptz | 非空 |

**sessions**：`id`、`user_id`(FK)、`token_hash`、`ip`、`user_agent`、`expires_at`、`created_at`。索引 `user_id`、`expires_at`。

**profile（单例）**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| display_name | text | 中文名，Hero 主标题 |
| english_name | text | 英文名，页脚与 SEO 备用 |
| headline | text | 一句话定位，≤ 40 字 |
| subheadline | text | 补充说明，≤ 80 字 |
| bio | text | 关于页正文（Lexical，导出时转 Markdown） |
| avatar_media_id | uuid FK | 可空 |
| resume_media_id | uuid FK | 可空 |
| location / timezone | text | 城市、时区 |
| email | text | 联系邮箱 |
| status_enabled | boolean | 状态徽标开关 |
| status_text | text | ≤ 20 字 |
| status_tone | enum | `success` / `warning` / `neutral` |

**social_links**：`id`、`platform`、`label`、`url`、`icon`、`sort`、`visible`。

**site_settings（单例）**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| site_name | text | 站点名 / SEO 后缀 |
| logo_media_id / favicon_media_id | uuid | 可空 |
| footer_text | text | 页脚文案 |
| icp_record | text | 备案号，可空 |
| nav_config | jsonb | 导航项、顺序、显示 |
| home_sections | jsonb | 首页模块顺序、显隐、标题、副标题 |
| hero_ctas | jsonb | 主/次按钮文案与链接 |
| starfield | jsonb | `enabled`、`density`、`twinkle`、`meteor`、`parallax`、`nebula` |
| motion | jsonb | 入场动画开关、默认减少动效 |
| seo | jsonb | 标题模板、默认描述、默认 OG 图、关键词 |
| integrations | jsonb | 分析 ID、CDN 密钥（加密） |
| maintenance_mode | boolean | 维护模式 |

**skill_categories**：`id`、`name`、`slug`、`sort`、`visible`。
**skills**：`id`、`category_id`(FK)、`name`、`level`（`expert`/`proficient`/`familiar`）、`note`（≤ 60 字）、`icon`、`sort`、`visible`。

**experiences**：`id`、`org`、`role`、`type`（`work`/`education`）、`start_date`（`YYYY-MM`）、`end_date`（可空）、`highlights`（`text[]`）、`sort`、`visible`。

**projects**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | PK |
| slug | text | 唯一，`^[a-z0-9-]+$` |
| title | text | 非空 |
| summary | text | ≤ 60 字 |
| content | text | Markdown 正文 |
| cover_media_id | uuid | 可空 |
| gallery | jsonb | `[{mediaId, alt, caption}]` |
| tech_stack | text[] | 筛选依据 |
| role | text | 担任角色 |
| start_date / end_date | text | `YYYY-MM`，end 可空 |
| status | enum | `completed` / `ongoing` |
| featured | boolean | 首页精选 |
| sort | int | 同精选内排序 |
| demo_url / repo_url | text | 可空 |
| seo_title / seo_description | text | 可空，缺省取 title/summary |
| publish_status | enum | `draft` / `published` / `scheduled` / `archived` |
| published_at / scheduled_at | timestamptz | 可空 |
| deleted_at | timestamptz | 软删除 |
| created_at / updated_at | timestamptz | 乐观锁使用 updated_at |

**posts**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id / slug / title / excerpt | — | slug 唯一，excerpt ≤ 120 字 |
| content | text | Markdown |
| cover_media_id | uuid | 可空 |
| reading_time | int | 构建时计算，分钟 |
| featured | boolean | 首页推荐 |
| seo_title / seo_description | text | 可空 |
| publish_status | enum | 同项目 |
| published_at / scheduled_at | timestamptz | 可空 |
| deleted_at | timestamptz | 软删除 |
| created_at / updated_at | timestamptz | 非空 |

**tags**：`id`、`name`、`slug`（唯一）、`created_at`。
**post_tags**：`post_id`、`tag_id`，联合主键。

**media**：`id`、`filename`（内容哈希）、`original_name`、`mime`、`size`、`width`、`height`、`blurhash`、`alt`、`urls`（jsonb：640/1280/2048）、`uploaded_by`、`created_at`。

**contact_messages**：`id`、`name`、`email`、`content`、`source_path`、`ip_hash`、`status`（`new`/`read`/`replied`/`archived`/`spam`）、`created_at`。

**revisions（P1）**：`id`、`entity_type`、`entity_id`、`snapshot`（jsonb）、`created_by`、`created_at`。
**audit_logs（P1）**：`id`、`user_id`、`action`、`entity_type`、`entity_id`、`diff`（jsonb）、`ip`、`ua`、`created_at`。

**索引与约束**

- `posts (publish_status, published_at desc)`、`projects (featured desc, sort asc, published_at desc)`。
- `posts.slug`、`projects.slug`、`tags.slug` 唯一（软删除行不参与唯一约束，需配合部分索引）。
- 全文检索（P1）：`posts (title, excerpt, content)` 建 `pg_trgm` GIN 索引，支持中文 `ILIKE` 模糊查询。
- 外键 `ON DELETE RESTRICT`（有引用时禁止删除）或 `SET NULL`（封面/图集），按字段定义。

### 6.3 字段与前台位置映射（后台改什么 → 前台变哪里）

| 前台位置 | 后台入口 | 数据来源（Payload） |
| --- | --- | --- |
| 浏览器标签标题 / SEO | 站点设置 → SEO | `site-settings.seo` + 内容级覆写 |
| 顶部 Logo、站点名 | 站点设置 → 基础 | `site-settings.siteName`、`logo` |
| Hero 状态徽标 | 个人信息 → 状态 | `profile.statusEnabled` / `statusText` / `statusTone` |
| Hero 姓名 | 个人信息 → 基本信息 | `profile.displayName` |
| Hero 定位语 / 补充说明 | 个人信息 → 基本信息 | `profile.headline`、`subheadline` |
| Hero 按钮 | 外观 → Hero CTA | `appearance.heroCtas` |
| Hero 社交图标 | 个人信息 → 社交链接 | `profile.socials` |
| 关于页头像 | 个人信息 → 头像 | `profile.avatar` |
| 关于页简介 | 个人信息 → 简介 | `profile.bio` |
| 关于页时间线 | 经历 | `experiences` |
| 简历下载按钮 | 个人信息 → 简历 | `profile.resume` |
| 技能卡片 | 技能 / 技能分类 | `skills`、`skill-categories` |
| 首页精选项目 | 项目 → 精选 | `projects.featured` |
| 项目列表 / 详情 | 项目 | `projects` |
| 首页最新文章 | 文章 | `posts`（published） |
| 文章列表 / 详情 / 标签 | 文章 / 标签 | `posts`、`tags` |
| 区块标题（精选项目 / 最新文章 / 联系） | 外观 → 首页模块 | `appearance.homeSections` |
| 星点密度 / 流星 / 视差 | 外观 → 星空 | `appearance.starfield` |
| 导航项与顺序 | 站点设置 → 导航 | `site-settings.nav` |
| 页脚文案 / 备案号 | 站点设置 → 基础 | `site-settings.footerText`、`icpRecord` |
| 分享卡片图 | 站点设置 → SEO | `site-settings.seo.ogImage` |
| 404 文案 | 外观 → 文案 | `appearance.copy` |
| 联系消息 | 消息中心 | `contact-messages` |
| 全站维护页 | 站点设置 → 基础 | `site-settings.maintenanceMode` |

这张表是验收依据：**任何一行在前台可见，就必须在后台有对应入口。**

### 6.4 校验与一致性

- Payload 字段配置为唯一事实来源，前台类型由框架生成的 TypeScript 类型推导，避免「后台能填、前台报错」。
- 字段上限：姓名 40 字、定位语 40 字、补充说明 80 字、技能说明 60 字、项目摘要 60 字、文章摘要 120 字、slug ≤ 80 字符。
- 图片 alt：正文图片必填；装饰图允许为空并在渲染时输出空 `alt`。
- 时间：统一存储 UTC，展示按 `Asia/Shanghai`；`YYYY-MM` 类字段仅用于展示，不参与排序计算（排序用 `start_date` 文本字典序即可）。
- 删除策略：内容软删除 30 天；媒体软删除 7 天；审计日志保留 180 天。

---

## 7. 技术方案

### 7.1 总体架构

```
访客 ── CDN ──▶ Next.js（前台 RSC + ISR）
站长 ── HTTPS ──▶ Next.js（/admin：Payload 管理界面）

Next.js 应用
  ├─ Payload REST / Local API（同进程，无跨服务调用）
  ├─ 预览（Draft Mode）
  ├─ cron 路由（定时发布 / 备份触发）
  ├─ PostgreSQL（内容、账号、会话）
  ├─ 对象存储 OSS（图片、简历，经 CDN 分发）
  └─ 邮件服务 SMTP（新消息通知、找回密码）
```

- **单应用**：前台与后台在同一个 Next.js 项目中，Payload 通过 `@payloadcms/next` 挂载 `/admin` 与 `/api`，无需第二套服务。
- **Node 运行时**：依赖 Sharp 原生模块与数据库连接，不使用 Edge Runtime。
- **数据自持**：Postgres 存内容与账号，对象存储存媒体，均可随时导出。

### 7.2 为什么选 Payload CMS 3

| 维度 | 说明 |
| --- | --- |
| 开箱能力 | 登录、角色权限、草稿/发布、版本历史、回收站、上传与裁剪、i18n、Live Preview、任务队列 |
| 与 Next.js 同构 | 同一个仓库、同一次部署；前台可直接用 Local API 读数据，无跨服务 HTTP |
| 类型安全 | 配置即 schema，自动生成 TypeScript 类型，与前台组件共用 |
| 可迁移 | 开源、自托管，数据在自有 Postgres；提供导出脚本，不锁定 SaaS |
| 代价 | 后台为通用管理界面，深度定制有成本；升级需回归测试；文档以英文为主 |

相比自建后台，预计节省 10–12 人日（登录、权限、上传、草稿、版本、回收站基本不用写）。**接受「后台是通用 CMS 界面」是本方案的前提**；若要求完全定制的后台视觉，应回到自建方案。

### 7.3 集合与全局清单

| 类型 | 名称 | 用途 | 关键配置 |
| --- | --- | --- | --- |
| Collection | `users` | 管理员 | `auth: true`、`useSessions`、`maxLoginAttempts: 5`、`lockTime: 15min` |
| Collection | `media` | 媒体库 | `upload`、`imageSizes`、`trash`、S3 存储 |
| Collection | `posts` | 文章 | `drafts`、`versions`、`autosave`、`trash` |
| Collection | `projects` | 项目 | `drafts`、`versions`、`trash` |
| Collection | `tags` | 文章标签 | slug 唯一 |
| Collection | `skills` | 技能 | 关联 `skill-categories` |
| Collection | `skill-categories` | 技能分类 | order、visible |
| Collection | `experiences` | 经历 | 排序、显隐 |
| Collection | `contact-messages` | 联系消息 | 仅登录可读 |
| Collection | `audit-logs`（P1） | 操作日志 | hook 写入，只读 |
| Global | `profile` | 个人信息 | 单例、versions |
| Global | `site-settings` | 站点基础/导航/SEO/维护 | 单例、versions |
| Global | `appearance` | 首页模块/星空/动效/CTA/文案 | 单例、versions |

**插件**

- `@payloadcms/plugin-seo`：文章与项目的 meta 字段 + 分享预览。
- `@payloadcms/storage-s3`：媒体写入 OSS/COS。
- `@payloadcms/richtext-lexical`：正文编辑器（含自定义代码块）。
- `@payloadcms/plugin-search`（P1）：可选的搜索集合；中文场景建议自建 `searchText` 字段 + `pg_trgm` 索引，见 7.5。

**目录结构（建议）**

```
src/
  app/
    (frontend)/                 # 访客页面
      page.tsx  about/  projects/  blog/
    (payload)/
      admin/[[...segments]]/    # Payload 管理界面
      api/[...slug]/            # Payload REST
    api/preview/route.ts        # 草稿预览
    api/cron/publish/route.ts   # 定时发布
  collections/                  # users/media/posts/projects/...
  globals/                      # profile/site-settings/appearance
  components/
    frontend/                   # 前台组件与星空 Canvas
    admin/                      # 仪表盘、星空预览等自定义组件
  lib/
    payload.ts  cache.ts  markdown.ts  seo.ts
  payload.config.ts
```

### 7.4 渲染与缓存

| 页面 | 策略 |
| --- | --- |
| 首页、项目/文章列表与详情、关于、技能 | 服务端渲染 + 静态缓存（ISR 60s 兜底），发布时按 tag 精确失效 |
| 搜索、标签筛选 | 动态，短缓存 30s |
| `/admin/*` | 全动态，`no-store`，Payload 自带鉴权 |
| 预览 | 动态，`no-store`，`noindex` |
| 图片/字体 | 长缓存（immutable） |

- 前台读取统一走 Payload Local API（同进程），查询条件固定 `_status = published`，并 `depth: 1` 限制关联层级。
- 用 Next.js 缓存原语（按实际版本使用 `unstable_cache` 或 `use cache`）包装查询并打 tag；同一请求内用 React `cache` 去重。
- **缓存 tag**：`home`、`post:list`、`post:{slug}`、`project:list`、`project:{slug}`、`profile`、`skills`、`experience`、`settings`、`rss`、`sitemap`。
- Payload `afterChange` / `afterDelete` hook 负责失效；失效失败重试 3 次并记录日志，60s ISR 兜底。
- 后台页面禁止被 CDN 缓存；`/admin` 响应头加 `Cache-Control: no-store`。

### 7.5 搜索（P1）

- 方案：在 `posts` 增加 `searchText` 字段，`beforeChange` hook 从 Lexical 提取纯文本（标题 + 摘要 + 正文），配合 PostgreSQL `pg_trgm` GIN 索引，接口用 `ILIKE` 模糊匹配。
- 文章量 < 500 时性能足够；后续可平滑切换到 Meilisearch（只改搜索接口，不动内容模型）。
- 不支持分词级相关性排序，按「标题命中 > 摘要 > 正文」加权即可。
- 项目搜索直接查 title/summary/techStack。

### 7.6 图片与文件

- 上传时由 Sharp 生成 `thumb 128` / `card 640` / `hero 1280` / `large 2048` 四档，输出 WebP + AVIF，保留 JPEG fallback。
- 封面固定 16:9 裁切（1200×675），头像 1:1（512/128），图集保持原比例、长边 ≤ 2048。
- 文件名使用内容哈希，配合 CDN 长缓存；删除后由任务延迟清理物理文件。
- 前台 `<img>` 使用 `srcset` / `sizes`；首屏封面 `fetchpriority="high"`，其余 `loading="lazy"` + blurhash 占位。
- 简历 PDF 直传 ≤ 10MB，不内嵌预览，直接下载。

### 7.7 部署（面向国内访问）

| 项 | 选择 |
| --- | --- |
| 服务器 | 阿里云 ECS（2C4G 起，Docker 部署）或腾讯云轻量应用服务器 |
| 数据库 | 阿里云 RDS PostgreSQL 15+（同地域），不与应用抢内存 |
| 对象存储 | 腾讯云 COS（S3 兼容更完整）或阿里云 OSS + CDN |
| CDN | 国内 CDN，静态资源与图片加速，配置缓存规则与 HTTPS 证书 |
| 域名 | 需完成 ICP 备案（2–4 周，须在 M0 启动），否则无法使用国内服务器 80/443 |
| 邮件 | 阿里云邮件推送 / Resend（SMTP），配置 SPF、DKIM、DMARC |
| 进程 | Docker Compose（app + 反向代理 Nginx/Caddy），或 ECS + PM2；`output: 'standalone'` |
| 运行时 | Node.js 20 LTS 或 22，linux/amd64，Sharp 使用官方预编译二进制 |
| CI/CD | GitHub Actions 构建镜像 → 阿里云 ACR → ECS 拉取重启；迁移 `payload migrate` 随发布执行 |
| 监控 | 云监控（CPU/内存/磁盘）+ uptime 拨测 + Sentry 错误上报 |

**环境变量（示例）**

```
DATABASE_URI=postgres://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=https://example.com
S3_ENDPOINT / S3_BUCKET / S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY / S3_REGION / CDN_URL
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / MAIL_FROM / NOTIFY_EMAIL
PREVIEW_SECRET / CRON_SECRET
```

**注意**

- 国内服务器 + 未备案域名会被拦截，备案是硬前置，不是技术问题。
- 若主要受众在海外，可改用 Vercel + Neon + R2，部署成本更低；但国内访问速度不稳定，二者不可兼得。
- 单机部署需配置 HTTPS 自动续期、日志轮转、磁盘告警；数据库不放同一台机器。

### 7.8 备份与恢复

- **数据库**：RDS 自动快照每日 1 次（保留 30 天）+ 每日 `pg_dump` 上传 OSS（保留 90 天，加密）。
- **媒体**：对象存储开启版本控制；删除为软删除，7 天后清理。
- **导出**：`npm run export` 生成 JSON + Markdown/HTML + 媒体清单，可在任意环境重建。
- **恢复**：`npm run restore -- <backup>` 仅依赖数据库与对象存储，不依赖后台可用性。
- **目标**：RPO ≤ 24h，RTO ≤ 2h；每季度做一次恢复演练并记录耗时。

---

## 8. 非功能需求

| 类别 | 要求 |
| --- | --- |
| 前台性能 | LCP < 2.0s（4G）、INP < 200ms、CLS < 0.05；首屏 JS < 120KB gzip；首屏传输 < 500KB；Lighthouse 移动端四项 ≥ 90 |
| 后台性能 | 列表页 P95 < 1s；保存操作反馈 < 500ms（乐观 UI）；图片上传 5MB 处理 < 8s |
| 兼容性 | Chrome/Edge/Safari/Firefox 最近 2 个版本；iOS Safari 15+；Android Chrome 100+；后台支持 iPad |
| 可用性 | 前台 99.9%，后台 99.5%；数据库故障时前台展示缓存页而非 500 |
| 安全 | OWASP Top 10 自查通过；强密码哈希（Payload PBKDF2-SHA256）；登录锁定；会话 httpOnly；CSP；上传校验与重编码；写操作全量鉴权；后台无注册入口 |
| 隐私 | 不使用第三方追踪 Cookie；联系表单数据仅站长可见，保留 12 个月；分析使用无 Cookie 方案并在页脚说明 |
| 可维护性 | 内容字段 schema 单一来源；组件与 token 复用；新增一个内容类型 = 一张表 + 一组表单 + 一个前台模板 |
| 可观测性 | 错误上报（Sentry 或等价）；慢查询日志；发布/失效失败告警；每日备份结果通知 |
| 国际化 | MVP 仅中文；所有文案走配置，为 V2 中英双语预留 `locale` 字段 |

---

## 9. 埋点与运营数据

**访客侧（P1）**

| 事件 | 参数 |
| --- | --- |
| `page_view` | path、referrer、device |
| `project_click` | slug、position |
| `post_read`（滚动 ≥ 75%） | slug、readingTime |
| `contact_submit` | source、success |
| `contact_click` | type（email/social） |
| `search` | query、resultCount |
| `resume_download` | source |
| `cta_click` | label、target |

**后台侧（P1）**

| 指标 | 用途 |
| --- | --- |
| 内容数量与草稿积压 | 判断是否该更新 |
| 最近发布频率 | 站点活跃度 |
| 缓存失效率 / 失败次数 | 发现发布链路问题 |
| 登录失败次数 | 安全异常 |
| 存储用量趋势 | 容量规划 |
| 消息未读数 | 及时回复 |

后台仪表盘展示「本月访问量 / 热门内容 / 转化次数」，数据来自无 Cookie 分析服务，不做用户级追踪。

---

## 10. 里程碑

| 阶段 | 交付内容 | 预估 |
| --- | --- | --- |
| M0 | PRD 评审、后台方案试跑（Payload 后台 demo）、视觉稿 4 屏、**启动域名备案** | 3 天 |
| M1 | 工程底座：Next.js + Payload 初始化、Postgres 建模与迁移、对象存储、设计 token、全局布局、星空背景 | 4 天 |
| M2 | 访客端：首页、关于、技能（接真实数据） | 3 天 |
| M3 | 访客端：项目列表/详情、博客列表/详情、标签、RSS、SEO、sitemap | 5 天 |
| M4 | 后台建模：Collections/Globals、字段中文化与说明、权限、媒体库、草稿/版本/回收站 | 4 天 |
| M5 | 后台定制：仪表盘、预览与 Draft Mode、缓存失效、外观配置、消息中心 | 4 天 |
| M6 | 打磨上线：三端适配、性能、无障碍、安全自查、备份与恢复演练、内容填充、上线 | 5 天 |
| 合计 | | **约 28 人日**（单人约 6 周） |

**关键路径**

- 域名备案 2–4 周，须在 M0 启动；备案未完成时先在海外临时环境开发与演示，不影响编码进度，但影响正式上线时间。
- 备案、对象存储、邮件服务三项需在 M4 前就绪，否则媒体上传与通知无法联调。

**上线门槛（DoD）**

- P0 功能全部通过验收；前台 Lighthouse 移动端 ≥ 90。
- 后台在桌面与手机各完成一次「改文案 → 发布」全流程走查。
- 数据库自动备份已生效，并完成一次恢复演练（记录耗时）。
- 全站导出成功生成，且能在本地还原文章与项目文本。
- 所有前台可见文案都能在后台找到对应入口（对照 6.3 清单逐项勾选）。
- 安全清单逐项确认：鉴权、登录锁定、上传校验、CSP、密钥、后台无注册入口。
- 内容为真实信息，无占位文案。

---

## 11. 风险与对策

| 风险 | 影响 | 对策 |
| --- | --- | --- |
| 域名备案周期不可控 | 上线延期 2–4 周 | M0 立即启动；先用海外临时环境开发与演示；备案与开发并行 |
| 通用后台界面不符合预期 | 返工或满意度下降 | M0 先用 Payload 真实后台试跑「改文案/发文章」；确认后再进入 M1 |
| Payload 版本升级破坏兼容 | 停机、数据风险 | 锁定版本；季度升级；先在 preview 环境跑迁移与回归；备份后再升级 |
| 国内对象存储与 S3 协议差异 | 上传失败、图片 404 | 优先腾讯云 COS；阿里云 OSS 先做分片上传与签名 POC；必要时写自定义 adapter |
| Sharp 原生依赖部署问题 | 镜像启动失败 | 使用 linux/amd64 基础镜像与官方预编译包；构建阶段验证图片处理 |
| 单机或单库故障 | 站点不可用 | 数据库用托管 RDS；每日备份；前台静态缓存兜底；监控告警 |
| 发布后缓存未失效 | 访客看到旧内容 | hook 重试 3 次 + 60s ISR 兜底 + 后台显示「最后生效时间」 |
| Lexical 内容检索与导出弱 | 搜索差、迁移难 | 增加 `searchText` 字段 + `pg_trgm`；导出用 turndown 转 Markdown，并定期演练导出 |
| 图片体积与存储成本 | LCP 超标、账单上涨 | 上传即转码与限宽、封面统一裁切、CDN 缓存、用量看板 |
| 后台账号被盗 | 内容被篡改、数据泄露 | 强密码、登录锁定、2FA（P1）、IP 白名单、审计日志、最小权限 |
| 误删或误改内容 | 内容丢失 | 草稿/发布分离、版本历史、回收站 30 天、删除前引用检查 |
| 中文搜索效果差 | 搜不到内容 | `pg_trgm` 模糊匹配 + 标题权重；文章量上来后迁移 Meilisearch |
| 单人维护精力不足 | 功能腐化、长期不更新 | 控制范围（不做拖拽建站、不做评论）；文档化运维；季度升级窗口固定 |
| 第三方邮件服务受限 | 通知丢失 | 消息先落库，邮件仅作提醒；失败重试并记录 |

---

## 12. 待确认问题

1. **后台使用者**：仅你一人，还是需要预留编辑角色？（影响权限设计与验收范围）
2. **编辑器**：接受 Payload 原生 Lexical（当前估算基于此），还是要求纯 Markdown 写作（工期 +5 人日，M0 前决定）？
3. **内容规模**：预计文章 / 项目数量级（< 100 / 100–500 / > 500）？影响搜索方案与是否需要分页优化。
4. **身份叙事**：Hero 主目标是求职还是个人品牌 / 接单？决定 CTA 优先级与状态徽标默认文案。
5. **域名与备案**：域名是否已注册？备案主体与资料是否就绪？能否在 1 周内提交？
6. **云资源**：是否已有阿里云 / 腾讯云账号？服务器与数据库的月预算区间？
7. **上线时间**：期望何时上线？若早于 4 周，需要先走海外环境，备案完成后再切回国内。
8. **附加能力**：评论、Newsletter、多语言是否明确排入 V2？这三项会显著增加后台与合规工作量，建议本期不做。
