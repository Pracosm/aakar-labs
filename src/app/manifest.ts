import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Aakar",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#050509",
    theme_color: "#050509",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
