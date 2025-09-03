// // app/sitemap.ts
// import type { MetadataRoute } from "next";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const posts = await getPosts();

//   const postUrls = posts.map((post) => ({
//     url: `https://example.com/posts/${post.slug}`,
//     lastModified: post.updatedAt,
//     changeFrequency: "weekly" as const,
//     priority: 0.8,
//   }));

//   return [
//     {
//       url: "https://example.com",
//       lastModified: new Date(),
//       changeFrequency: "yearly",
//       priority: 1,
//     },
//     ...postUrls,
//   ];
// }
