const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/proxy/:path*',
          destination: '/:path*',
        },
      ];
    },
  };
  
  module.exports = nextConfig;