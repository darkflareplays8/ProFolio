const DISCORD_INVITE_CODE = "swWnUpUhtT";

export type DiscordServerInfo = {
  name: string;
  iconUrl: string | null;
  memberCount: number | null;
  onlineCount: number | null;
};

export async function getDiscordServerInfo(): Promise<DiscordServerInfo | null> {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${DISCORD_INVITE_CODE}?with_counts=true`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      guild?: { id: string; name?: string; icon?: string | null };
      approximate_member_count?: number;
      approximate_presence_count?: number;
    };
    const guild = data.guild;
    if (!guild) return null;

    return {
      name: guild.name ?? "ProFlare Studios",
      iconUrl: guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
        : null,
      memberCount:
        typeof data.approximate_member_count === "number"
          ? data.approximate_member_count
          : null,
      onlineCount:
        typeof data.approximate_presence_count === "number"
          ? data.approximate_presence_count
          : null,
    };
  } catch {
    return null;
  }
}

export async function sendBlogWebhook(
  webhookUrl: string,
  post: { title: string; slug: string; mentionEveryone: boolean }
) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: post.mentionEveryone ? "@everyone" : undefined,
        allowed_mentions: { parse: post.mentionEveryone ? ["everyone"] : [] },
        embeds: [
          {
            title: "New Blog by ProFlare",
            description: post.title,
            url: `https://proflare.dev/blog/${post.slug}`,
            color: 0xff7a00,
            thumbnail: { url: "https://proflare.dev/icons/icon.png" },
          },
        ],
      }),
    });
  } catch {
    // best-effort; a failed webhook shouldn't block publishing
  }
}
