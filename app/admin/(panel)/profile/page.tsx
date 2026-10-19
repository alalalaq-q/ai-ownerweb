import Link from "next/link";
import { readDb } from "@/lib/db";
import { updateProfileAction } from "@/app/admin/actions";

export default async function AdminProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const db = await readDb();
  const { profile } = db;
  const { saved } = await searchParams;

  return (
    <>
      <h1 className="admin-title">个人信息</h1>
      <p className="admin-sub">这些内容会出现在首页 Hero、关于页和页脚。</p>

      {saved ? <div className="banner">已保存，刷新前台即可看到最新内容。</div> : null}

      <form action={updateProfileAction}>
        <div className="admin-card">
          <h2>基本信息</h2>
          <p className="hint">留空的字段不会显示在网站上。</p>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">姓名 *</label>
              <input id="name" name="name" required defaultValue={profile.name} />
            </div>
            <div className="field">
              <label htmlFor="role">身份 / 职业</label>
              <input
                id="role"
                name="role"
                defaultValue={profile.role}
                placeholder="如：AI 专业学生"
              />
            </div>
            <div className="field">
              <label htmlFor="status">状态标签</label>
              <input
                id="status"
                name="status"
                defaultValue={profile.status}
                placeholder="如：正在寻找实习机会"
              />
              <span className="help">显示在首页顶部，留空则隐藏。</span>
            </div>
            <div className="field">
              <label htmlFor="location">所在城市</label>
              <input id="location" name="location" defaultValue={profile.location} />
            </div>
            <div className="field full">
              <label htmlFor="headline">一句话定位</label>
              <input id="headline" name="headline" defaultValue={profile.headline} />
            </div>
            <div className="field full">
              <label htmlFor="subheadline">补充说明</label>
              <textarea
                id="subheadline"
                name="subheadline"
                defaultValue={profile.subheadline}
                style={{ minHeight: 80 }}
              />
            </div>
            <div className="field full">
              <label htmlFor="bio">个人简介（支持简单 Markdown）</label>
              <textarea id="bio" name="bio" defaultValue={profile.bio} style={{ minHeight: 200 }} />
              <span className="help">空行分段，支持 ## 标题、- 列表、**加粗**、`代码`。</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2>头像与联系方式</h2>
          <p className="hint">头像使用图片链接，留空时显示姓名首字。</p>

          <div className="form-grid">
            <div className="field full">
              <label htmlFor="avatar">头像图片链接</label>
              <input
                id="avatar"
                name="avatar"
                defaultValue={profile.avatar}
                placeholder="https://..."
              />
            </div>
            <div className="field">
              <label htmlFor="email">邮箱</label>
              <input id="email" name="email" type="email" defaultValue={profile.email} />
            </div>
            <div className="field">
              <label htmlFor="github">GitHub 链接</label>
              <input
                id="github"
                name="github"
                defaultValue={profile.github}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="field full">
              <label htmlFor="website">个人网站 / 其他链接</label>
              <input
                id="website"
                name="website"
                defaultValue={profile.website}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            保存修改
          </button>
          <Link className="btn" href="/" target="_blank" rel="noopener noreferrer">
            预览首页 ↗
          </Link>
        </div>
      </form>
    </>
  );
}