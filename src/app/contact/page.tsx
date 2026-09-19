import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ProFlare.",
};

const channels = [
  {
    label: "Discord",
    value: "ProFlare Studios server",
    href: "https://discord.gg/swWnUpUhtT",
    note: "Best for bug reports, support, or just talking shop.",
  },
  {
    label: "GitHub",
    value: "darkflareplays8",
    href: "https://github.com/darkflareplays8",
    note: "Issues and PRs on any of my repos.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
        Let&apos;s talk.
      </h1>
      <p className="text-ink-dim leading-relaxed mb-12 max-w-md">
        Open to freelance work and collaborations. Reach out through
        whichever of these fits best.
      </p>

      <div className="flex flex-col">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-5 border-t border-line first:border-t-0 hover:bg-bg-raised transition-colors -mx-4 px-4"
          >
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="font-medium text-ink group-hover:text-amber transition-colors">
                {channel.label}
              </h2>
              <span className="font-mono text-xs text-orange">
                {channel.value}
              </span>
            </div>
            <p className="text-sm text-ink-dim">{channel.note}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
