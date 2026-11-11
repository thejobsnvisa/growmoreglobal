
import { SitemapStream, streamToPromise } from "sitemap";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import process from "node:process";
import { createServer } from "vite";

async function generateSitemap() {
  let vite;

  try {
    // Initialize Vite to handle image imports in data files
    vite = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.js"),
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });

    // Import news and blogs using Vite SSR loader
    const newsModule = await vite.ssrLoadModule(
      "/src/data/newsData.js"
    );

    const blogsModule = await vite.ssrLoadModule(
      "/src/data/blogsData.js"
    );

    const news =
      newsModule.news ??
      newsModule.default?.news ??
      newsModule.default ??
      [];

    const blogs =
      blogsModule.blogs ??
      blogsModule.default?.blogs ??
      blogsModule.default ??
      [];

    // Validate data
    if (!Array.isArray(news) || !Array.isArray(blogs)) {
      throw new Error("News or blogs data is not an array.");
    }

    // Initialize sitemap
    const sitemap = new SitemapStream({
      hostname: "https://growmoreglobalvisa.com",
    });

    /* Static Pages */
    const staticPages = [
      "/",
      "/about-us/",
      "/services/work-visa/",
      "/services/migration-visa/",
      "/services/dependent-visa/",
      "/services/visitor-visa/",
      "/services/student-visa/",
      "/latest-update/videos/",
      "/latest-update/news/",
      "/latest-update/blogs/",
      "/english-test/",
      "/english-test/ielts/",
      "/english-test/pte/",
      "/english-test/toefl/",
      "/english-test/duolingo/",
      "/english-test/cambridge-c1-advanced/",
      "/english-test/languagecert-academic/",
      "/contact-us/",
      "/brochures/",
      "/migration-assessment/points-calculator-australia/",
      "/services/student-visa/australia/",
      "/services/student-visa/dubai/",
      "/services/student-visa/france/",
      "/services/student-visa/germany/",
      "/services/student-visa/singapore/",
      "/services/student-visa/georgia/",
      "/services/student-visa/russia/",
      "/services/student-visa/new-zealand/",
      "/services/student-visa/canada/",
      "/services/student-visa/usa/",
      "/services/student-visa/united-kingdom/",
      "/services/student-visa/europe/",
      "/migration-assessment/points-calculator-canada/",
      "/terms-services/",
      "/privacy-policy/",
      "/cancellation-and-refund-policy/",
      "/aritificial-intelligence-use-policy/",
    ];

    /* Add Static Pages */
    staticPages.forEach((url) => {
      sitemap.write({
        url,
        changefreq: "daily",
        priority: 0.1,
      });
    });

    /* Dynamic News Pages */
    news.forEach((article) => {
      if (!article.slug) return;

      sitemap.write({
        url: `/news/${article.slug}/`,
        changefreq: "daily",
        priority: 0.1,
      });
    });

    /* Dynamic Blog Pages */
    blogs.forEach((blog) => {
      if (!blog.slug) return;

      sitemap.write({
        url: `/blogs/${blog.slug}/`,
        changefreq: "daily",
        priority: 0.1,
      });
    });

    // Finish sitemap stream
    sitemap.end();

    // Generate sitemap XML
    const data = await streamToPromise(sitemap);
    const sitemapXml = data.toString();

    // Save sitemap in public folder
    const publicDir = path.resolve(process.cwd(), "public");

    mkdirSync(publicDir, {
      recursive: true,
    });

    writeFileSync(
      path.join(publicDir, "sitemap.xml"),
      sitemapXml,
      "utf8"
    );

    // Save sitemap in dist folder for deployment
    const distDir = path.resolve(process.cwd(), "dist");

    mkdirSync(distDir, {
      recursive: true,
    });

    writeFileSync(
      path.join(distDir, "sitemap.xml"),
      sitemapXml,
      "utf8"
    );

    // Calculate total URLs
    const totalUrls =
      staticPages.length + news.length + blogs.length;

    console.log("-----------------------------------");
    console.log("✅ sitemap.xml generated successfully!");
    console.log("Static pages:", staticPages.length);
    console.log("News pages:", news.length);
    console.log("Blog pages:", blogs.length);
    console.log("Total URLs:", totalUrls);
    console.log("Public location: public/sitemap.xml");
    console.log("Build location: dist/sitemap.xml");
    console.log("-----------------------------------");

  } catch (error) {
    console.error("❌ Sitemap generation failed:", error);
    process.exitCode = 1;

  } finally {
    // Close Vite server
    if (vite) {
      await vite.close();
    }
  }
}

generateSitemap();
