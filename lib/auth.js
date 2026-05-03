import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import db from "@/lib/sqlite";
import { user, account, session, verification } from "@/lib/db-schema";

const getAppUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

const getTrustedOrigins = () => {
  const origins = new Set();
  const appUrl = getAppUrl();
  origins.add(appUrl);
  origins.add("http://localhost:3000");
  origins.add("http://localhost:3001");
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  return Array.from(origins);
};

const appUrl = getAppUrl();
const trustedOrigins = getTrustedOrigins();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret",
  baseURL: appUrl,
  database: drizzleAdapter(db, {
    schema: { user, account, session, verification },
    provider: "sqlite",
  }),
  trustedOrigins,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});