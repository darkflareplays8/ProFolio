import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Devlog and writeups from ProFlare.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
        Blog
      </h1>
      <p className="text-ink-dim max-w-md mb-10 leading-relaxed">
        Devlog entries and writeups on whatever I&apos;m building.
      </p>

      {posts.length === 0 ? (
        <p className="text-ink-dim">Nothing here yet — check back soon.</p>
      ) : (
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg p-4 mb-3 border border-line-strong border-l-[3px] border-l-orange bg-bg-raised/30 transition-colors md:grid md:grid-cols-[1fr_auto] md:items-baseline md:gap-x-6 md:gap-y-1 md:rounded-none md:p-0 md:py-4 md:pl-4 md:mb-0 md:border-0 md:border-l-2 md:border-l-line-strong md:-ml-4 md:bg-transparent hover:border-orange md:hover:border-l-orange md:hover:bg-bg-raised"
            >
              <p className="font-medium text-ink group-hover:text-amber transition-colors">
                {post.title}
              </p>
              <p className="font-mono text-xs text-ink-faint mt-1 md:mt-0 md:whitespace-nowrap">
                {formatDate(post.published_at)}
              </p>
              {post.tags && (
                <p className="font-mono text-xs text-ink-faint mt-2 md:mt-0 md:col-span-2">
                  {post.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .join(" / ")}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
