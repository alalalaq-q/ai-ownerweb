"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页", icon: "◈" },
  { href: "/projects", label: "项目", icon: "▤" },
  { href: "/blog", label: "博客", icon: "✎" },
  { href: "/about", label: "关于", icon: "☾" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav({ name, email }: { name: string; email: string }) {
  const pathname = usePathname() || "/";

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/" className="brand">
            <span className="brand-mark">{name.slice(0, 1) || "星"}</span>
            <span>{name}</span>
          </Link>

          <nav className="nav-links" aria-label="主导航">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive(pathname, link.href) ? " active" : ""}`}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a className="header-cta" href={email ? `mailto:${email}` : "/about"}>
            联系我
          </a>
        </div>
      </header>

      <nav className="tabbar" aria-label="移动端导航">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`tab${isActive(pathname, link.href) ? " active" : ""}`}
            aria-current={isActive(pathname, link.href) ? "page" : undefined}
          >
            <span className="tab-icon" aria-hidden="true">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
