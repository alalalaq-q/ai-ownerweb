import Link from "next/link";
import { readDb } from "@/lib/db";
import { formatDate, readingTime } from "@/lib/format";
import { deletePostAction } from "@/app/admin/actions";
import ConfirmButton from "@/components/ConfirmButton";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const db = await readDb();
  const { saved } = await searchParams;
  const posts = [...db.posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <h1 className="admin-title">文章</h1>
      <p className="admin-sub">文章会按发布时间倒序显示在博客页。</p>

      {saved ? <div className="banner">已保存。</div> : null}

      <div className="form-actions" style={{ marginBottom: 20 }}>
        <Link className="btn btn-primary btn-sm" href="/admin/posts/new">
          + 写文章
        </Link>
      </div>

      {posts.length ? (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>标题</th>
                <th>标签</th>
                <th>字数</th>
                <th>发布时间</th>
                <th style={{ textAlign: "right" }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td className="muted">{post.tags.join(" / ") || "—"}</td>
                  <td className="muted">{readingTime(post.content)} 分钟</td>
                  <td className="muted">{formatDate(post.createdAt)}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="btn btn-sm" href={`/admin/posts/${post.id}`}>
                        编辑
                      </Link>
                      <form action={deletePostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <ConfirmButton
                          className="btn btn-danger btn-sm"
                          message={`确定删除文章「${post.title}」？删除后无法恢复。`}
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
        <div className="empty">还没有文章，点击「写文章」开始。</div>
      )}
    </>
  );
}