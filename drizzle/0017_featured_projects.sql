-- Data migration. src/db/seed.ts returns early when a profile row exists, so editing its
-- featured list never reaches an already-populated database; this applies the change there.

INSERT INTO "projects" ("repo", "title", "tags", "featured", "order", "hidden", "screenshots")
VALUES
  ('mcp-vitest', 'mcp-vitest', '["MCP","Vitest","Testing"]'::jsonb, true, 0, false, '[]'::jsonb),
  ('ai-sdk-threads', 'ai-sdk-threads', '["AI SDK","Persistence","Drizzle"]'::jsonb, true, 1, false, '[]'::jsonb)
ON CONFLICT ("repo") DO NOTHING;
--> statement-breakpoint

-- Cleared first so the curated set below is exactly what ends up featured; this drops
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
-- language-duplicating tags need no fix here because mergeProjects strips a tag that
-- repeats the live GitHub language at render time.
UPDATE "projects" SET "tags" = '["CLI","Postgres","MySQL"]'::jsonb WHERE "repo" = 'siphon';
