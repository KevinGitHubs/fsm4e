/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE || 'false',
  },
};

module.exports = nextConfig;