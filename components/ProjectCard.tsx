import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="card">
      <div className="cover">
        {project.cover ? (
          // 封面允许使用外链图片
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.cover} alt={project.title} loading="lazy" />
        ) : (
          <span className="cover-fallback" aria-hidden="true">
            {project.title.slice(0, 1)}
          </span>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-summary">{project.summary}</p>
        <div className="chips">
          {project.tech.slice(0, 4).map((tech) => (
            <span className="chip" key={tech}>
              {tech}
            </span>
          ))}
          {project.featured ? <span className="chip chip-accent">精选</span> : null}
        </div>
        <div className="card-foot">
          <span>查看详情</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
