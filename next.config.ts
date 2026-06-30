import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/source",
        destination: "https://github.com/semi-constructor/pegasus",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
