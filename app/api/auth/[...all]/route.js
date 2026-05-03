import { fallbackAuth } from "@/lib/auth-fallback";

const mongoUriInvalid =
  !process.env.MONGODB_URI ||
  process.env.MONGODB_URI.includes("YOUR_NEW_PASSWORD") ||
  process.env.MONGODB_URI.includes("<db_password>");

const useFallback = process.env.NODE_ENV === "development" && mongoUriInvalid;

const handler = useFallback
  ? fallbackAuth.handler
  : mongoUriInvalid
  ? async () =>
      Response.json(
        {
          error: {
            message:
              "Missing or invalid MONGODB_URI in production. Set MONGODB_URI and BETTER_AUTH_URL in Vercel environment variables.",
          },
        },
        { status: 500 }
      )
  : (await import("@/lib/auth")).auth.handler;

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
