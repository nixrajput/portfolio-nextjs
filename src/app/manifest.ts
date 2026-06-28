import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Nikhil",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07070c",
    theme_color: "#07070c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }],
  };
}
