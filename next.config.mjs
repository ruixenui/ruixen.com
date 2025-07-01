/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export

  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
