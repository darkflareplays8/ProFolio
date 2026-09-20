"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post } from "@/lib/posts";

export default function AdminPostRow({ post }: { post: Post }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/posts/${post.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    } else {
      setDeleting(false);
      alert("Failed to delete post.");
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-line first:border-t-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium text-ink truncate">{post.title}</p>
          {!post.published && (
            <span className="font-mono text-[0.65rem] text-ink-faint border border-line-strong rounded px-1.5 py-0.5 shrink-0">
              draft
            </span>
          )}
        </div>
        <p className="font-mono text-xs text-ink-faint truncate">
          /blog/{post.slug}
        </p>
      </div>
      <div className="flex items-center gap-4 shrink-0 text-sm">
        <Link
          href={`/admin/${post.id}/edit`}
          className="text-ink-dim hover:text-orange transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-ink-dim hover:text-red transition-colors disabled:opacity-50"
        >
          {deleting ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
