import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/lib/projects";
import { getModrinthDownloads } from "@/lib/modrinth";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.tagline,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const liveDownloads = await getModrinthDownloads(project.modrinthProjectId);
  const stats = project.stats?.map((stat) =>
    stat.label === "Downloads" && liveDownloads
      ? { ...stat, value: liveDownloads }
      : stat
  );

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <Link
        href="/projects"
        className="font-mono text-xs text-ink-faint hover:text-orange transition-colors inline-block mb-10"
      >
        ../projects
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
        {project.name}
      </h1>
      <p className="text-ink-dim leading-relaxed mb-6 max-w-md">
        {project.tagline}
      </p>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm mb-8 pb-6 border-b border-line">
        {project.links.map((link, i) => (
          <span key={link.url} className="flex items-baseline gap-6">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:text-amber underline decoration-orange/30 underline-offset-4 transition-colors"
            >
              {link.label}
            </a>
            {i < project.links.length - 1 && (
              <span className="text-ink-faint select-none">·</span>
            )}
          </span>
        ))}
        {stats?.map((stat) => (
          <span key={stat.label} className="font-mono text-xs text-ink-faint">
            {stat.value} {stat.label.toLowerCase()}
          </span>
        ))}
      </div>

      <p className="text-ink/90 leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-faint mb-16">
        {project.tags.map((tag, i) => (
          <span key={tag}>
            {tag.toLowerCase()}
            {i < project.tags.length - 1 && (
              <span className="ml-3 text-ink-faint/60">/</span>
            )}
          </span>
        ))}
      </div>

      {project.changelog && project.changelog.length > 0 && (
        <div className="mb-16">
          <h2 className="text-sm font-medium text-ink-dim mb-5">Changelog</h2>
          <div className="space-y-5">
            {project.changelog.map((entry) => (
              <div key={entry.version}>
                <p className="font-mono text-xs mb-2">
                  <span className="text-amber">{entry.version}</span>
                  <span className="text-ink-faint"> — {entry.date}</span>
                </p>
                <ul className="space-y-1 pl-4">
                  {entry.notes.map((note) => (
                    <li
                      key={note}
                      className="text-sm text-ink-dim leading-relaxed relative before:content-['-'] before:absolute before:-left-4 before:text-ink-faint"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-line pt-6 font-mono text-xs">
        <Link
          href={`/projects/${prev.slug}`}
          className="text-ink-dim hover:text-orange transition-colors"
        >
          ← {prev.slug}
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="text-ink-dim hover:text-orange transition-colors"
        >
          {next.slug} →
        </Link>
      </div>
    </div>
  );
}
