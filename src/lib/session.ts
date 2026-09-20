const encoder = new TextEncoder();

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(userId: string, secret: string) {
  const payload = JSON.stringify({ userId, iat: Date.now() });
  const payloadB64 = btoa(payload);
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${toHex(sig)}`;
}

export async function verifySessionToken(token: string, secret: string) {
  const [payloadB64, sigHex] = token.split(".");
  if (!payloadB64 || !sigHex) return null;

  const key = await getKey(secret);
  const expectedSig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadB64)
  );
  const expectedHex = toHex(expectedSig);
  if (expectedHex !== sigHex) return null;

  try {
    const payload = JSON.parse(atob(payloadB64));
    return payload as { userId: string; iat: number };
  } catch {
    return null;
  }
}
