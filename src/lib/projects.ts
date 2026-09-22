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
      "Keeps a Totem of Undying in your offhand at all times, swapping one in automatically the moment it breaks. The tricky part was doing this without the server flagging it as cheating — it mirrors vanilla's own slot-swap packets instead of teleporting the item in, so anti-cheat plugins see nothing unusual. Earlier versions had a nasty ghost-totem bug and could get stuck cycling your hotbar forever. I rewrote the whole thing around a proper state machine (IDLE → SWAP_IN → EQUIP → RESTORE) with correct slot index mapping, which fixed both issues for good.",
    tags: ["Fabric", "Java", "Minecraft"],
    featured: true,
    stats: [{ label: "Downloads", value: "140k+" }],
    modrinthProjectId: "uWKQfxMw",
    links: [
      { label: "Modrinth", url: "https://modrinth.com/project/uWKQfxMw" },
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
      "Moves players between servers using Minecraft's own vanilla Transfer packet, so there's no proxy hop or extra dependency involved — just a clean handoff on Paper or Folia.",
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
      "Streams video or GIFs into your terminal as live ASCII art. It's built on ffmpeg-static for the actual frame extraction and decoding, so it works anywhere Node does.",
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
      "A zero-dependency AWS SigV4 signer that only uses the Web Crypto API, so it runs natively on Cloudflare Workers, Deno, Bun, or straight in the browser. I originally hand-rolled the signing logic for paste.proflare.dev, then pulled it out into its own package once it was clear other projects would need the same thing.",
    tags: ["TypeScript", "Cloudflare Workers", "npm"],
    links: [
      { label: "npm i sigv4-lite", url: "https://www.npmjs.com/package/sigv4-lite" },
    ],
  },
  {
    slug: "frog-linux",
    name: "Frog Linux",
    tagline: "Custom Arch-based Linux distro — contributor, not the original creator",
    description:
      "A custom Arch-based Linux distro. I'm a contributor here, not the original creator — my work has mainly been a WebKitGTK/Tauri compatibility layer, plus fixing a handful of Calamares installer issues: a missing display manager module, SDDM not enabling properly after install, and the live session keeping sudo access it shouldn't have.",
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
      "A pastebin that's just one Cloudflare Worker file — no build step, no framework. Pastes get stored in Backblaze B2's free tier, signed with a SigV4 implementation I hand-rolled using only Web Crypto. It's got the basics you'd expect: a live byte counter, configurable expiry, light/dark mode, and an hourly cron job that quietly cleans up anything that's expired.",
    tags: ["Cloudflare Workers", "TypeScript", "Backblaze B2"],
    links: [{ label: "Visit", url: "https://paste.proflare.dev" }],
  },
  {
    slug: "profolio",
    name: "ProFlare Studios (portfolio)",
    tagline: "This site — a multi-page portfolio and blog built on Cloudflare Workers",
    description:
      "The site you're on right now. It's a Next.js app running on Cloudflare Workers via the OpenNext adapter, with a D1 database backing the blog and an admin panel for writing posts. New posts auto-announce in Discord, and the download stats on these project pages pull live from the Modrinth API instead of sitting there as stale numbers.",
    tags: ["Next.js", "Cloudflare Workers", "D1"],
    links: [
      { label: "GitHub", url: "https://github.com/darkflareplays8/ProFolio" },
    ],
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
