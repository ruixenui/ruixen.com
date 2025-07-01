/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
