const links = [
  { label: "github", href: "https://github.com/darkflareplays8" },
  { label: "modrinth", href: "https://modrinth.com/organization/proflarestudios" },
  { label: "discord", href: "https://discord.gg/swWnUpUhtT" },
  { label: "docs", href: "https://docs.proflare.dev" },
  { label: "more-links", href: "https://links.proflare.dev" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-faint">
          proflare.dev — built by ProFlare
        </p>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-ink-dim">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-colors"
              >
                {link.label}
              </a>
              {i < links.length - 1 && (
                <span className="text-ink-faint select-none">/</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
