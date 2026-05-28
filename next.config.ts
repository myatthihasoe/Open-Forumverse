import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
        protocol: "https",
        hostname: "example.com",
        // pathname: "/images/**", // Optional, but limits access to a specific path for extra security
      }
    ],
  },
};

export default nextConfig;
