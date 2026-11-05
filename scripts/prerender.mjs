
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

let server;
let browser;

try {
  console.log("Starting Vite preview server...");

  server = await preview({
    preview: {
      host,
      port,
      strictPort: true
    }
  });

  browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  });

  const page = await browser.newPage();

  page.on("pageerror", (error) => {
    console.error("Browser page error:", error.message);
  });

  for (const route of routes) {
    console.log(`Prerendering: ${route}`);

    try {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000
      });

      if (!response || !response.ok()) {
        throw new Error(
          `Page returned status: ${response?.status() ?? "No response"}`
        );
      }

      await page.waitForSelector("#root", {
        timeout: 30000
      });

      await page.waitForFunction(() => {
        const root = document.querySelector("#root");
        return root && root.innerHTML.trim().length > 0;
      }, {
        timeout: 30000
      });

      // Allow client-side rendering and Helmet metadata to settle.
      await new Promise(resolve => setTimeout(resolve, 1500));

      const html = await page.content();

      const outputDirectory =
        route === "/"
          ? "dist"
          : path.join("dist", route.replace(/^\/|\/$/g, ""));

      await fs.mkdir(outputDirectory, {
        recursive: true
      });

      await fs.writeFile(
        path.join(outputDirectory, "index.html"),
        html,
        "utf8"
      );

      console.log(`Successfully prerendered: ${route}`);
    } catch (error) {
      console.error(`Failed route: ${route}`);
      console.error(error.message);
      throw error;
    }
  }

  console.log("All routes prerendered successfully!");
} catch (error) {
  console.error("Prerendering failed:", error);
  process.exitCode = 1;
} finally {
  if (browser) {
    await browser.close();
  }

  if (server?.httpServer) {
    await new Promise(resolve => {
      server.httpServer.close(resolve);
    });
  }
}
