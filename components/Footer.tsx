import Link from "next/link";
import { READ_ONLY } from "@/lib/mode";
import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          © {year} {profile.name} · 用 Next.js 搭建
        </span>
        <div className="footer-links">
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          ) : null}
          {profile.email ? <a href={`mailto:${profile.email}`}>Email</a> : null}
          {profile.website ? (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              个人网站
            </a>
          ) : null}
          {READ_ONLY ? null : <Link href="/admin">管理后台</Link>}
        </div>
      </div>
    </footer>
  );
}
