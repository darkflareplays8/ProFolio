import type { Metadata } from "next";
import Image from "next/image";
import { getDiscordServerInfo } from "@/lib/discord";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ProFlare.",
};

const DISCORD_INVITE = "https://discord.gg/swWnUpUhtT";

const otherChannels = [
  {
    label: "GitHub",
    value: "darkflareplays8",
    href: "https://github.com/darkflareplays8",
    note: "Issues and PRs on any of my repos.",
  },
];

export default async function ContactPage() {
  const discord = await getDiscordServerInfo();

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
        Let&apos;s talk.
      </h1>
      <p className="text-ink-dim leading-relaxed mb-12 max-w-md">
        Open to freelance work and collaborations. Reach out through
        whichever of these fits best.
      </p>

      <a
        href={DISCORD_INVITE}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-line-strong p-4 mb-4 hover:border-orange/50 hover:bg-bg-raised transition-colors"
      >
        {discord?.iconUrl ? (
          <Image
            src={discord.iconUrl}
            alt={discord.name}
            width={48}
            height={48}
            unoptimized
            className="rounded-full border border-line-strong shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-bg-raised border border-line-strong shrink-0 flex items-center justify-center font-mono text-xs text-ink-faint">
            PF
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-ink group-hover:text-amber transition-colors truncate">
            {discord?.name ?? "ProFlare Studios"}
          </h2>
          <p className="text-sm text-ink-dim">
            Best for bug reports, support, or just talking shop.
          </p>
        </div>
        {discord && (discord.onlineCount !== null || discord.memberCount !== null) && (
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 font-mono text-xs">
            {discord.onlineCount !== null && (
              <span className="flex items-center gap-1.5 text-ink-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {discord.onlineCount} online
              </span>
            )}
            {discord.memberCount !== null && (
              <span className="text-ink-faint">
                {discord.memberCount} members
              </span>
            )}
          </div>
        )}
      </a>

      <div className="flex flex-col">
        {otherChannels.map((channel) => (
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
