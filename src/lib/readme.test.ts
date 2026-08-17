import { describe, it, expect } from "vitest";
import { toExcerpt } from "./readme";

describe("toExcerpt", () => {
  it("keeps the first real sentence of prose", () => {
    expect(toExcerpt("# my-package\n\nA tiny thing that does one job well.")).toBe(
      "my-package A tiny thing that does one job well.",
    );
  });

  it("drops a badge wall, which is what actually opens most READMEs", () => {
    const md = `# siphon

[![CI](https://img.shields.io/badge/ci-passing-green)](https://github.com/x/y/actions)
[![npm](https://img.shields.io/npm/v/siphon)](https://npmjs.com/siphon)
![logo](./assets/logo.svg)

Sync any database, anywhere.`;
    expect(toExcerpt(md)).toBe("siphon Sync any database, anywhere.");
  });

  it("drops centred HTML logo blocks", () => {
    const md = `<p align="center"><img src="logo.svg" width="120" /></p>
<h1 align="center">thing</h1>

Does the thing.`;
    expect(toExcerpt(md)).toBe("thing Does the thing.");
  });

  it("drops fenced code but keeps the prose around it", () => {
    const md = "Install it.\n\n```bash\nnpm i thing\n```\n\nThen use it.";
    expect(toExcerpt(md)).toBe("Install it. Then use it.");
  });

  it("strips frontmatter only when it opens the document", () => {
    expect(toExcerpt("---\ntitle: x\n---\nBody here.")).toBe("Body here.");
    // A rule mid-document is not frontmatter, so the text after it must survive.
    expect(toExcerpt("Intro.\n\n---\n\nMore text.")).toBe("Intro. More text.");
  });

  it("keeps link text and discards the target", () => {
    expect(toExcerpt("See the [docs](https://example.com/docs) for details.")).toBe(
      "See the docs for details.",
    );
  });

  it("truncates on a word boundary and never mid-word", () => {
    const out = toExcerpt(`${"alpha bravo ".repeat(200)}`, 40);
    expect(out.endsWith("...")).toBe(true);
    expect(out.length).toBeLessThanOrEqual(43);
    // The visible part must not end in a partial word.
    expect(out.replace(/\.\.\.$/, "").trim()).toMatch(/(alpha|bravo)$/);
  });

  // Regressions found by running this against the real siphon and
  // flutter_carousel_widget READMEs; every fixture above was prose and missed them.
  it("keeps snake_case identifiers intact instead of eating the underscores", () => {
    expect(toExcerpt("Replaces pg_dump and pg_restore scripts.")).toBe(
      "Replaces pg_dump and pg_restore scripts.",
    );
    expect(toExcerpt("The mysql_common backend.")).toBe("The mysql_common backend.");
  });

  it("resolves backslash-escaped underscores without leaving backslashes", () => {
    expect(toExcerpt("# flutter\\_carousel\\_widget\n\nA carousel.")).toBe(
      "flutter_carousel_widget A carousel.",
    );
  });

  it("still strips emphasis when it wraps whole words", () => {
    expect(toExcerpt("This is **bold** and _italic_ and *starred*.")).toBe(
      "This is bold and italic and starred.",
    );
  });

  it("drops a table of contents, which otherwise eats the whole budget", () => {
    const md = `# siphon

Sync any database, anywhere.

## Table of Contents

- [Why siphon](#why-siphon)
- [Features](#features)
  - [Install](#install)
- [License](#license)

## Why siphon

One CLI, many databases.`;
    const out = toExcerpt(md);
    expect(out).toBe("siphon Sync any database, anywhere. Why siphon One CLI, many databases.");
    expect(out).not.toContain("License");
  });

  it("keeps a prose list item that merely contains a link", () => {
    // Only items that are ENTIRELY a link are navigation; this one is a real point.
    const md = "- Works with [Postgres](https://postgresql.org) out of the box.";
    expect(toExcerpt(md)).toBe("Works with Postgres out of the box.");
  });

  it("decodes HTML entities, which READMEs use freely in prose", () => {
    // Found live in the mcp-vitest and ai-sdk-threads READMEs, and those are showcase slots
    // 1 and 2, so undecoded they were the most prominent text on the page.
    expect(toExcerpt("In-process &middot; both majors at &plusmn;2.3%")).toBe(
      "In-process \u00b7 both majors at \u00b12.3%",
    );
    expect(toExcerpt("A &amp; B &mdash; C")).toBe("A & B - C");
  });

  it("decodes numeric and hex entities", () => {
    expect(toExcerpt("see &#8594; it &#x2713;")).toBe("see \u2192 it \u2713");
  });

  it("leaves an unknown entity alone rather than mangling it", () => {
    expect(toExcerpt("&copyright; stays")).toBe("&copyright; stays");
  });

  it("does not let a decoded entity reconstruct a tag", () => {
    // &lt;script&gt; decodes to <script>, which must not survive as markup even though the
    // render sink escapes it anyway.
    expect(toExcerpt("before &lt;script&gt;alert(1)&lt;/script&gt; after")).not.toContain(
      "<script>",
    );
  });

  it("returns short input unchanged and without an ellipsis", () => {
    expect(toExcerpt("Short.")).toBe("Short.");
  });

  it("survives an empty or badge-only README instead of throwing", () => {
    expect(toExcerpt("")).toBe("");
    expect(toExcerpt("![a](b)\n![c](d)\n")).toBe("");
  });
});
