import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out (required for GitHub Pages).
  output: "export",

  // GitHub Pages has no image-optimization server.
  images: { unoptimized: true },

  // Emit /about/index.html instead of /about.html so paths resolve
  // without server-side rewrites.
  trailingSlash: true,
};

export default nextConfig;
