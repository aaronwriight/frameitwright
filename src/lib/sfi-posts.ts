import { promises as fs } from "node:fs";
import path from "node:path";

export type SfiPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  entry: string;
  tags: string[];
  bodyHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content", "scope-for-imagination", "posts");

function isSfiPost(value: unknown): value is SfiPost {
  if (!value || typeof value !== "object") return false;

  const post = value as Partial<SfiPost>;
  return (
    typeof post.slug === "string" &&
    typeof post.title === "string" &&
    typeof post.subtitle === "string" &&
    typeof post.date === "string" &&
    typeof post.time === "string" &&
    typeof post.location === "string" &&
    typeof post.entry === "string" &&
    Array.isArray(post.tags) &&
    post.tags.every((tag) => typeof tag === "string") &&
    typeof post.bodyHtml === "string"
  );
}

async function readPostFile(fileName: string): Promise<SfiPost | null> {
  try {
    const contents = await fs.readFile(path.join(postsDirectory, fileName), "utf8");
    const post: unknown = JSON.parse(contents);
    return isSfiPost(post) ? post : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function getAllSfiPosts(): Promise<SfiPost[]> {
  let fileNames: string[];

  try {
    fileNames = await fs.readdir(postsDirectory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const posts = await Promise.all(
    fileNames.filter((fileName) => fileName.endsWith(".json")).map((fileName) => readPostFile(fileName)),
  );

  return posts.filter((post): post is SfiPost => post !== null).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getSfiPost(slug: string): Promise<SfiPost | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return readPostFile(`${slug}.json`);
}

export function getSfiYears(posts: SfiPost[]): number[] {
  return [...new Set(posts.map((post) => Number(post.date.slice(0, 4))))].filter(Number.isFinite).sort((a, b) => b - a);
}

export function formatSfiDate(date: string, includeYear = true): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: includeYear ? "numeric" : undefined,
  });
}

export function formatSfiHeaderDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${Number(month)}.${Number(day)}.${year.slice(-2)}`;
}

export function formatSfiMonth(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "long" });
}

export function formatSfiPostTitle(post: Pick<SfiPost, "title" | "subtitle">): string {
  return post.subtitle ? `${post.title}: ${post.subtitle}` : post.title;
}

const tagColors: Record<string, string> = {
  thoughts: "#859900",
  "cognitive science": "#2aa198",
  science: "#2aa198",
  photography: "#d33682",
  travel: "#268bd2",
  faith: "#6c71c4",
  adventure: "#cb4b16",
};

const fallbackTagColors = ["#859900", "#2aa198", "#d33682", "#268bd2", "#6c71c4", "#cb4b16", "#b58900", "#dc322f"];

export function getSfiTagColor(tag: string): string {
  const normalizedTag = tag.trim().toLowerCase();
  if (tagColors[normalizedTag]) return tagColors[normalizedTag];

  const hash = [...normalizedTag].reduce((total, character) => total + character.charCodeAt(0), 0);
  return fallbackTagColors[hash % fallbackTagColors.length];
}
