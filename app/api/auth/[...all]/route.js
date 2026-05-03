import { fallbackAuth } from "@/lib/auth-fallback";

const useFallback = process.env.NODE_ENV === "development" && !process.env.BETTER_AUTH_SECRET;

const handler = useFallback
  ? fallbackAuth.handler
  : (await import("@/lib/auth")).auth.handler;

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
