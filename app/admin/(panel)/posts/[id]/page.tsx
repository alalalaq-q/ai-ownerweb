import Link from "next/link";
import { notFound } from "next/navigation";
import { readDb } from "@/lib/db";
import { savePostAction } from "@/app/admin/actions";

export default async function AdminPostEditPage({
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
  const post = isNew ? null : db.posts.find((item) => item.id === id);

  if (!isNew && !post) notFound();

  return (
    <>
      <Link className="more-link" href="/admin/posts">
        ← 返回文章列表
      </Link>
      <h1 className="admin-title" style={{ marginTop: 12 }}>
        {isNew ? "写文章" : `编辑：${post?.title}`}
      </h1>
      <p className="admin-sub">
        支持简单 Markdown：## 标题、- 列表、**加粗**、`代码`、``` 代码块 ```、[链接](https://...)。
      </p>

      {error ? <div className="banner error">标题不能为空。</div> : null}

      <form action={savePostAction}>
        <input type="hidden" name="id" value={post?.id ?? ""} />

        <div className="admin-card">
          <div className="form-grid">
            <div className="field">
              <label htmlFor="title">标题 *</label>
              <input id="title" name="title" required defaultValue={post?.title ?? ""} />
            </div>

            <div className="field">
              <label htmlFor="tags">标签</label>
              <input
                id="tags"
                name="tags"
                defaultValue={post?.tags.join(", ") ?? ""}
                placeholder="用逗号分隔，如：前端, 随笔"
              />
            </div>

            <div className="field full">
              <label htmlFor="excerpt">摘要</label>
              <textarea
                id="excerpt"
                name="excerpt"
                defaultValue={post?.excerpt ?? ""}
                style={{ minHeight: 80 }}
                placeholder="显示在博客列表中"
              />
            </div>

            <div className="field full">
              <label htmlFor="content">正文</label>
              <textarea
                id="content"
                className="tall"
                name="content"
                defaultValue={post?.content ?? "## 小标题\n\n从这里开始写正文。\n"}
              />
              <span className="help">空行分段；代码块使用三个反引号包裹。</span>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            保存文章
          </button>
          {post ? (
            <Link className="btn" href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
              预览文章 ↗
            </Link>
          ) : null}
        </div>
      </form>
    </>
  );
}