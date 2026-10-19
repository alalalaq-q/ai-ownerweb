import Link from "next/link";
import { readDb } from "@/lib/db";
import { LEVELS } from "@/lib/types";
import { deleteSkillAction, saveSkillAction } from "@/app/admin/actions";
import ConfirmButton from "@/components/ConfirmButton";

export default async function AdminSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const db = await readDb();
  const { saved, error } = await searchParams;

  return (
    <>
      <h1 className="admin-title">技能</h1>
      <p className="admin-sub">按分类展示在关于页。等级建议用「熟练 / 熟悉 / 了解」。</p>

      {saved ? <div className="banner">已保存。</div> : null}
      {error ? <div className="banner error">技能名称不能为空。</div> : null}

      <form action={saveSkillAction} className="admin-card">
        <h2>新增技能</h2>
        <p className="hint">分类相同的技能会归到同一组。</p>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="new-name">名称 *</label>
            <input id="new-name" name="name" required placeholder="如：React" />
          </div>
          <div className="field">
            <label htmlFor="new-category">分类</label>
            <input id="new-category" name="category" placeholder="如：前端" />
          </div>
          <div className="field">
            <label htmlFor="new-level">等级</label>
            <select id="new-level" name="level" defaultValue="熟悉">
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="new-note">一句说明</label>
            <input id="new-note" name="note" placeholder="如：做过 3 个全栈项目" />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary btn-sm" type="submit">
            添加技能
          </button>
        </div>
      </form>

      {db.skills.length ? (
        db.skills.map((skill) => (
          <form action={saveSkillAction} className="admin-card" key={skill.id}>
            <input type="hidden" name="id" value={skill.id} />

            <div className="form-grid">
              <div className="field">
                <label>名称 *</label>
                <input name="name" required defaultValue={skill.name} />
              </div>
              <div className="field">
                <label>分类</label>
                <input name="category" defaultValue={skill.category} />
              </div>
              <div className="field">
                <label>等级</label>
                <select name="level" defaultValue={skill.level}>
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>一句说明</label>
                <input name="note" defaultValue={skill.note} />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary btn-sm" type="submit">
                保存
              </button>
              <ConfirmButton
                className="btn btn-danger btn-sm"
                message={`确定删除技能「${skill.name}」？`}
                formAction={deleteSkillAction}
              >
                删除
              </ConfirmButton>
            </div>
          </form>
        ))
      ) : (
        <div className="empty">还没有技能，用上面的表单添加第一个。</div>
      )}

      <Link className="more-link" href="/about" target="_blank" rel="noopener noreferrer">
        预览关于页 ↗
      </Link>
    </>
  );
}