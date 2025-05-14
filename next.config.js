/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
  output: 'standalone',
  trailingSlash: true,
}

module.exports = nextConfig 