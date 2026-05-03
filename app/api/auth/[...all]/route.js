import { fallbackAuth } from "@/lib/auth-fallback";

const useFallback = process.env.NODE_ENV === "development" && !process.env.BETTER_AUTH_SECRET;

let realAuthHandler = null;

const getHandler = async () => {
  if (!realAuthHandler) {
    try {
      const authModule = await import("@/lib/auth");
      realAuthHandler = authModule.auth.handler;
    } catch (err) {
      console.error("[Auth Route] Failed to import auth handler:", err);
      return null;
    }
  }
  return realAuthHandler;
};

const wrapHandler = (handler) => {
  return async (req, res) => {
    try {
      const origin = req.headers.get("origin");
      const host = req.headers.get("host");
      console.log(`[Auth] Request from origin: ${origin}, host: ${host}`);
      
      return await handler(req, res);
    } catch (error) {
      console.error("[Auth Route] Error:", error);
      if (error.message?.includes("Invalid origin")) {
        const origin = req.headers.get("origin");
        const host = req.headers.get("host");
        console.error(
          `[Auth] Origin validation failed. origin: ${origin}, host: ${host}. Set BETTER_AUTH_URL on Vercel.`
        );
        return Response.json(
          {
            error: {
              message: `Invalid origin: ${origin}. Please set BETTER_AUTH_URL in Vercel environment variables.`,
            },
          },
          { status: 400 }
        );
      }
      throw error;
    }
  };
};

const handler = useFallback
  ? fallbackAuth.handler
  : async (req, res) => {
      const realHandler = await getHandler();
      if (!realHandler) {
        return Response.json(
          { error: { message: "Auth service unavailable" } },
          { status: 500 }
        );
      }
      return wrapHandler(realHandler)(req, res);
    };

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
