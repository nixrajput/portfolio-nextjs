import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazily create the Drizzle client on first query rather than at import time.
// `next build` imports modules that transitively reach `db` while collecting
// page data — an eager `throw` on a missing DATABASE_URL would break the build
// (and CI) without any real database. We still validate the env var, but only
// when a query actually runs, so a misconfigured deploy fails loudly at use.
//
// postgres-js speaks the standard Postgres wire protocol, so the same client
// works against local Postgres in dev and Neon (via its pooler URL) in prod.
let _db: PostgresJsDatabase<typeof schema> | null = null;

function getDb(): PostgresJsDatabase<typeof schema> {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  _db = drizzle(postgres(url), { schema });
  return _db;
}

// A Proxy so `db.select()...` works exactly like a normal Drizzle instance,
// but the underlying connection is created on first property access.
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});

// A real (non-Proxy) Drizzle instance for the Auth.js DrizzleAdapter.
// DrizzleAdapter calls `is(db, PgDatabase)` synchronously at module-evaluation
// time to detect the SQL dialect — the Proxy above defeats that check because
// the empty target `{}` carries no `entityKind` symbol. We build this instance
// eagerly with a build-safe fallback URL so the adapter receives a typed object
// at import time during `next build` (where DATABASE_URL is legitimately absent).
// `postgres()` does not connect until a query runs, so the fallback never dials.
export const dbForAdapter: PostgresJsDatabase<typeof schema> = drizzle(
  postgres(process.env.DATABASE_URL ?? "postgres://build@localhost:5432/build"),
  { schema },
);

export type DB = PostgresJsDatabase<typeof schema>;
