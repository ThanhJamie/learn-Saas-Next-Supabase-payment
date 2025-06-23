import { headers } from 'next/headers';

export async function POST() {
  const h = await headers();
  const xForwardedHost = h.get("x-forwarded-host");
  const origin = h.get("origin");
  console.log(`x-forwarded-host: ${xForwardedHost}`);
  console.log(`origin: ${origin}`);
  
  return new Response(
    JSON.stringify({ "x-forwarded-host": xForwardedHost, origin }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
