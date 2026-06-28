CREATE TABLE "github_cache" (
	"repo" varchar(255) PRIMARY KEY NOT NULL,
	"stars" integer DEFAULT 0 NOT NULL,
	"forks" integer DEFAULT 0 NOT NULL,
	"language" text,
	"description" text,
	"homepage" text,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL
);
