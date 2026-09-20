import { cookies } from "next/headers";
import { getEnv } from "@/lib/cf";
import { verifySessionToken } from "@/lib/session";

export const SESSION_COOKIE = "profolio_admin_session";

export async function getAdminSession() {
  const env = await getEnv();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifySessionToken(token, env.SESSION_SECRET);
  if (!payload) return null;
  if (payload.userId !== env.DISCORD_ADMIN_USER_ID) return null;

  return payload;
}
