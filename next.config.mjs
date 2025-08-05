/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // REVERT THIS LINE BACK to disable PWA in dev mode and fix the refresh loop
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {};

export default withPWA(nextConfig);