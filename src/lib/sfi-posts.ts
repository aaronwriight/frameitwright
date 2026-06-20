import { promises as fs } from "node:fs";
import path from "node:path";

export type SfiPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
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
