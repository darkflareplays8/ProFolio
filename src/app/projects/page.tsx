import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Fabric mods, Paper plugins, and Cloudflare-native tools built by ProFlare.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
        Things I&apos;ve built
      </h1>
      <p className="text-ink-dim max-w-md mb-10 leading-relaxed">
        Fabric mods, Paper plugins, and a handful of small Cloudflare-native
        tools. Click into any of these for the full write-up.
      </p>
      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
