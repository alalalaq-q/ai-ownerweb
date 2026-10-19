import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "data", "db.json");
const target = path.join(root, "data", "content.json");

try {
  const raw = JSON.parse(await readFile(source, "utf8"));
  const body = `${JSON.stringify(raw, null, 2)}\n`;
  await writeFile(target, body, "utf8");
  console.log(
    `已生成 data/content.json：技能 ${raw.skills?.length ?? 0} 项、项目 ${raw.projects?.length ?? 0} 个、文章 ${raw.posts?.length ?? 0} 篇。`,
  );
} catch (error) {
  console.error("读取 data/db.json 失败。请先在本地运行 npm run dev，等页面正常打开后再执行 npm run snapshot。");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}