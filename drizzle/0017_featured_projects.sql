-- Data migration. src/db/seed.ts returns early when a profile row exists, so editing its
-- featured list never reaches an already-populated database; this applies the change there.

-- Guarded on the table being non-empty. On a FRESH database this migration runs BEFORE
-- db:seed, so an unconditional insert here collides with the seed's own insert on the unique
-- repo index. An empty table means the seed is authoritative and this has nothing to repair.
INSERT INTO "projects" ("repo", "title", "tags", "featured", "order", "hidden", "screenshots")
SELECT v.repo, v.title, v.tags::jsonb, true, v.ord, false, '[]'::jsonb
FROM (
  VALUES
    ('mcp-vitest', 'mcp-vitest', '["MCP","Vitest","Testing"]', 0),
    ('ai-sdk-threads', 'ai-sdk-threads', '["AI SDK","Persistence","Drizzle"]', 1)
) AS v(repo, title, tags, ord)
WHERE EXISTS (SELECT 1 FROM "projects")
ON CONFLICT ("repo") DO NOTHING;
--> statement-breakpoint

-- The updates below are no-ops on an empty table, so they need no guard.
-- Cleared first so the curated set is exactly what ends up featured; this drops
-- ecommerce-mern, which was featured before.
UPDATE "projects" SET "featured" = false;
--> statement-breakpoint

-- `order` doubles as the showcase ranking, so these values are the order they lead with.
UPDATE "projects" SET "featured" = true, "order" = v.ord
FROM (
  VALUES
    ('mcp-vitest', 0),
    ('ai-sdk-threads', 1),
    ('social-media-app-flutter', 2),
    ('flutter_carousel_widget', 3),
    ('get_time_ago', 4),
    ('social-media-api-nodejs', 5),
    ('siphon', 6)
) AS v(repo, ord)
WHERE "projects"."repo" = v.repo;
--> statement-breakpoint

-- siphon is a Go binary that shells out to pg_dump; it was tagged TypeScript. The other
-- language-duplicating tags need no fix because mergeProjects strips a tag that repeats the
-- live GitHub language at render time.
UPDATE "projects" SET "tags" = '["CLI","Postgres","MySQL"]'::jsonb WHERE "repo" = 'siphon';
