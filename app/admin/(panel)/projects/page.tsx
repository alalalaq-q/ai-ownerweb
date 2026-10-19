import Link from "next/link";
import { readDb } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { deleteProjectAction } from "@/app/admin/actions";
import ConfirmButton from "@/components/ConfirmButton";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const db = await readDb();
  const { saved } = await searchParams;
  const projects = [...db.projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <h1 className="admin-title">项目</h1>
      <p className="admin-sub">项目会显示在首页（精选）和项目列表页。</p>

      {saved ? <div className="banner">已保存。</div> : null}

      <div className="form-actions" style={{ marginBottom: 20 }}>
        <Link className="btn btn-primary btn-sm" href="/admin/projects/new">
          + 新建项目
        </Link>
      </div>

      {projects.length ? (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>标题</th>
                <th>技术栈</th>
                <th>标记</th>
                <th>创建时间</th>
                <th style={{ textAlign: "right" }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td className="muted">{project.tech.join(" / ") || "—"}</td>
                  <td>
                    {project.featured ? (
                      <span className="badge badge-accent">精选</span>
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </td>
                  <td className="muted">{formatDate(project.createdAt)}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="btn btn-sm" href={`/admin/projects/${project.id}`}>
                        编辑
                      </Link>
                      <form action={deleteProjectAction}>
                        <input type="hidden" name="id" value={project.id} />
                        <ConfirmButton
                          className="btn btn-danger btn-sm"
                          message={`确定删除项目「${project.title}」？删除后无法恢复。`}
                        >
                          删除
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">还没有项目，点击「新建项目」开始。</div>
      )}
    </>
  );
}