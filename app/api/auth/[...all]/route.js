import { fallbackAuth } from "@/lib/auth-fallback";

const useFallback = process.env.NODE_ENV === "development" && !process.env.BETTER_AUTH_SECRET;

const getHandler = async () => {
  if (useFallback) {
    return fallbackAuth.handler;
  }
  try {
    const { auth } = await import("@/lib/auth");
    return auth.handler;
  } catch (err) {
    console.error("[Auth] Failed to import auth handler:", err);
    throw err;
  }
};

let cachedHandler = null;

const handler = async (req) => {
  try {
    // Log request details for debugging
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    const url = req.nextUrl.pathname;
    
    console.log(`[Auth Route] ${req.method} ${url} | origin: ${origin} | host: ${host}`);

    if (!cachedHandler) {
      cachedHandler = await getHandler();
    }

    const response = await cachedHandler(req);
    return response;
  } catch (error) {
    console.error("[Auth Route] Handler error:", error);
    
    // Return a more helpful error response
    if (error.message?.includes("Invalid origin") || error.message?.includes("invalid origin")) {
      return Response.json(
        {
          error: {
            message: `Invalid origin. Please ensure BETTER_AUTH_SECRET and BETTER_AUTH_URL are set in environment variables.`,
          },
        },
        { status: 400 }
      );
    }
    
    return Response.json(
      { error: { message: "Authentication service error" } },
      { status: 500 }
    );
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
