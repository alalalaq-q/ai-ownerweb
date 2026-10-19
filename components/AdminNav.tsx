"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "概览" },
  { href: "/admin/profile", label: "个人信息" },
  { href: "/admin/skills", label: "技能" },
  { href: "/admin/projects", label: "项目" },
  { href: "/admin/posts", label: "文章" },
];

export default function AdminNav() {
  const pathname = usePathname() || "/admin";

  return (
    <nav className="admin-links" aria-label="后台导航">
      {links.map((link) => {
        const active =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-link${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
