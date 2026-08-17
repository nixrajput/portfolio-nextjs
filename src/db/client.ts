import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

// `prepare: false` is required: under pgbouncer transaction pooling a connection is reused
// across statements, so named prepared statements fail with "does not exist".
const POOL_OPTS = { max: 5, idle_timeout: 20, connect_timeout: 10, prepare: false } as const;

const globalForDb = globalThis as unknown as {
  __pgClient?: Sql;
  __pgAdapterClient?: Sql;
};

function makeClient(url: string): Sql {
  return postgres(url, POOL_OPTS);
}

// Lazy, because `next build` transitively imports `db` while collecting page data - an eager
// throw on a missing DATABASE_URL would break the build. Validated at query time instead.
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

// A real (non-Proxy) instance because DrizzleAdapter runs `is(db, PgDatabase)` at module-eval
// time, which the Proxy above defeats (its `{}` target has no entityKind). Built eagerly with a
// fallback URL so `next build` works without DATABASE_URL; postgres() never dials until a query.
const adapterClient =
  globalForDb.__pgAdapterClient ??
  makeClient(process.env.DATABASE_URL ?? "postgres://build@localhost:5432/build");
globalForDb.__pgAdapterClient = adapterClient;

export const dbForAdapter: PostgresJsDatabase<typeof schema> = drizzle(adapterClient, { schema });

export type DB = PostgresJsDatabase<typeof schema>;
