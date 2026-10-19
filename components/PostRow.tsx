import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate, readingTime } from "@/lib/format";

export default function PostRow({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.id}`} className="post-row">
      <div className="post-date">{formatDate(post.createdAt)}</div>
      <div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
          <span className="muted" style={{ fontSize: 12 }}>
            {readingTime(post.content)} 分钟阅读
          </span>
        </div>
      </div>
    </Link>
  );
}
