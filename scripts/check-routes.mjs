// Route check against a running server; defaults to port 3000 (`bun run start`).
// Asserts RESPONSE CONTENT, never a status code alone: /admin is a protected 200, which a status
// check reads as working and a naive security check reads as leaking. Both are wrong.
const base = process.env.BASE_URL ?? "http://localhost:3000";

// Without this, a server that is not running fails as an undici stack trace that
// says nothing about what to do.
const originalFetch = globalThis.fetch;
globalThis.fetch = async (...args) => {
  try {
    return await originalFetch(...args);
  } catch {
    console.error(`FAIL: nothing is listening at ${base}`);
    console.error("Start the site first:  bun run start   (or BASE_URL=... bun run check:routes)");
    process.exit(1);
  }
};

let failures = 0;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failures++;
}

// Every PASS line goes through this so it cannot print next to a FAIL from its own
// assertions - a log that says both is worse than one that says nothing, because a
// reader trusts the reassuring line.
async function group(passMessage, fn) {
  const before = failures;
  const result = await fn();
  if (failures === before) console.log(`PASS: ${passMessage}`);
  return result;
}

/** Fetch a path and return { res, body }, failing the run on a non-200. */
async function get(path, init) {
  const res = await fetch(`${base}${path}`, { redirect: "manual", ...init });
  const body = await res.text();
  if (res.status !== 200) fail(`${path} returned ${res.status}, expected 200`);
  return { res, body };
}

/** Assert a path serves 200 and its body contains every needle. */
async function expectContent(path, needles) {
  const { body } = await get(path);
  for (const needle of needles) {
    if (!body.includes(needle)) fail(`${path} is missing ${JSON.stringify(needle)}`);
  }
  return body;
}

// Anchored on SITE, never on section copy: every section sits behind a sectionVisibility
// toggle, so asserting on "Projects" would fail CI when someone legitimately hides it.
const home = await group("homepage serves its DB-independent identity copy", () =>
  expectContent("/", [
    "Nikhil Rajput",
    "<title>Nikhil Rajput - Software Engineer &amp; AI Lead</title>",
  ]),
);

// Discovered by reference, not by path - see the header note about static/chunks.
await group("stylesheets serve with content", async () => {
  const sheets = [...home.matchAll(/href="(\/_next\/[^"]+\.css)"/g)].map((m) => m[1]);
  if (sheets.length === 0) {
    fail("homepage references no stylesheet");
    return;
  }
  for (const sheet of sheets) {
    const res = await fetch(`${base}${sheet}`, { redirect: "manual" });
    const css = res.ok ? await res.text() : "";
    if (!res.ok || css.length === 0) {
      fail(`stylesheet ${sheet} returned ${res.status} with ${css.length} bytes`);
    }
  }
});

await group("login and testimonial-submission pages render", async () => {
  await expectContent("/login", ["Nikhil Rajput"]);
  await expectContent("/testimonials/new", ["Nikhil Rajput"]);
});

await group("robots, sitemap, manifest and llms routes serve valid content", async () => {
  // robots must keep disallowing /admin and still advertise the sitemap; a
  // generator refactor that drops either is invisible to a status check.
  await expectContent("/robots.txt", ["Disallow: /admin", "Sitemap:", "User-Agent: *"]);
  await expectContent("/sitemap.xml", ["<urlset", "<loc>"]);

  // Parsed rather than substring-matched: a manifest that serves 200 as broken JSON
  // is exactly the failure a PWA install surfaces and nothing else does.
  const { body } = await get("/manifest.webmanifest");
  try {
    const manifest = JSON.parse(body);
    if (!manifest.name) fail("manifest has no name");
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
      fail("manifest declares no icons");
    }
  } catch {
    fail("manifest is not valid JSON");
  }

  // llms-full must actually be the fuller document; if a refactor makes them
  // identical, the whole point of shipping two files is gone.
  const llms = await expectContent("/llms.txt", ["# Nikhil Rajput"]);
  const llmsFull = await expectContent("/llms-full.txt", ["# Nikhil Rajput"]);
  if (llmsFull.length <= llms.length) {
    fail(`llms-full.txt (${llmsFull.length}B) is not longer than llms.txt (${llms.length}B)`);
  }
});

// Content-type plus a size floor: for generated routes, a 200 serving a zero-byte or
// HTML-error body is the realistic regression. /apple-icon.png keeps its extension - a bare
// /apple-icon is a 404.
await group("icons and opengraph image serve real bytes of the right type", async () => {
  for (const [path, type, minBytes] of [
    ["/opengraph-image", "image/png", 10_000],
    ["/icon.svg", "image/svg+xml", 200],
    ["/apple-icon.png", "image/png", 1_000],
  ]) {
    const res = await fetch(`${base}${path}`, { redirect: "manual" });
    const bytes = res.ok ? (await res.arrayBuffer()).byteLength : 0;
    const contentType = res.headers.get("content-type") ?? "";
    if (res.status !== 200) fail(`${path} returned ${res.status}`);
    else if (!contentType.startsWith(type)) fail(`${path} served ${contentType}, expected ${type}`);
    else if (bytes < minBytes) fail(`${path} served only ${bytes}B, expected >= ${minBytes}B`);
  }
});

// Proven by the redirect directive being present AND no curated data in the payload. Static
// shell labels stream before the redirect fires and are not a leak.
await group("/admin redirects anonymous requests and leaks no curated data", async () => {
  const { body } = await get("/admin");
  if (!body.includes("NEXT_REDIRECT") || !body.includes("/login")) {
    fail("/admin did not emit a redirect to /login - the admin auth gate is broken");
  }
  // Curation data only reachable behind the gate. If any of it renders for an
  // unauthenticated request, the gate is leaking regardless of the status code.
  for (const leak of ["custom_blurb", "customBlurb", "github_cache", "AUTH_SECRET"]) {
    if (body.includes(leak)) fail(`/admin leaked ${JSON.stringify(leak)} to an anonymous request`);
  }
});

// Vercel serves this only in production, so a local 404 is expected; only a wrong redirect
// is actionable.
{
  const res = await fetch(`${base}/_vercel/insights/script.js`, { redirect: "manual" });
  const location = res.headers.get("location") ?? "";
  if (location && !location.includes("/_vercel")) {
    fail(`analytics script redirected to ${location}, so Web Analytics would collect nothing`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("PASS: every route serves the content it should");
