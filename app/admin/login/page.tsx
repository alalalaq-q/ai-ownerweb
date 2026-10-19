import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { loginAction } from "@/app/admin/actions";
import { READ_ONLY } from "@/lib/mode";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (READ_ONLY) redirect("/");
  if (await isLoggedIn()) redirect("/admin");

  return (
    <div className="login-wrap">
      <form action={loginAction} className="login-card">
        <h1>管理后台</h1>
        <p>登录后可以修改个人信息、技能、项目和文章。</p>

        {error ? <div className="banner error">密码不正确，请重试。</div> : null}

        <div className="field">
          <label htmlFor="password">管理密码</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="请输入密码"
          />
        </div>

        <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
          登录
        </button>

        <div className="login-tip">
          演示密码：admin123
          <br />
          可通过环境变量 ADMIN_PASSWORD 修改。
        </div>
      </form>
    </div>
  );
}