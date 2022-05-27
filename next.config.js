/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.infura.io'],
  },
  env: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    INFURA_ID: process.env.INFURA_ID
  }
}

module.exports = nextConfig
