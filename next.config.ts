import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.254", "localhost", "127.0.0.1", "*.local"],
  devIndicators: false,
};

export default nextConfig;
