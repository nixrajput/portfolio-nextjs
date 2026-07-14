CREATE TABLE "github_user_cache" (
	"username" varchar(255) PRIMARY KEY NOT NULL,
	"followers" integer DEFAULT 0 NOT NULL,
	"public_repos" integer DEFAULT 0 NOT NULL,
	"total_stars" integer DEFAULT 0 NOT NULL,
	"first_contribution_year" integer,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL
);
