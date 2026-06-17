import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        // pathname: "/u/**", // Optional, but limits access specifically to user avatar paths for extra security
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
