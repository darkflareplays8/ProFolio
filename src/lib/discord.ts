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
    const data = await res.json();
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
