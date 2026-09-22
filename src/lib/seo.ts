import type { Metadata } from "next";

const SITE_URL = "https://proflare.dev";
const DEFAULT_IMAGE = "/icons/icon.png";

export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_IMAGE;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ProFlare",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function excerptFromMarkdown(markdown: string, maxLength = 160) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trim()}…`;
}
