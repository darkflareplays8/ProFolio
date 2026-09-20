import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CloudflareEnv = {
  DB: D1Database;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  DISCORD_ADMIN_USER_ID: string;
  DISCORD_WEBHOOK_URL: string;
  SESSION_SECRET: string;
};

export async function getEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as CloudflareEnv;
}
