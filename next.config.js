/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce build time by skipping type checking (run separately)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optimize images
  images: {
    unoptimized: true,
  },

  // Disable Turbopack and configure root
  turbopack: false,
  experimental: {
    turbo: false,
  },
}

module.exports = nextConfig
