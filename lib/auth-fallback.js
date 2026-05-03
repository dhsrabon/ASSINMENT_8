import fs from "fs";
import path from "path";
import crypto from "crypto";

const usersFile = path.join(process.cwd(), "data", "users.json");
const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

function getUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function parseAuthCookie(cookieHeader) {
  const match = cookieHeader.match(/auth=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function createCookie(value) {
  return `auth=${encodeURIComponent(JSON.stringify(value))}; Path=/; HttpOnly; SameSite=Lax`;
}

export const fallbackAuth = {
  handler: async (req) => {
    const pathname = req.nextUrl.pathname;

    if (pathname.includes("/sign-up/email") && req.method === "POST") {
      const body = await req.json();
      const users = getUsers();
      const existing = users.find((u) => u.email === body.email);

      if (existing) {
        return Response.json({ error: { message: "Email already registered" } }, { status: 400 });
      }

      const newUser = {
        id: crypto.randomUUID(),
        email: body.email,
        name: body.name,
        image: body.image || null,
        password: hashPassword(body.password),
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      const safeUser = { ...newUser, password: undefined };
      return Response.json(
        { token: null, user: safeUser },
        {
          status: 200,
          headers: { "Set-Cookie": createCookie(safeUser) },
        }
      );
    }

    if (pathname.includes("/sign-in/email") && req.method === "POST") {
      const body = await req.json();
      const users = getUsers();
      const user = users.find((u) => u.email === body.email);

      if (!user || user.password !== hashPassword(body.password)) {
        return Response.json({ error: { message: "Invalid email or password" } }, { status: 400 });
      }

      const safeUser = { ...user, password: undefined };
      return Response.json(
        { token: null, user: safeUser, session: { user: safeUser } },
        {
          status: 200,
          headers: { "Set-Cookie": createCookie(safeUser) },
        }
      );
    }

    if (pathname.includes("/get-session") && req.method === "GET") {
      const user = parseAuthCookie(req.headers.get("cookie") || "");
      if (!user) {
        return Response.json({ session: null }, { status: 200 });
      }
      return Response.json({ user, session: { user } }, { status: 200 });
    }

    if (pathname.includes("/sign-out") && req.method === "POST") {
      const response = Response.json({ success: true }, { status: 200 });
      response.headers.set("Set-Cookie", "auth=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");
      return response;
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  },
};