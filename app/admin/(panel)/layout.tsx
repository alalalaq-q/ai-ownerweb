import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import { READ_ONLY } from "@/lib/mode";
import AdminNav from "@/components/AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (READ_ONLY) redirect("/");
  if (!(await isLoggedIn())) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">
          <span className="brand-mark">星</span>
          <span>内容管理</span>
        </div>

        <AdminNav />

        <div className="admin-side-foot">
          <Link href="/" className="btn btn-sm">
            查看网站
          </Link>
          <form action={logoutAction}>
            <button className="btn btn-sm btn-danger" type="submit">
              退出
            </button>
          </form>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}