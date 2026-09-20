import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { listAllPosts } from "@/lib/posts";
import AdminPostRow from "@/components/AdminPostRow";

export const dynamic = "force-dynamic";


export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const session = await getAdminSession();

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">Admin</h1>
        <p className="text-ink-dim mb-8">
          Sign in with the Discord account authorized for this site.
        </p>
        {error && (
          <p className="text-sm text-red mb-6">
            {error === "unauthorized"
              ? "That Discord account isn't authorized."
              : "Login failed. Try again."}
          </p>
        )}
        <a
          href="/api/auth/login"
          className="inline-block text-sm font-medium px-5 py-2.5 rounded-md bg-orange text-bg hover:bg-amber transition-colors"
        >
          Login with Discord
        </a>
      </div>
    );
  }

  const posts = await listAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Blog admin
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/new"
            className="text-sm font-medium px-4 py-2 rounded-md bg-orange text-bg hover:bg-amber transition-colors"
          >
            New post
          </Link>
          <a
            href="/api/auth/logout"
            className="text-sm text-ink-faint hover:text-orange transition-colors"
          >
            Logout
          </a>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink-dim">No posts yet.</p>
      ) : (
        <div className="flex flex-col">
          {posts.map((post) => (
            <AdminPostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
