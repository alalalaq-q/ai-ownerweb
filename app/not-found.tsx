import Link from "next/link";
import Starfield from "@/components/Starfield";

export default function NotFound() {
  return (
    <>
      <Starfield />
      <div className="notfound container">
        <div className="notfound-code">404</div>
        <h1 style={{ margin: "8px 0 10px", fontSize: 24 }}>这颗星球不存在</h1>
        <p className="muted" style={{ margin: "0 0 28px" }}>
          页面可能已经被删除，或者链接写错了。
        </p>
        <div className="actions">
          <Link className="btn btn-primary" href="/">
            回到首页
          </Link>
          <Link className="btn" href="/projects">
            看看项目
          </Link>
        </div>
      </div>
    </>
  );
}
