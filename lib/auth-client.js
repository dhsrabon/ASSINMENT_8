"use client";

import { useEffect, useState } from "react";

const basePath = "/api/auth";

async function request(path, body = null, method = "POST") {
  const options = {
    method,
    headers: {},
    credentials: "include",
  };

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${basePath}${path}`, options);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw data?.error?.message || data?.message || "Request failed";
  }

  return data;
}

export function useSession() {
  const [session, setSession] = useState({ data: null, isPending: true });

  useEffect(() => {
    let mounted = true;
    request("/get-session", null, "GET")
      .then((data) => {
        if (mounted) {
          setSession({ data: data.session || null, isPending: false });
        }
      })
      .catch(() => {
        if (mounted) {
          setSession({ data: null, isPending: false });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return session;
}

export const authClient = {
  useSession,
  signIn: {
    email: async (body) => request("/sign-in/email", body, "POST"),
    social: async () => {
      throw new Error("Social login is unavailable in this local auth mode.");
    },
  },
  signUp: {
    email: async (body) => request("/sign-up/email", body, "POST"),
  },
  signOut: async () => request("/sign-out", null, "POST"),
};