import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg p-4 mb-3 border border-line-strong border-l-[3px] border-l-orange bg-bg-raised/30 transition-colors md:grid md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-x-6 md:gap-y-1 md:rounded-none md:p-0 md:py-4 md:pl-4 md:mb-0 md:border-0 md:border-l-2 md:border-l-line-strong md:-ml-4 md:bg-transparent hover:border-orange md:hover:border-l-orange md:hover:bg-bg-raised"
    >
      <p className="font-medium text-ink group-hover:text-amber transition-colors">
        {project.name}
      </p>
      <p className="text-sm text-ink-dim mt-1 md:mt-0">
        {project.tagline}
      </p>
      <p className="font-mono text-xs text-ink-faint mt-2 md:mt-0 md:text-right md:whitespace-nowrap">
        {project.stats?.[0]
          ? `${project.stats[0].value} ${project.stats[0].label.toLowerCase()}`
          : project.tags[0]?.toLowerCase()}
      </p>
    </Link>
  );
}
