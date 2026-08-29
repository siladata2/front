/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation for /app route
  async rewrites() {
    return [
      {
        source: '/app',
        destination: 'https://aaaasilamin-0ac06c45a8b6.herokuapp.com/',
      },
      {
        source: '/app/:path*',
        destination: 'https://aaaasilamin-0ac06c45a8b6.herokuapp.com/:path*',
      },
    ];
  },
  // Prevent static generation for /app
  exportPathMap: async function (defaultPathMap) {
    // Remove /app from static generation
    delete defaultPathMap['/app'];
    return defaultPathMap;
  },
};

module.exports = nextConfig;