import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createPost, slugify } from "@/lib/posts";
import { getEnv } from "@/lib/cf";
import { sendBlogWebhook } from "@/lib/discord";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    title: string;
    slug?: string;
    content: string;
    tags: string;
    published: boolean;
    notifyDiscord: boolean;
    mentionEveryone: boolean;
  };

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const slug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title);

  const id = await createPost({
    title: body.title.trim(),
    slug,
    content: body.content,
    tags: body.tags?.trim() ?? "",
    published: Boolean(body.published),
    notifyDiscord: Boolean(body.notifyDiscord),
    mentionEveryone: Boolean(body.mentionEveryone),
  });

  if (body.published && body.notifyDiscord) {
    const env = await getEnv();
    if (env.DISCORD_WEBHOOK_URL) {
      await sendBlogWebhook(env.DISCORD_WEBHOOK_URL, {
        title: body.title.trim(),
        slug,
        mentionEveryone: Boolean(body.mentionEveryone),
      });
    }
  }

  return NextResponse.json({ id, slug });
}
