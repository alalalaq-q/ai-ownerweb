import Link from "next/link";
import { notFound } from "next/navigation";
import { readDb } from "@/lib/db";
import { saveProjectAction } from "@/app/admin/actions";

export default async function AdminProjectEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const db = await readDb();
  const project = isNew ? null : db.projects.find((item) => item.id === id);

  if (!isNew && !project) notFound();

  return (
    <>
      <Link className="more-link" href="/admin/projects">
        ← 返回项目列表
      </Link>
      <h1 className="admin-title" style={{ marginTop: 12 }}>
        {isNew ? "新建项目" : `编辑：${project?.title}`}
      </h1>
      <p className="admin-sub">正文支持简单 Markdown：## 标题、- 列表、**加粗**、`代码`。</p>

      {error ? <div className="banner error">标题不能为空。</div> : null}

      <form action={saveProjectAction}>
        <input type="hidden" name="id" value={project?.id ?? ""} />

        <div className="admin-card">
          <h2>基本信息</h2>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="title">标题 *</label>
              <input id="title" name="title" required defaultValue={project?.title ?? ""} />
            </div>

            <div className="field">
              <label htmlFor="tech">技术栈</label>
              <input
                id="tech"
                name="tech"
                defaultValue={project?.tech.join(", ") ?? ""}
                placeholder="用逗号分隔，如：Next.js, TypeScript"
              />
            </div>

            <div className="field full">
              <label htmlFor="summary">一句话摘要</label>
              <input
                id="summary"
                name="summary"
                defaultValue={project?.summary ?? ""}
                placeholder="显示在项目卡片上"
              />
            </div>

            <div className="field">
              <label htmlFor="demoUrl">Demo 链接</label>
              <input id="demoUrl" name="demoUrl" defaultValue={project?.demoUrl ?? ""} />
            </div>

            <div className="field">
              <label htmlFor="repoUrl">源码链接</label>
              <input id="repoUrl" name="repoUrl" defaultValue={project?.repoUrl ?? ""} />
            </div>

            <div className="field full">
              <label htmlFor="cover">封面图片链接</label>
              <input
                id="cover"
                name="cover"
                defaultValue={project?.cover ?? ""}
                placeholder="留空时显示渐变占位图"
              />
            </div>

            <div className="field full">
              <label className="check">
                <input type="checkbox" name="featured" defaultChecked={project?.featured ?? true} />
                在首页「精选项目」中展示
              </label>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2>正文</h2>
          <div className="field">
            <textarea
              className="tall"
              name="content"
              defaultValue={
                project?.content ??
                `## 背景

这个项目解决了什么问题？

## 做法

- 用了哪些技术
- 关键实现

## 结果

有什么可以量化的结果？`
              }
              placeholder="支持 ## 标题、- 列表、**加粗**、`代码`、```代码块```"
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            保存项目
          </button>
          {project ? (
            <Link
              className="btn"
              href={`/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              预览详情 ↗
            </Link>
          ) : null}
        </div>
      </form>
    </>
  );
}