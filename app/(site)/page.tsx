import Link from "next/link";
import { readDb } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import PostRow from "@/components/PostRow";

export default async function HomePage() {
  const db = await readDb();
  const { profile } = db;

  const featured = db.projects.filter((project) => project.featured);
  const projects = (featured.length ? featured : db.projects).slice(0, 3);
  const posts = [...db.posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          {profile.status ? (
            <span className="status">
              <span className="dot" aria-hidden="true" />
              {profile.status}
            </span>
          ) : null}

          <h1 className="hero-title">
            你好，我是
            <br />
            <span className="grad">{profile.name}</span>
          </h1>

          <p className="hero-role">{profile.role}</p>
          <p className="hero-desc">
            {profile.headline}
            {profile.subheadline ? ` ${profile.subheadline}` : ""}
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href="/projects">
              查看项目
            </Link>
            <Link className="btn" href="/blog">
              阅读博客
            </Link>
          </div>

          <div className="socials">
            {profile.github ? (
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            ) : null}
            {profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : null}
            {profile.website ? (
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                个人网站 ↗
              </a>
            ) : null}
            {profile.location ? <span>{profile.location}</span> : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">精选项目</h2>
              <p className="section-desc">课程项目和课余作品，每个都能实际运行。</p>
            </div>
            <Link className="more-link" href="/projects">
              查看全部 →
            </Link>
          </div>

          {projects.length ? (
            <div className="grid-cards">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          ) : (
            <div className="empty">还没有项目，去后台添加第一个吧。</div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">最新文章</h2>
              <p className="section-desc">学习笔记与实践复盘。</p>
            </div>
            <Link className="more-link" href="/blog">
              查看全部 →
            </Link>
          </div>

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
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">一起做点东西</h2>
          <p className="section-desc" style={{ maxWidth: 560, marginTop: 12 }}>
            如果你对我的项目感兴趣，或者有实习、合作机会，欢迎直接发邮件。
          </p>
          <div className="actions">
            {profile.email ? (
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                发邮件给我
              </a>
            ) : null}
            {profile.github ? (
              <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
                在 GitHub 找到我
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
