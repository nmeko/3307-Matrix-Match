/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so the game can be hosted for free on GitHub Pages.
  output: "export",
  // On GitHub Pages the site lives under /<repo-name>; empty when running locally.
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
