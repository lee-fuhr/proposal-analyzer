import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable experimental features for app router
  experimental: {
    // Optimize for Vercel deployment
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Enable strict mode for React
  reactStrictMode: true,

  // Environment variables
  env: {
    // These would be set in Vercel dashboard
    // STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    // STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    // ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    // KV_REST_API_URL: process.env.KV_REST_API_URL,
    // KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  },
}

export default nextConfig
