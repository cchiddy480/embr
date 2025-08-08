/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isExport = process.env.NEXT_EXPORT === 'true'

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

// Only enable static export options explicitly when building for export
if (isProd && isExport) {
  nextConfig.output = 'export'
  nextConfig.trailingSlash = true
  nextConfig.skipTrailingSlashRedirect = true
  nextConfig.distDir = 'out'
}

module.exports = nextConfig