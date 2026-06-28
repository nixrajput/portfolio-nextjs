import Script from "next/script";

/**
 * Google Analytics, loaded with `lazyOnload` so gtag.js is fetched and executed
 * only AFTER the window `load` event — i.e. after LCP and time-to-interactive.
 * The ~45KB gtag bundle never competes with hydration or first paint, so it has
 * no effect on LCP/CLS/TBT. A pageview that fires a few hundred ms later is
 * invisible to analytics accuracy but meaningfully better for Core Web Vitals.
 */
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GTAG_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
          `}
      </Script>
    </>
  );
}
