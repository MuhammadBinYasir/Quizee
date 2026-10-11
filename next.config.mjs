/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/signup',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
