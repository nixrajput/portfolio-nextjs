// Payload and TTFB budgets per route, measured against `bun run start`. Not Lighthouse: no
// browser, so it is stable enough to gate a PR (Lighthouse CI covers real LCP/CLS separately).
// Budgets come from measuring a production build - re-measure deliberately, do not nudge.
const base = process.env.BASE_URL ?? "http://localhost:3000";

async function get(url) {
  try {
    return await fetch(url);
  } catch {
    console.error(`FAIL: nothing is listening at ${base}`);
    console.error("Start the site first:  bun run start   (or BASE_URL=... bun run check:vitals)");
    process.exit(1);
  }
}

// Measured 2026-08-17: all three routes sit at ~1425KB because the ROOT LAYOUT dominates
// (ThemeProvider, AmbientBackground, CustomCursor and three analytics scripts load everywhere).
// A ceiling to ratchet DOWN, not an endorsement of 1.4MB.
const BUDGETS = [
  { path: "/", js: 1500, ttfb: 800 },
  { path: "/testimonials/new", js: 1500, ttfb: 800 },
  { path: "/login", js: 1500, ttfb: 800 },
];

// Both a wrong site and a dev server produce believable numbers, and unminified bundles read
// several times heavier - failing the budget for an entirely fictional reason.
const identity = await (await get(`${base}/`)).text();
if (!identity.includes("Nikhil Rajput")) {
  console.error(`FAIL: ${base} is serving a different site`);
  console.error("Point BASE_URL at this site's `bun run start`, not another server on that port.");
  process.exit(1);
}
if (identity.includes("next-devtools")) {
  console.error(`FAIL: ${base} is a dev server, so these numbers would be meaningless`);
  console.error("Measure a production build:  bun run build && bun run start");
  process.exit(1);
}

let failed = false;

for (const { path, js: jsBudget, ttfb: ttfbBudget } of BUDGETS) {
  const started = Date.now();
  const res = await get(`${base}${path}`);
  const html = await res.text();
  const ttfb = Date.now() - started;

  if (!res.ok) {
    console.error(`FAIL: ${path} returned ${res.status}`);
    failed = true;
    continue;
  }

  // What a MODERN browser downloads, deduped. noModule is excluded: Next's ~112KB legacy
  // polyfill is never fetched by an ES-modules browser, so counting it would inflate every
  // route equally and describe a visitor who does not exist.
  const assets = new Set();
  for (const [tag] of html.matchAll(/<script\b[^>]*>/g)) {
    if (/\bnoModule\b/i.test(tag)) continue;
    const src = tag.match(/src="(\/_next\/static\/[^"]+\.js)"/);
    if (src) assets.add(src[1]);
  }
  for (const [, href] of html.matchAll(/<link\b[^>]+href="(\/_next\/static\/[^"]+\.js)"/g)) {
    assets.add(href);
  }
  // Decompressed: undici gunzips, so this is parse cost (what blocks the main thread), not
  // transfer size - roughly 3-4x less over the wire.
  let bytes = 0;
  for (const asset of assets) {
    bytes += (await (await get(`${base}${asset}`)).arrayBuffer()).byteLength;
  }
  const kb = bytes / 1024;

  const over = kb > jsBudget || ttfb > ttfbBudget;
  if (over) failed = true;
  console.log(
    `${over ? "FAIL" : "PASS"}: ${path} js=${kb.toFixed(1)}KB (budget ${jsBudget}) ` +
      `ttfb=${ttfb}ms (budget ${ttfbBudget}) across ${assets.size} chunks`,
  );
}

if (failed) process.exit(1);
console.log("PASS: every route inside its budget");
