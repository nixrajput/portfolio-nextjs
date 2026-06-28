CREATE TABLE "seed_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"checksum" text NOT NULL,
	"applied_at" timestamp with time zone DEFAULT now() NOT NULL
);
