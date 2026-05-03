import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { user, account, session, verification } from "./db-schema";

const isProduction = process.env.NODE_ENV === "production";
const dbDir = isProduction ? "/tmp" : path.join(process.cwd(), "data");
const dbPath = path.join(dbDir, "auth.db");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    email_verified INTEGER NOT NULL,
    image TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT NOT NULL REFERENCES user(id)
  );

  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES user(id),
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    access_token_expires_at INTEGER,
    refresh_token_expires_at INTEGER,
    scope TEXT,
    password TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
`);

const db = drizzle(sqlite, { schema: { user, account, session, verification } });

export default db;
