import { SITE } from "@/lib/seo/site";
import { FAQS } from "@/lib/seo/faq";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

## Identity

- Name: Nikhil Rajput (nixrajput)
- Role: Software Development Engineer & AI Lead
- Based in: India
- Founder of: NixLab

## Links

${SITE.sameAs.map((u) => `- ${u}`).join("\n")}
- ${SITE.url}

## FAQ

${FAQS.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

See ${SITE.url}/llms-full.txt for the full profile.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
