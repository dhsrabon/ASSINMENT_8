import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import db from "@/lib/sqlite";
import { user, account, session, verification } from "@/lib/db-schema";

const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret",
  baseURL: appUrl,
  database: drizzleAdapter(db, {
    schema: { user, account, session, verification },
    provider: "sqlite",
  }),
  trustedOrigins: [appUrl],

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