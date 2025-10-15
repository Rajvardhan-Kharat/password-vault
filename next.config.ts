/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Optional: ignore TS errors too
  },
};

export default nextConfig;
