import Script from "next/script";

/**
 * `lazyOnload` so the ~45KB gtag bundle runs after the window load event and never competes
 * with hydration. A pageview a few hundred ms later costs nothing; the vitals win is real.
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
