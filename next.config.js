/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-BioCrab-Design", value: "molecular-research-v6" }],
      },
    ];
  },
};
module.exports = nextConfig;
