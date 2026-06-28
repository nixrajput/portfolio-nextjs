import { SITE } from "./site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}/opengraph-image`,
        jobTitle: "Software Development Engineer & AI Lead",
        description: SITE.description,
        sameAs: SITE.sameAs,
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
      }}
    />
  );
}
