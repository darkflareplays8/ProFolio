import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Who ProFlare is and what ProFlare Studios works on.",
};

const stack = ["Java", "Rust", "TypeScript", "Node.js", "Kotlin", "Swift"];

const focus = [
  {
    title: "Minecraft",
    body: "Fabric mods and Paper/Folia plugins — from small quality-of-life tools to mods with tens of thousands of downloads.",
  },
  {
    title: "Cloudflare",
    body: "Workers, D1, and edge-native tooling for stores, pastebins, and license systems, usually with no build step and minimal dependencies.",
  },
  {
    title: "Open source",
    body: "Small, focused npm packages — CLI tools, signers, and libraries built to do one thing well.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
        Hey, I&apos;m ProFlare.
      </h1>
      <p className="text-ink-dim leading-relaxed mb-4 max-w-md">
        I&apos;m a developer working under the brand{" "}
        <span className="text-ink">ProFlare Studios</span>, mostly across
        Minecraft Fabric mods, Paper plugins, and Cloudflare Workers
        infrastructure.
      </p>
      <p className="text-ink-dim leading-relaxed mb-14 max-w-md">
        I take on freelance work through Upwork and pick up open-source
        bounties through Algora when a project lines up with what I&apos;m
        already building.
      </p>

      <h2 className="text-sm font-medium text-ink-dim mb-4">Focus</h2>
      <div className="flex flex-col mb-14">
        {focus.map((item) => (
          <div
            key={item.title}
            className="py-4 border-t border-line first:border-t-0"
          >
            <h2 className="font-medium text-ink mb-1.5">{item.title}</h2>
            <p className="text-sm text-ink-dim leading-relaxed max-w-md">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium text-ink-dim mb-4">Stack</h2>
      <p className="font-mono text-sm text-ink-dim">
        {stack.join(" / ")}
      </p>
    </div>
  );
}
