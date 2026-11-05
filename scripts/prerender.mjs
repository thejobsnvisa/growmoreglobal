
import { preview } from "vite";
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";

const routes = [
  "/",
  "/about-us",
  "/services/work-visa",
  "/services/migration-visa",
  "/services/dependent-visa",
  "/services/visitor-visa",
  "/services/student-visa",
  "/latest-update/videos",
  "/latest-update/news",
  "/latest-update/blogs",
  "/english-test",
  "/english-test/ielts",
  "/english-test/pte",
  "/english-test/toefl",
  "/english-test/duolingo",
  "/english-test/cambridge-c1-advanced",
  "/english-test/languagecert-academic",
  "/contact-us",
  "/brochures",
  "/migration-assessment/points-calculator-australia",
  "/services/student-visa/australia",
  "/services/student-visa/dubai",
  "/services/student-visa/france",
  "/services/student-visa/germany",
  "/services/student-visa/singapore",
  "/services/student-visa/georgia",
  "/services/student-visa/russia",
  "/services/student-visa/new-zealand",
  "/services/student-visa/canada",
  "/services/student-visa/usa",
  "/services/student-visa/united-kingdom",
  "/services/student-visa/europe",
  "/migration-assessment/points-calculator-canada",
  "/terms-services",
  "/privacy-policy",
  "/cancellation-and-refund-policy",
  "/aritificial-intelligence-use-policy"
];

const host = "127.0.0.1";
const port = 4173;
const baseUrl = `http://${host}:${port}`;

const outputRoot = path.resolve("dist");

let server;
let browser;

try {
  // 1. Start Vite preview server
  console.log("Starting Vite preview server...");

  server = await preview({
    preview: {
      host,
      port,
      strictPort: true
    }
  });

  console.log(`Preview server running at ${baseUrl}`);

  // 2. Launch Puppeteer
  console.log("Launching Chrome...");

  browser = await puppeteer.launch({
    headless: true,
    timeout: 120000,
    dumpio: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-extensions"
    ]
  });

  console.log("Chrome launched successfully!");

  const page = await browser.newPage();

  await page.setViewport({
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1
  });

  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(30000);

  // Browser errors
  page.on("pageerror", (error) => {
    console.error("Browser page error:", error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      console.error("Browser console error:", message.text());
    }
  });

  // 3. Prerender every route
  for (const route of routes) {
    console.log(`\nPrerendering: ${route}`);

    try {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle2",
        timeout: 60000
      });

      if (!response || !response.ok()) {
        throw new Error(
          `Page returned status: ${response?.status() ?? "No response"}`
        );
      }

      // Wait for React root
      await page.waitForSelector("#root", {
        timeout: 30000
      });

      // Wait for React content
      await page.waitForFunction(() => {
        const root = document.querySelector("#root");

        return root && root.innerHTML.trim().length > 0;
      }, {
        timeout: 30000
      });

      // Wait until React Helmet has updated the page title
      await page.waitForFunction(() => {
        const title = document.querySelector("head title");

        return title && title.textContent.trim().length > 0;
      }, {
        timeout: 15000
      });

      // Allow all Helmet metadata to settle
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 4. Capture actual metadata from this route
      const metadata = await page.evaluate(() => {
        const getMeta = (selector) => {
          return document.querySelector(selector)?.getAttribute("content") || "";
        };

        return {
          title: document.title,

          description: getMeta('meta[name="description"]'),

          canonical:
            document.querySelector('link[rel="canonical"]')?.href || "",

          robots: getMeta('meta[name="robots"]'),

          ogTitle: getMeta('meta[property="og:title"]'),

          ogDescription: getMeta('meta[property="og:description"]'),

          ogUrl: getMeta('meta[property="og:url"]'),

          ogImage: getMeta('meta[property="og:image"]'),

          ogType: getMeta('meta[property="og:type"]'),

          twitterCard: getMeta('meta[name="twitter:card"]'),

          twitterTitle: getMeta('meta[name="twitter:title"]'),

          twitterDescription: getMeta('meta[name="twitter:description"]'),

          twitterImage: getMeta('meta[name="twitter:image"]')
        };
      });

      console.log("Captured Helmet Metadata:");
      console.log(JSON.stringify(metadata, null, 2));

      // 5. Capture complete rendered HTML
      const html = await page.content();

      // 6. Create route-specific directory
      const relativeRoute = route.replace(/^\/+|\/+$/g, "");

      const outputDirectory = relativeRoute
        ? path.join(outputRoot, relativeRoute)
        : outputRoot;

      await fs.mkdir(outputDirectory, {
        recursive: true
      });

      // 7. Save prerendered HTML
      const outputFile = path.join(outputDirectory, "index.html");

      await fs.writeFile(outputFile, html, "utf8");

      console.log(`Successfully prerendered: ${route}`);
      console.log(`Saved: ${outputFile}`);

    } catch (error) {
      console.error(`Failed route: ${route}`);
      console.error(error);

      throw error;
    }
  }

  console.log("\nAll routes prerendered successfully!");

} catch (error) {
  console.error("\nPrerendering failed:");
  console.error(error);

  process.exitCode = 1;

} finally {
  // Close Chrome
  if (browser) {
    console.log("Closing Chrome...");
    await browser.close().catch(console.error);
  }

  // Stop Vite preview server
  if (server?.httpServer) {
    console.log("Stopping Vite preview server...");

    await new Promise((resolve) => {
      server.httpServer.close(resolve);
    });
  }
}
