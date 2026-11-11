import { SitemapStream, streamToPromise } from "sitemap";
import { writeFileSync } from "fs";
import { news } from "../src/data/newsData.jsx";
import { blogs } from "../src/data/blogsData.jsx";

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
  sitemap.write({
    url: `/news/${article.slug}/`,
    changefreq: "daily",
    priority: 0.1,
  });
});

/* Dynamic Blog Pages */
blogs.forEach((blog) => {
  sitemap.write({
    url: `/blogs/${blog.slug}/`,
    changefreq: "daily",
    priority: 0.1,
  });
});

sitemap.end();

/* Generate sitemap.xml */
streamToPromise(sitemap)
  .then((data) => {
    writeFileSync("./public/sitemap.xml", data.toString());

    console.log("✅ sitemap.xml generated successfully");
  })
  .catch((err) => {
    console.error("❌ Sitemap generation failed:", err);
  });
