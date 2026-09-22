import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublishedPostBySlug } from "@/lib/posts";
import { excerptFromMarkdown, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: excerptFromMarkdown(post.content),
    path: `/blog/${post.slug}`,
  });
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const tags = post.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <Link
        href="/blog"
        className="font-mono text-xs text-ink-faint hover:text-orange transition-colors inline-block mb-10"
      >
        ../blog
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-line font-mono text-xs text-ink-faint">
        <span>{formatDate(post.published_at)}</span>
        {tags.length > 0 && <span>{tags.join(" / ")}</span>}
      </div>

      <div className="prose-content text-ink/90 leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
