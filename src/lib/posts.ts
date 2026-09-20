import { getEnv } from "@/lib/cf";

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string;
  published: number;
  notify_discord: number;
  mention_everyone: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export async function listPublishedPosts() {
  const env = await getEnv();
  const { results } = await env.DB.prepare(
    "SELECT * FROM posts WHERE published = 1 ORDER BY published_at DESC"
  ).all<Post>();
  return results;
}

export async function listAllPosts() {
  const env = await getEnv();
  const { results } = await env.DB.prepare(
    "SELECT * FROM posts ORDER BY created_at DESC"
  ).all<Post>();
  return results;
}

export async function getPublishedPostBySlug(slug: string) {
  const env = await getEnv();
  const post = await env.DB.prepare(
    "SELECT * FROM posts WHERE slug = ? AND published = 1"
  )
    .bind(slug)
    .first<Post>();
  return post ?? null;
}

export async function getPostById(id: string) {
  const env = await getEnv();
  const post = await env.DB.prepare("SELECT * FROM posts WHERE id = ?")
    .bind(id)
    .first<Post>();
  return post ?? null;
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createPost(input: {
  title: string;
  slug: string;
  content: string;
  tags: string;
  published: boolean;
  notifyDiscord: boolean;
  mentionEveryone: boolean;
}) {
  const env = await getEnv();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO posts
      (id, slug, title, content, tags, published, notify_discord, mention_everyone, created_at, updated_at, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      input.slug,
      input.title,
      input.content,
      input.tags,
      input.published ? 1 : 0,
      input.notifyDiscord ? 1 : 0,
      input.mentionEveryone ? 1 : 0,
      now,
      now,
      input.published ? now : null
    )
    .run();

  return id;
}

export async function updatePost(
  id: string,
  input: {
    title: string;
    slug: string;
    content: string;
    tags: string;
    published: boolean;
    notifyDiscord: boolean;
    mentionEveryone: boolean;
  }
) {
  const env = await getEnv();
  const existing = await getPostById(id);
  const now = new Date().toISOString();
  const wasPublished = existing?.published === 1;
  const publishedAt =
    input.published && !wasPublished
      ? now
      : existing?.published_at ?? (input.published ? now : null);

  await env.DB.prepare(
    `UPDATE posts SET
      title = ?, slug = ?, content = ?, tags = ?, published = ?,
      notify_discord = ?, mention_everyone = ?, updated_at = ?, published_at = ?
     WHERE id = ?`
  )
    .bind(
      input.title,
      input.slug,
      input.content,
      input.tags,
      input.published ? 1 : 0,
      input.notifyDiscord ? 1 : 0,
      input.mentionEveryone ? 1 : 0,
      now,
      publishedAt,
      id
    )
    .run();

  return { justPublished: input.published && !wasPublished };
}

export async function deletePost(id: string) {
  const env = await getEnv();
  await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}
