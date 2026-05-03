import { fallbackAuth } from "@/lib/auth-fallback";

const useFallback =
  !process.env.MONGODB_URI ||
  process.env.MONGODB_URI.includes("YOUR_NEW_PASSWORD") ||
  process.env.MONGODB_URI.includes("<db_password>");

const handler = useFallback
  ? fallbackAuth.handler
  : (await import("@/lib/auth")).auth.handler;

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
