import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/library/:promptId(ielts-.*|toefl-.*|acad-.*)',
        destination: '/library/exam/:promptId',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
