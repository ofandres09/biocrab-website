/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-BioCrab-Design", value: "biomaterial-laboratory-v8" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
