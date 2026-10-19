import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "项目",
};

export default async function ProjectsPage() {
  const db = await readDb();
  const projects = [...db.projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Projects</p>
        <h1 className="detail-title">做过的项目</h1>
        <p className="detail-summary">
          从课程作业到课余尝试，共 {projects.length} 个。每个项目都记录了背景、做法和结果。
        </p>

        <div style={{ marginTop: 40 }}>
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
      </div>
    </div>
  );
}
