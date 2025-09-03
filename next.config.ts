import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   formats: ["image/avif", "image/webp"],
  //   deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  //   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "example.com",
  //     },
  //   ],
  // },
  // experimental: {
  //   reactCompiler: true, // تحسين تلقائي للكود
  // },
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async redirects() {
//     return [
//       {
//         source: "/",          // الصفحة الرئيسية
//         destination: "/tasks", // الوجهة
//         permanent: true,      // true = redirect دائم (308)
//       },
//     ];
//   },
// };

// export default nextConfig;
