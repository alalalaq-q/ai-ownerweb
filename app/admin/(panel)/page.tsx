import Link from "next/link";
import { readDb } from "@/lib/db";
import { formatDate } from "@/lib/format";

export default async function AdminHomePage() {
  const db = await readDb();
  const latestPosts = [...db.posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  const latestProjects = [...db.projects]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  return (
    <>
      <h1 className="admin-title">概览</h1>
      <p className="admin-sub">这里保存的内容会直接显示在网站上，刷新前台即可看到。</p>

      <div className="stat-grid">
        <div className="stat">
          <b>{db.projects.length}</b>
          <span>项目</span>
        </div>
        <div className="stat">
          <b>{db.posts.length}</b>
          <span>文章</span>
        </div>
        <div className="stat">
          <b>{db.skills.length}</b>
          <span>技能</span>
        </div>
        <div className="stat">
          <b>{db.projects.filter((project) => project.featured).length}</b>
          <span>精选项目</span>
        </div>
      </div>

      <div className="admin-card">
        <h2>快捷操作</h2>
        <p className="hint">常用的四个入口。</p>
        <div className="form-actions">
          <Link className="btn btn-primary btn-sm" href="/admin/posts/new">
            写文章
          </Link>
          <Link className="btn btn-sm" href="/admin/projects/new">
            添加项目
          </Link>
          <Link className="btn btn-sm" href="/admin/profile">
            改个人信息
          </Link>
          <Link className="btn btn-sm" href="/admin/skills">
            改技能
          </Link>
        </div>
      </div>

      <div className="admin-card">
        <h2>最近文章</h2>
        <p className="hint">按发布时间排序。</p>
        {latestPosts.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {latestPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
                <span className="muted" style={{ fontSize: 13 }}>
                  {formatDate(post.createdAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted" style={{ fontSize: 14 }}>
            还没有文章。
          </p>
        )}
      </div>

      <div className="admin-card">
        <h2>最近项目</h2>
        <p className="hint">按创建时间排序。</p>
        {latestProjects.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {latestProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <Link href={`/admin/projects/${project.id}`}>{project.title}</Link>
                <span className="muted" style={{ fontSize: 13 }}>
                  {project.featured ? "精选 · " : ""}
                  {formatDate(project.createdAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted" style={{ fontSize: 14 }}>
            还没有项目。
          </p>
        )}
      </div>
    </>
  );
}
