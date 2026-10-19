import type { Metadata } from "next";
import "./globals.css";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await readDb();
  return {
    title: {
      default: `${profile.name} · 个人主页`,
      template: `%s · ${profile.name}`,
    },
    description: `${profile.headline} ${profile.subheadline}`.trim(),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
