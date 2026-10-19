export type Level = "熟练" | "熟悉" | "了解";

export type Profile = {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  github: string;
  website: string;
  status: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: Level;
  note: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  content: string;
  tech: string[];
  cover: string;
  demoUrl: string;
  repoUrl: string;
  featured: boolean;
  createdAt: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
};

export type DB = {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  posts: Post[];
};

export const LEVELS: Level[] = ["熟练", "熟悉", "了解"];
