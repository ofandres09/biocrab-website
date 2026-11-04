/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-BioCrab-Design", value: "full-frame-v2" }],
      },
    ];
  },
};
module.exports = nextConfig;
