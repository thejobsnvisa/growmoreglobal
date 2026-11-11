const fs = require("fs");
const path = require("path");

(async () => {
  try {
    const routes = [
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

    // Remove duplicates & sort
    const uniqueRoutes = [...new Set(routes)].sort();

    const packageJsonPath = path.join(process.cwd(), "package.json");

    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf8")
    );

    packageJson.reactSnap = {
      ...(packageJson.reactSnap || {}),
      include: uniqueRoutes,
    };

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    );

    console.log(`✅ Generated ${uniqueRoutes.length} routes for react-snap.`);
  } catch (err) {
    console.error("❌ Failed to generate routes:", err);
    process.exit(1);
  }
})();