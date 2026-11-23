import { describe, expect, it } from "vitest";
import { isLocalDatabaseUrl } from "./env";

describe("isLocalDatabaseUrl", () => {
  it.each([
    "postgres://build:build@localhost:5432/portfolio_build",
    "postgresql://u@127.0.0.1/db",
    "postgres://u@[::1]:5432/db",
  ])("accepts %s", (url) => expect(isLocalDatabaseUrl(url)).toBe(true));

  it.each([
    "postgres://u:p@ep-cool-name.us-east-2.aws.neon.tech/db",
    "postgres://u@localhost.example.com/db",
    "not a url",
    "",
    undefined,
  ])("rejects %s", (url) => expect(isLocalDatabaseUrl(url)).toBe(false));
});
