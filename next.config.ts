import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const withMDX = createMDX({
  extension: /\.mdx$/,
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "lucide-react"],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default withMDX(nextConfig);
