import "dotenv/config";
import { Client } from "pg";

/**
 * Connects to the maintenance DB (`postgres`) and creates the target database
 * from DATABASE_URL if it is missing (Prisma P1003 / DatabaseDoesNotExist).
 */
function getDatabaseUrl(): string {
  const u = process.env.DATABASE_URL;
  if (!u) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }
  return u;
}

function parseUrlForAdmin(connectionString: string): { adminUrl: string; targetDb: string } {
  const normalized = connectionString.replace(/^postgresql:\/\//i, "http://").replace(/^postgres:\/\//i, "http://");
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    console.error("Could not parse DATABASE_URL.");
    process.exit(1);
  }
  const path = parsed.pathname.replace(/^\//, "");
  const targetDb = decodeURIComponent(path.split("/")[0] || "");
  if (!targetDb) {
    console.error("Could not parse database name from DATABASE_URL path.");
    process.exit(1);
  }
  parsed.pathname = "/postgres";
  const adminHttp = parsed.toString();
  const adminUrl = adminHttp.replace(/^http:\/\//i, "postgresql://").replace(/^https:\/\//i, "postgresql://");
  return { adminUrl, targetDb };
}

function quoteIdent(name: string): string {
  return `"${name.replace(/"/g, '""')}"`;
}

async function main() {
  const { adminUrl, targetDb } = parseUrlForAdmin(getDatabaseUrl());

  const client = new Client({ connectionString: adminUrl });
  await client.connect();
  try {
    const { rows } = await client.query<{ exists: boolean }>(
      "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = $1) AS exists",
      [targetDb]
    );
    if (rows[0]?.exists) {
      console.log(`Database "${targetDb}" already exists.`);
      return;
    }
    await client.query(`CREATE DATABASE ${quoteIdent(targetDb)}`);
    console.log(`Created database "${targetDb}".`);
  } finally {
    await client.end();
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
