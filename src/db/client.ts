import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

// postgres-js speaks the standard Postgres wire protocol, so the same client
// works against local Postgres in dev and Neon (via its pooler URL) in prod.
//
// Connection management: we cache the underlying postgres() client on
// globalThis so Next's dev HMR and repeated module evaluations REUSE one pool
// instead of opening a fresh pool on every reload/build worker (which leaks
// connections until Postgres hits "too many clients"). The pool is kept small
// with an idle timeout so connections are released when not in use.
//
// `prepare: false` disables named prepared statements. Neon (and most managed
// Postgres) pool through pgbouncer; in transaction pooling mode a connection is
// reused across statements, so server-side prepared statements break with
// "prepared statement does not exist". Disabling them keeps the same client
// safe whether the URL points at a direct connection or a transaction pooler.
const POOL_OPTS = { max: 5, idle_timeout: 20, connect_timeout: 10, prepare: false } as const;

const globalForDb = globalThis as unknown as {
  __pgClient?: Sql;
  __pgAdapterClient?: Sql;
};

function makeClient(url: string): Sql {
  return postgres(url, POOL_OPTS);
}

// Lazily create the Drizzle client on first query rather than at import time.
// `next build` imports modules that transitively reach `db` while collecting
// page data — an eager `throw` on a missing DATABASE_URL would break the build
// (and CI) without any real database. We validate the env var only at query time.
let _db: PostgresJsDatabase<typeof schema> | null = null;

function getDb(): PostgresJsDatabase<typeof schema> {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = globalForDb.__pgClient ?? makeClient(url);
  globalForDb.__pgClient = client;
  _db = drizzle(client, { schema });
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
const adapterClient =
  globalForDb.__pgAdapterClient ??
  makeClient(process.env.DATABASE_URL ?? "postgres://build@localhost:5432/build");
globalForDb.__pgAdapterClient = adapterClient;

export const dbForAdapter: PostgresJsDatabase<typeof schema> = drizzle(adapterClient, { schema });

export type DB = PostgresJsDatabase<typeof schema>;
