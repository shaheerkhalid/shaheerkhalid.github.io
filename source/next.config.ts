import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // Disable image optimization (not available in static export)
  images: {
    unoptimized: true,
  },

  // For GitHub Pages subpath: username.github.io/repo-name
  basePath: isGitHubPages ? "/uae-classifieds" : "",
  assetPrefix: isGitHubPages ? "/uae-classifieds" : "",
};

export default nextConfig;
