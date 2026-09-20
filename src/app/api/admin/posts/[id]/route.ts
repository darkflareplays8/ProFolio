import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deletePost, getPostById, slugify, updatePost } from "@/lib/posts";
import { getEnv } from "@/lib/cf";
import { sendBlogWebhook } from "@/lib/discord";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getPostById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
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

  const slug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title);

  const { justPublished } = await updatePost(id, {
    title: body.title.trim(),
    slug,
    content: body.content,
    tags: body.tags?.trim() ?? "",
    published: Boolean(body.published),
    notifyDiscord: Boolean(body.notifyDiscord),
    mentionEveryone: Boolean(body.mentionEveryone),
  });

  if (justPublished && body.notifyDiscord) {
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
