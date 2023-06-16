/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['chart.googleapis.com'],
  },
  async redirects() {
    return [
      {
        source: '/ingressos',
        destination: '/passaportes',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
