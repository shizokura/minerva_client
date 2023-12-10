/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['leophysio.s3.us-east-2.amazonaws.com']
  }
}

module.exports = nextConfig
