// 线上只读模式：数据来自构建时内嵌的快照，不再读写 data/db.json。
// 本地开发默认关闭；Vercel / Cloudflare Pages 自动开启，也可用 READ_ONLY_DATA=1 手动开启。
export const READ_ONLY =
  process.env.READ_ONLY_DATA === "1" ||
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.CF_PAGES);
