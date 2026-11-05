/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-BioCrab-Design", value: "cinematic-biotech-v5" }],
      },
    ];
  },
};
module.exports = nextConfig;
