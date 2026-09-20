import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import PostForm from "@/components/PostForm";

export const dynamic = "force-dynamic";


export default async function NewPostPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
        New post
      </h1>
      <PostForm />
    </div>
  );
}
