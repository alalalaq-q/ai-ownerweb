import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDb } from "@/lib/db";
import Prose from "@/components/Prose";
import { formatDate, readingTime } from "@/lib/format";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const db = await readDb();
  const post = db.posts.find((item) => item.id === id);
  return {
    title: post ? post.title : "文章不存在",
    description: post?.excerpt,
  };
}

export default async function PostDetailPage({ params }: Params) {
  const { id } = await params;
  const db = await readDb();
  const post = db.posts.find((item) => item.id === id);

  if (!post) notFound();

  return (
    <div className="page">
      <div className="container">
        <article style={{ maxWidth: 760 }}>
          <Link href="/blog" className="back-link">
            ← 返回博客
          </Link>
          <h1 className="detail-title">{post.title}</h1>
          <div className="meta">
            <span>{formatDate(post.createdAt)}</span>
            <span>·</span>
            <span>{readingTime(post.content)} 分钟阅读</span>
          </div>
          <div className="chips" style={{ margin: "16px 0 32px" }}>
            {post.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <Prose source={post.content} />
        </article>
      </div>
    </div>
  );
}
