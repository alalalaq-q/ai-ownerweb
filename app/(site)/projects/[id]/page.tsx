import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDb } from "@/lib/db";
import Prose from "@/components/Prose";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const db = await readDb();
  const project = db.projects.find((item) => item.id === id);
  return { title: project ? project.title : "项目不存在" };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params;
  const db = await readDb();
  const project = db.projects.find((item) => item.id === id);

  if (!project) notFound();

  return (
    <div className="page">
      <div className="container">
        <div className="detail-head">
          <Link href="/projects" className="back-link">
            ← 返回项目列表
          </Link>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-summary">{project.summary}</p>
          <div className="meta">
            <span>{formatDate(project.createdAt)}</span>
            <span>·</span>
            <span>{project.featured ? "精选项目" : "项目"}</span>
          </div>
          <div className="chips" style={{ marginTop: 16 }}>
            {project.tech.map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          {(project.demoUrl || project.repoUrl) && (
            <div className="actions">
              {project.demoUrl ? (
                <a
                  className="btn btn-primary"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  在线 Demo ↗
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  className="btn"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  源码 ↗
                </a>
              ) : null}
            </div>
          )}
        </div>

        {project.cover ? (
          <div className="detail-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.cover} alt={project.title} />
          </div>
        ) : (
          <div className="detail-cover" aria-hidden="true">
            <span className="cover-fallback" style={{ fontSize: 64 }}>
              {project.title.slice(0, 1)}
            </span>
          </div>
        )}

        <div className="detail-body">
          <Prose source={project.content} />
        </div>
      </div>
    </div>
  );
}
