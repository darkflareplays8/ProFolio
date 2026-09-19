import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-[1fr_auto] md:grid-cols-[220px_1fr_auto] gap-x-6 gap-y-1 items-baseline py-4 pl-4 border-l-2 border-line-strong hover:border-orange hover:bg-bg-raised transition-colors -ml-4"
    >
      <p className="font-medium text-ink group-hover:text-amber transition-colors">
        {project.name}
      </p>
      <p className="text-sm text-ink-dim md:col-start-2 col-span-2 md:col-span-1">
        {project.tagline}
      </p>
      <p className="font-mono text-xs text-ink-faint whitespace-nowrap text-right">
        {project.stats?.[0]
          ? `${project.stats[0].value} ${project.stats[0].label.toLowerCase()}`
          : project.tags[0]?.toLowerCase()}
      </p>
    </Link>
  );
}
