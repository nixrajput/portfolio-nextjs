ALTER TABLE "github_cache" ADD COLUMN "readme_excerpt" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "cover_image" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "screenshots" jsonb DEFAULT '[]'::jsonb NOT NULL;