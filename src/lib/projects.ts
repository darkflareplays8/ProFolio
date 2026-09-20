export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectStat = {
  label: string;
  value: string;
};

export type ChangelogEntry = {
  version: string;
  date: string;
  notes: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  featured?: boolean;
  stats?: ProjectStat[];
  links: ProjectLink[];
  modrinthProjectId?: string;
  changelog?: ChangelogEntry[];
};

export const projects: Project[] = [
  {
    slug: "autototem-plus",
    name: "AutoTotem+",
    tagline: "Fabric mod for automatic totem equipping, 140k+ downloads",
    description:
      "A Fabric mod that automatically swaps a Totem of Undying into your offhand when it's empty, using a tick-spread state machine that mirrors vanilla's own slot-swap packets so the server never flags it as suspicious. Rebuilt around a proper IDLE → SWAP_IN → EQUIP → RESTORE state machine to fix ghost-totem and infinite-hotbar-cycle bugs from earlier versions, with correct inventory-to-container slot index mapping and full server-side sync for the offhand equip.",
    tags: ["Fabric", "Java", "Minecraft"],
    featured: true,
    stats: [{ label: "Downloads", value: "140k+" }],
    modrinthProjectId: "uWKQfxMw",
    links: [
      { label: "Modrinth", url: "https://modrinth.com/mod/autototem-plus" },
    ],
    changelog: [
      {
        version: "26.2 port",
        date: "June 2026",
        notes: [
          "Fixed ghost-totem and infinite-hotbar-cycle bugs by replacing QUICK_MOVE with tick-spread PICKUP-style slot swaps",
          "Ported to MC 26.2 (Loom 1.17+, Fabric API 0.152.2+26.2, ModMenu 20.0.0-beta.3)",
          "Fixed the minecraft.gui.setScreen() API change in 26.2",
          "Added a pauseDuringInventory config option",
        ],
      },
    ],
  },
  {
    slug: "simple-server-transfer",
    name: "Simple Server Transfer",
    tagline: "Paper/Folia plugin using the vanilla Transfer packet",
    description:
      "A lightweight Paper/Folia plugin that moves players between servers using Minecraft's own vanilla Transfer packet instead of a proxy-based hop, keeping the transition clean and dependency-free.",
    tags: ["Paper", "Folia", "Java"],
    links: [
      { label: "Modrinth", url: "https://modrinth.com/plugin/simple-server-transfer" },
      { label: "GitHub", url: "https://github.com/darkflareplays8/Simple-Server-Transfer" },
    ],
  },
  {
    slug: "ascii-stream",
    name: "ascii-stream",
    tagline: "CLI for streaming video and GIFs as ASCII art in the terminal",
    description:
      "A published npm package that streams video or GIF input straight into your terminal as live ASCII art, built on top of ffmpeg-static for frame extraction and decoding.",
    tags: ["Node.js", "CLI", "npm"],
    links: [
      { label: "npm i -g ascii-stream", url: "https://www.npmjs.com/package/ascii-stream" },
    ],
  },
  {
    slug: "sigv4-lite",
    name: "sigv4-lite",
    tagline: "Minimal AWS SigV4 signer built on Web Crypto only",
    description:
      "A minimal AWS SigV4 request signer with zero dependencies, using only the Web Crypto API so it runs natively on Cloudflare Workers, Deno, Bun, and in the browser. The signing approach was originally hand-rolled for paste.proflare.dev and later extracted into its own package.",
    tags: ["TypeScript", "Cloudflare Workers", "npm"],
    links: [
      { label: "npm i sigv4-lite", url: "https://www.npmjs.com/package/sigv4-lite" },
    ],
  },
  {
    slug: "frog-linux",
    name: "Frog Linux",
    tagline: "Custom Arch-based Linux distro",
    description:
      "A custom Arch-based Linux distribution, including a WebKitGTK/Tauri compatibility layer and fixes to the Calamares installer around display manager setup, SDDM enablement, and live-session account permissions.",
    tags: ["Linux", "Arch", "Shell"],
    links: [
      { label: "GitHub", url: "https://github.com/Crazy10061/Frog-Linux" },
    ],
  },
  {
    slug: "paste-proflare",
    name: "paste.proflare.dev",
    tagline: "Cloudflare Worker pastebin backed by Backblaze B2",
    description:
      "A single-file Cloudflare Worker pastebin with no build step, storing pastes in Backblaze B2's free S3-compatible tier via a hand-rolled Web-Crypto-only SigV4 signer. Includes a live byte counter, configurable TTL, a modal save popup, light/dark mode, and an hourly cron job that lazily deletes expired pastes.",
    tags: ["Cloudflare Workers", "TypeScript", "Backblaze B2"],
    links: [{ label: "Visit", url: "https://paste.proflare.dev" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next =
    index < projects.length - 1 ? projects[index + 1] : projects[0];
  return { prev, next };
}
