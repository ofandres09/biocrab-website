/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-BioCrab-Design", value: "pinterest-integrated-v4" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
