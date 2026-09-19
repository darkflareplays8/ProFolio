import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proflare.dev"),
  title: {
    default: "ProFlare — Minecraft Mod & Plugin Developer",
    template: "%s — ProFlare",
  },
  description:
    "ProFlare — Minecraft Fabric mod developer and Paper plugin developer. Creator of AutoTotem+ (70k+ downloads) and other open-source Minecraft tools.",
  icons: {
    icon: "/icons/icon.png",
  },
  openGraph: {
    title: "ProFlare — Minecraft Mod & Plugin Developer",
    description:
      "Minecraft Fabric mod developer and Paper plugin developer. Creator of AutoTotem+ (70k+ downloads) and other open-source Minecraft tools.",
    url: "https://proflare.dev",
    siteName: "ProFlare",
    type: "website",
    images: ["/icons/icon.png"],
  },
  twitter: {
    card: "summary",
    title: "ProFlare — Minecraft Mod & Plugin Developer",
    description:
      "Minecraft Fabric mod developer and Paper plugin developer. Creator of AutoTotem+ (70k+ downloads) and other open-source Minecraft tools.",
    images: ["/icons/icon.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink relative">
        <div className="gutter hidden md:block" aria-hidden="true" />
        <div className="relative z-[1] flex flex-col min-h-full md:pl-[3.25rem]">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
