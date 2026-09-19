import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const stats = [
  { label: "downloads", value: "70k+" },
  { label: "shipped projects", value: "6" },
  { label: "primary stack", value: "Java / Rust / TS" },
];

export default function Home() {
  const featured = projects.slice(0, 4);

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
          tools — usually solving problems that only show up once something
          is under real load.
        </p>

        <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="font-mono text-xs text-ink-faint">
                {stat.label}
              </dt>
              <dd className="font-medium text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
          <Link
            href="/projects"
            className="text-orange hover:text-amber transition-colors"
          >
            browse projects
          </Link>
          <Link
            href="/contact"
            className="text-ink-dim hover:text-ink transition-colors"
          >
            get in touch
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
