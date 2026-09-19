import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const externalLinks = [
  { label: "Docs", href: "https://docs.proflare.dev" },
  { label: "More Links", href: "https://links.proflare.dev" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="max-w-3xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm text-ink hover:text-amber transition-colors"
        >
          proflare<span className="text-orange">.</span>dev
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-dim hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline text-ink-faint hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
