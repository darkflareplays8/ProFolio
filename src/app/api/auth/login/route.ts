import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf";

export async function GET(request: NextRequest) {
  const env = await getEnv();
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify",
    prompt: "consent",
  });

  return NextResponse.redirect(
    `https://discord.com/api/oauth2/authorize?${params.toString()}`
  );
}
