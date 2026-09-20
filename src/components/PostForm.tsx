"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post } from "@/lib/posts";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [tags, setTags] = useState(post?.tags ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published === 1);
  const [notifyDiscord, setNotifyDiscord] = useState(
    post?.notify_discord === 1
  );
  const [mentionEveryone, setMentionEveryone] = useState(
    post?.mention_everyone === 1
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug,
      content,
      tags,
      published,
      notifyDiscord,
      mentionEveryone,
    };

    const res = await fetch(
      post ? `/api/admin/posts/${post.id}` : "/api/admin/posts",
      {
        method: post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm text-ink-dim mb-1.5">Title</label>
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full rounded-md border border-line-strong bg-bg-raised px-3 py-2 text-ink focus:outline-none focus:border-orange/50"
        />
      </div>

      <div>
        <label className="block text-sm text-ink-dim mb-1.5">Slug</label>
        <input
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
          className="w-full font-mono text-sm rounded-md border border-line-strong bg-bg-raised px-3 py-2 text-ink focus:outline-none focus:border-orange/50"
        />
        <p className="font-mono text-xs text-ink-faint mt-1">
          /blog/{slug || "..."}
        </p>
      </div>

      <div>
        <label className="block text-sm text-ink-dim mb-1.5">
          Tags (comma-separated)
        </label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="fabric, devlog"
          className="w-full font-mono text-sm rounded-md border border-line-strong bg-bg-raised px-3 py-2 text-ink focus:outline-none focus:border-orange/50"
        />
      </div>

      <div>
        <label className="block text-sm text-ink-dim mb-1.5">
          Content (Markdown)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={18}
          className="w-full font-mono text-sm rounded-md border border-line-strong bg-bg-raised px-3 py-2 text-ink focus:outline-none focus:border-orange/50 resize-y"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="accent-orange"
          />
          Published
        </label>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={notifyDiscord}
            onChange={(e) => {
              setNotifyDiscord(e.target.checked);
              if (!e.target.checked) setMentionEveryone(false);
            }}
            className="accent-orange"
          />
          Post to Discord
        </label>

        {notifyDiscord && (
          <label className="flex items-center gap-2 text-sm text-ink pl-6">
            <input
              type="checkbox"
              checked={mentionEveryone}
              onChange={(e) => setMentionEveryone(e.target.checked)}
              className="accent-red"
            />
            @everyone
          </label>
        )}
      </div>

      {error && <p className="text-sm text-red">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="text-sm font-medium px-5 py-2.5 rounded-md bg-orange text-bg hover:bg-amber transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
