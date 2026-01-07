import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler
  reactCompiler: true,

  // Static export for GitHub Pages
  output: 'export',

  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },

  // Uncomment and set basePath if deploying to a repo subdirectory
  // For example, if your repo is username.github.io/portfolio
  // basePath: '/portfolio',

  // Trailing slash for better static file compatibility
  trailingSlash: true,
};

export default nextConfig;
