import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf";
import { createSessionToken } from "@/lib/session";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const env = await getEnv();
  const code = request.nextUrl.searchParams.get("code");
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback`;

  if (!code) {
    return NextResponse.redirect(`${request.nextUrl.origin}/admin?error=1`);
  }

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${request.nextUrl.origin}/admin?error=1`);
  }

  const tokenData = (await tokenRes.json()) as { access_token: string };

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(`${request.nextUrl.origin}/admin?error=1`);
  }

  const user = (await userRes.json()) as { id: string };

  if (user.id !== env.DISCORD_ADMIN_USER_ID) {
    return NextResponse.redirect(`${request.nextUrl.origin}/admin?error=unauthorized`);
  }

  const session = await createSessionToken(user.id, env.SESSION_SECRET);
  const response = NextResponse.redirect(`${request.nextUrl.origin}/admin`);
  response.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
