import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { getModrinthDownloads } from "@/lib/modrinth";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ProFlare — Minecraft Mod & Plugin Developer",
  description:
    "Minecraft Fabric mod and Paper plugin developer. Creator of AutoTotem+ and other open-source tools, plus small Cloudflare-native projects.",
  path: "/",
  absoluteTitle: true,
});


export default async function Home() {
  const featured = projects.slice(0, 4);
  const liveDownloads =
    (await getModrinthDownloads(
      projects.find((p) => p.slug === "autototem-plus")?.modrinthProjectId
    )) ?? "140k+";

  const stats = [
    { label: "downloads", value: liveDownloads },
    { label: "shipped projects", value: String(projects.length) },
    { label: "primary stack", value: "Java / Rust / TS" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10">
      <section className="pt-16 pb-14">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/icons/icon.png"
            alt="ProFlare"
            width={44}
            height={44}
            className="rounded-md border border-line-strong"
          />
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            ProFlare
          </h1>
        </div>

        <p className="text-lg text-ink-dim leading-relaxed max-w-md mb-10">
          I build Fabric mods, Paper plugins, and small Cloudflare-native
          tools — most of it started as something I needed for my own
          servers and ended up worth sharing.
        </p>

        <dl className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 border-y border-line py-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
              <dt className="font-mono text-xs text-ink-faint">
                {stat.label}
              </dt>
              <dd className="font-medium text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/projects"
            className="text-sm font-medium px-5 py-2.5 rounded-md bg-orange text-bg hover:bg-amber transition-colors"
          >
            Browse projects
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium px-5 py-2.5 rounded-md border border-line-strong text-ink hover:border-orange/50 hover:text-orange transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <h2 className="text-sm font-medium text-ink-dim mb-4">Featured</h2>
        <div className="flex flex-col">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="inline-block mt-6 text-sm text-ink-dim hover:text-orange transition-colors"
        >
          all projects
        </Link>
      </section>
    </div>
  );
}
