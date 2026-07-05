ALTER TABLE "profile" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "availability";--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "hero_tagline" text;
