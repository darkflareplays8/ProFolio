import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAdminSession } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import PostForm from "@/components/PostForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
        Edit post
      </h1>
      <PostForm post={post} />
    </div>
  );
}
