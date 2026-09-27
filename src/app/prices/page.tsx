import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Prices",
  description: "Commission prices for Fabric mods, Paper plugins, and more.",
  path: "/prices",
});

const tiers = [
  {
    category: "Fabric Mods",
    items: [
      { label: "Small", price: "£3" },
      { label: "Medium", price: "£6" },
      { label: "Large", price: "£11" },
    ],
  },
  {
    category: "Paper Plugins",
    items: [
      { label: "Small", price: "£2" },
      { label: "Medium", price: "£4" },
      { label: "Large", price: "£9" },
    ],
  },
  {
    category: "Other",
    items: [
      { label: "Custom Server Store", price: "£20" },
      { label: "Discord Bot", price: "£7–30" },
      { label: "Discord–MC Integration", price: "£30" },
    ],
  },
];

export default function PricesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
        Prices
      </h1>
      <p className="text-ink-dim leading-relaxed mb-2 max-w-md">
        Rough pricing for commission work. Actual cost depends on scope and
        complexity.
      </p>
      <p className="text-ink-dim leading-relaxed mb-12 max-w-md">
        Commission slots can only be seen on my Discord profile.
      </p>

      <div className="flex flex-col gap-10">
        {tiers.map((tier) => (
          <div key={tier.category}>
            <h2 className="text-sm font-medium text-ink-dim mb-3">
              {tier.category}
            </h2>
            <div className="flex flex-col">
              {tier.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 border-t border-line first:border-t-0"
                >
                  <span className="text-ink">{item.label}</span>
                  <span className="font-mono text-sm text-orange">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink-dim leading-relaxed mt-14 pt-8 border-t border-line">
        Any further projects or higher requirements can be negotiated in the
        Discord server or DMs.
      </p>
    </div>
  );
}
