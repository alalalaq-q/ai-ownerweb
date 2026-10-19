"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, isLoggedIn, startSession } from "@/lib/auth";
import { newId, today, updateDb } from "@/lib/db";
import { READ_ONLY } from "@/lib/mode";
import { LEVELS, type Level } from "@/lib/types";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function list(value: string) {
  return value
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function guard() {
  if (READ_ONLY) redirect("/");
  if (!(await isLoggedIn())) redirect("/admin/login");
}

function refresh() {
  revalidatePath("/", "layout");
}

export async function loginAction(formData: FormData) {
  if (READ_ONLY) redirect("/");
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

export async function updateProfileAction(formData: FormData) {
  await guard();
  await updateDb((db) => {
    db.profile = {
      ...db.profile,
      name: text(formData, "name") || db.profile.name,
      role: text(formData, "role"),
      headline: text(formData, "headline"),
      subheadline: text(formData, "subheadline"),
      bio: text(formData, "bio"),
      avatar: text(formData, "avatar"),
      location: text(formData, "location"),
      email: text(formData, "email"),
      github: text(formData, "github"),
      website: text(formData, "website"),
      status: text(formData, "status"),
    };
  });
  refresh();
  redirect("/admin/profile?saved=1");
}

export async function saveSkillAction(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const name = text(formData, "name");
  if (!name) redirect("/admin/skills?error=1");

  const rawLevel = text(formData, "level") as Level;
  const level: Level = LEVELS.includes(rawLevel) ? rawLevel : "了解";
  const values = {
    name,
    category: text(formData, "category") || "其他",
    level,
    note: text(formData, "note"),
  };

  await updateDb((db) => {
    if (id) {
      const index = db.skills.findIndex((skill) => skill.id === id);
      if (index >= 0) {
        db.skills[index] = { ...db.skills[index], ...values };
      }
    } else {
      db.skills.push({ id: newId("s"), ...values });
    }
  });

  refresh();
  redirect("/admin/skills?saved=1");
}

export async function deleteSkillAction(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  await updateDb((db) => {
    db.skills = db.skills.filter((skill) => skill.id !== id);
  });
  refresh();
  redirect("/admin/skills");
}

export async function saveProjectAction(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const title = text(formData, "title");

  if (!title) {
    redirect(id ? `/admin/projects/${id}?error=1` : "/admin/projects/new?error=1");
  }

  const values = {
    title,
    summary: text(formData, "summary"),
    content: text(formData, "content"),
    tech: list(text(formData, "tech")),
    cover: text(formData, "cover"),
    demoUrl: text(formData, "demoUrl"),
    repoUrl: text(formData, "repoUrl"),
    featured: formData.get("featured") === "on",
  };

  await updateDb((db) => {
    if (id) {
      const index = db.projects.findIndex((project) => project.id === id);
      if (index >= 0) {
        db.projects[index] = { ...db.projects[index], ...values };
      }
    } else {
      db.projects.unshift({ id: newId("p"), createdAt: today(), ...values });
    }
  });

  refresh();
  redirect("/admin/projects?saved=1");
}

export async function deleteProjectAction(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  await updateDb((db) => {
    db.projects = db.projects.filter((project) => project.id !== id);
  });
  refresh();
  redirect("/admin/projects");
}

export async function savePostAction(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const title = text(formData, "title");

  if (!title) {
    redirect(id ? `/admin/posts/${id}?error=1` : "/admin/posts/new?error=1");
  }

  const values = {
    title,
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    tags: list(text(formData, "tags")),
  };

  await updateDb((db) => {
    if (id) {
      const index = db.posts.findIndex((post) => post.id === id);
      if (index >= 0) {
        db.posts[index] = { ...db.posts[index], ...values };
      }
    } else {
      db.posts.unshift({ id: newId("a"), createdAt: today(), ...values });
    }
  });

  refresh();
  redirect("/admin/posts?saved=1");
}

export async function deletePostAction(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  await updateDb((db) => {
    db.posts = db.posts.filter((post) => post.id !== id);
  });
  refresh();
  redirect("/admin/posts");
}
