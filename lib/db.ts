import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import snapshot from "@/data/content.json";
import { READ_ONLY } from "./mode";
import type { DB } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const seed: DB = {
  profile: {
    name: "张伟旗",
    role: "AI 专业学生 · 全栈开发爱好者",
    headline: "用代码把想法做成能用的产品",
    subheadline:
      "关注 AI 应用与前端体验，正在寻找实习机会。这个站点是我的作品集，也是我的学习笔记。",
    bio: `你好，我是张伟旗，一名 AI 专业的大三学生。

我平时用 Python 做模型实验，也用 Next.js 写完整的 Web 产品。比起只跑通一个 demo，我更喜欢把东西打磨到别人可以直接使用。

这个网站是我的课程作业，也是我的个人主页：在这里可以看到我做过的项目、掌握的技能，以及一些学习笔记。`,
    avatar: "",
    location: "杭州",
    email: "linxing@example.com",
    github: "https://github.com/example",
    website: "",
    status: "正在寻找 AI 应用开发实习",
  },
  skills: [
    { id: "s1", name: "Python", category: "编程语言", level: "熟练", note: "数据处理、脚本与模型训练" },
    { id: "s2", name: "TypeScript", category: "编程语言", level: "熟悉", note: "全栈项目的主力语言" },
    { id: "s3", name: "React / Next.js", category: "前端", level: "熟悉", note: "做过 3 个完整的全栈项目" },
    { id: "s4", name: "PyTorch", category: "AI", level: "熟悉", note: "图像分类与文本分类实验" },
    { id: "s5", name: "SQL", category: "后端与数据", level: "熟悉", note: "建模、查询与简单性能优化" },
    { id: "s6", name: "Node.js", category: "后端与数据", level: "了解", note: "写接口与脚本，了解常见部署方式" },
    { id: "s7", name: "Git", category: "工具", level: "熟练", note: "分支协作与提交规范" },
    { id: "s8", name: "Figma", category: "设计", level: "了解", note: "能画原型与整理设计稿" },
  ],
  projects: [
    {
      id: "p1",
      title: "AI 作业助手",
      summary: "把课程作业的题目、代码和报告串成一条流水线的桌面工具。",
      tech: ["Python", "PyTorch", "FastAPI"],
      cover: "",
      demoUrl: "",
      repoUrl: "https://github.com/example/ai-homework",
      featured: true,
      createdAt: "2026-09-20",
      content: `## 背景

课程作业的题目、代码和报告分散在三个地方，每次提交前都要手动整理，重复劳动很多。

## 做法

- 用 Python 读取题目文件，自动拆分成任务列表
- 调用大模型生成初稿，再由我逐段修改
- 用 FastAPI 提供本地接口，桌面端只负责展示进度

## 结果

一个学期的作业整理时间从平均 40 分钟降到 10 分钟，最终报告的结构也更统一。`,
    },
    {
      id: "p2",
      title: "校园二手交易平台",
      summary: "面向校园的二手教材流转平台，支持发布、搜索与标记已售。",
      tech: ["Next.js", "TypeScript", "SQLite"],
      cover: "",
      demoUrl: "",
      repoUrl: "https://github.com/example/campus-market",
      featured: true,
      createdAt: "2026-08-15",
      content: `## 背景

校园里的二手教材主要靠群聊流转，信息很快被刷走，也很难搜索。

## 做法

- Next.js 全栈，SQLite 存数据，服务端渲染保证首屏速度
- 支持发布、按关键词搜索、标记已售
- 图片先使用链接，后续再接对象存储

## 结果

课程演示获得最高分，目前有 30 多位同学试用，最常被搜索的是「高数」和「数据结构」。`,
    },
    {
      id: "p3",
      title: "星空个人主页",
      summary: "深色星空风格的个人网站，带一个可以改内容的简易后台。",
      tech: ["Next.js", "Canvas", "CSS"],
      cover: "",
      demoUrl: "",
      repoUrl: "",
      featured: false,
      createdAt: "2026-10-02",
      content: `## 背景

想要一个能长期维护的个人主页，同时练习 Canvas 动效。

## 做法

- 星空分三层：CSS 星云、静态星点、缓慢呼吸的星点
- 手机上关闭流星、减少星点数量
- 后台用本地 JSON 存储，保存后前台立即生效

## 结果

Lighthouse 移动端 95 分，首屏没有图片请求，开启「减少动效」后画面完全静止。`,
    },
  ],
  posts: [
    {
      id: "a1",
      title: "我是如何从零做一个个人网站的",
      excerpt: "从空白文件夹到上线，记录技术选型、页面结构和踩过的坑。",
      tags: ["前端", "随笔"],
      createdAt: "2026-09-28",
      content: `## 先想清楚要放什么

做个人网站最容易犯的错，是先把页面画得很复杂，却发现没有内容可放。我的顺序是：

1. 列出必须展示的内容：介绍、技能、项目、文章
2. 每个内容准备一条真实数据
3. 再决定长什么样

## 技术选型

作业要求有后台，所以不能只写静态页面。最后选了 Next.js：

- 前台和后台在同一个项目里
- 服务端直接读本地 JSON，不需要数据库
- 部署简单，\`npm run build\` 就能跑

## 启动项目

\`\`\`bash
npm install
npm run dev
\`\`\`

打开 http://localhost:3000 就能看到首页。

## 踩过的坑

- 手机上的 100vh 会被地址栏撑破，改用 100svh
- 星空用 Canvas 时忘记除以 DPR，高分屏上会糊
- 后台保存后页面没更新，是因为数据被静态缓存了

## 下一步

补上图片上传和全文搜索，其余功能保持克制。`,
    },
    {
      id: "a2",
      title: "用 Canvas 画一片会呼吸的星空",
      excerpt: "只用 100 行代码，做一个不卡顿、能降级的星空背景。",
      tags: ["Canvas", "动效"],
      createdAt: "2026-09-12",
      content: `## 三层结构

星空不是越多越好。我用三层来控制成本：

- 底层：CSS 径向渐变，模拟星云，不耗性能
- 中层：一次性绘制的静态星点，页面滚动时也不重绘
- 上层：少量星点缓慢改变透明度，制造「呼吸感」

## 核心循环

\`\`\`js
function frame(now) {
  ctx.clearRect(0, 0, width, height);
  for (const star of stars) {
    const alpha = star.base + Math.sin(now * star.speed + star.phase) * star.amp;
    ctx.globalAlpha = alpha;
    ctx.fillRect(star.x, star.y, star.r, star.r);
  }
  requestAnimationFrame(frame);
}
\`\`\`

## 三个细节

1. 页面不可见时停止动画，回来再恢复
2. 手机上星点数量减半，并关闭流星
3. 用户开启「减少动效」时只画一帧静态星空

做到这三点，低端手机上也不会掉帧。`,
    },
    {
      id: "a3",
      title: "课程项目复盘：AI 作业助手",
      excerpt: "一次从需求到交付的完整复盘，包括做对的和做错的。",
      tags: ["AI", "复盘"],
      createdAt: "2026-08-30",
      content: `## 做对了什么

- 先做最小可用版本，第一周就能跑通完整流程
- 把模型调用封装成独立模块，换模型只改一个文件
- 每次迭代都找同学试用，问题发现得很早

## 做错了什么

- 一开始想支持所有文件格式，结果每个都只做了一半
- 没有记录失败案例，调参时只能凭感觉
- 界面做得太早，后来需求变化全部重写

## 如果重来

先锁定一种输入格式，把一条链路做深；等真正有人用，再扩展。

这也是我做这个个人网站的原则：功能少一点，但每个都能用。`,
    },
  ],
};

function normalize(parsed: Partial<DB>): DB {
  return {
    profile: { ...seed.profile, ...(parsed.profile ?? {}) },
    skills: Array.isArray(parsed.skills) ? parsed.skills : seed.skills,
    projects: Array.isArray(parsed.projects) ? parsed.projects : seed.projects,
    posts: Array.isArray(parsed.posts) ? parsed.posts : seed.posts,
  };
}

export async function writeDb(db: DB) {
  if (READ_ONLY) {
    throw new Error("只读演示模式：线上数据来自 data/content.json，请在本地修改后重新生成快照。");
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_FILE);
}

export async function readDb(): Promise<DB> {
  if (READ_ONLY) return normalize(snapshot as unknown as Partial<DB>);
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    return normalize(JSON.parse(raw) as Partial<DB>);
  } catch {
    await writeDb(seed);
    return structuredClone(seed);
  }
}

let queue: Promise<unknown> = Promise.resolve();

/** 串行化写操作，避免同时保存时互相覆盖 */
export function updateDb<T>(mutate: (db: DB) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb();
    const result = await mutate(db);
    await writeDb(db);
    return result;
  });
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function newId(prefix: string) {
  return prefix + crypto.randomUUID().slice(0, 8);
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}
