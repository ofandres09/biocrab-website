/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-BioCrab-Design", value: "immersive-biomaterials-v9" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
