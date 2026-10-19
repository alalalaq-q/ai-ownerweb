import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import PostRow from "@/components/PostRow";

export const metadata: Metadata = {
  title: "博客",
};

export default async function BlogPage() {
  const db = await readDb();
  const posts = [...db.posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Journal</p>
        <h1 className="detail-title">博客</h1>
        <p className="detail-summary">学习笔记、项目复盘，以及一些踩坑记录。</p>

        <div style={{ marginTop: 40 }}>
          {posts.length ? (
            <div className="post-list">
              {posts.map((post) => (
                <PostRow post={post} key={post.id} />
              ))}
            </div>
          ) : (
            <div className="empty">还没有文章，去后台写第一篇吧。</div>
          )}
        </div>
      </div>
    </div>
  );
}
