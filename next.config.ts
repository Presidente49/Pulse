import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["terminal.local"],
  trailingSlash: true,
};

export default nextConfig;
