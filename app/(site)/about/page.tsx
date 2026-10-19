import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import Prose from "@/components/Prose";
import type { Skill } from "@/lib/types";

export const metadata: Metadata = {
  title: "关于",
};

function groupSkills(skills: Skill[]) {
  const groups: { category: string; items: Skill[] }[] = [];
  for (const skill of skills) {
    const found = groups.find((group) => group.category === skill.category);
    if (found) {
      found.items.push(skill);
    } else {
      groups.push({ category: skill.category, items: [skill] });
    }
  }
  return groups;
}

export default async function AboutPage() {
  const db = await readDb();
  const { profile } = db;
  const groups = groupSkills(db.skills);

  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">About</p>
        <h1 className="detail-title">关于我</h1>

        <div className="about-grid" style={{ marginTop: 36 }}>
          <div>
            <div className="about-card">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                {profile.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar} alt={profile.name} className="avatar" />
                ) : (
                  <span className="avatar avatar-fallback" aria-hidden="true">
                    {profile.name.slice(0, 1)}
                  </span>
                )}
                <div>
                  <h2 style={{ margin: 0, fontSize: 20 }}>{profile.name}</h2>
                  <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
                    {profile.role}
                  </p>
                </div>
              </div>

              <Prose source={profile.bio} />
            </div>
          </div>

          <div>
            <div className="about-card" style={{ marginBottom: 20 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16 }}>联系</h2>
              <div className="contact-list">
                {profile.email ? (
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                ) : null}
                {profile.github ? (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                ) : null}
                {profile.website ? (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer">
                    个人网站 ↗
                  </a>
                ) : null}
                {profile.location ? <span>{profile.location}</span> : null}
              </div>
            </div>

            <div className="about-card">
              <h2 style={{ margin: "0 0 16px", fontSize: 16 }}>技能</h2>
              {groups.length ? (
                groups.map((group) => (
                  <div className="skill-group" key={group.category}>
                    <h3>{group.category}</h3>
                    {group.items.map((skill) => (
                      <div className="skill-item" key={skill.id}>
                        <div>
                          <div className="skill-name">{skill.name}</div>
                          {skill.note ? <div className="skill-note">{skill.note}</div> : null}
                        </div>
                        <span
                          className={`badge${skill.level === "熟练" ? " badge-accent" : ""}`}
                          style={{ flexShrink: 0 }}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="muted" style={{ fontSize: 14 }}>
                  还没有添加技能。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
