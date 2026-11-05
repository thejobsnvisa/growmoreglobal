
const fs = require("node:fs");
const path = require("node:path");
const { cwd } = require("node:process");

const SITE_URL = "https://growmoreglobalvisa.com";

(async () => {
  let vite;

  try {
    // 1. Load JSX data files through Vite
    console.log("Loading blog and news data through Vite...");

    const { createServer } = await import("vite");

    vite = await createServer({
      server: {
        middlewareMode: true
      },
      appType: "custom"
    });

    const blogModule = await vite.ssrLoadModule(
      "/src/Data/blogsData.jsx"
    );

    const newsModule = await vite.ssrLoadModule(
      "/src/Data/newsData.jsx"
    );

    const blogs = blogModule.blogs || [];
    const news = newsModule.news || [];

    if (!Array.isArray(blogs) || !Array.isArray(news)) {
      throw new Error(
        "Blog or news data is not exported as an array."
      );
    }

    console.log(`Loaded ${blogs.length} blogs.`);
    console.log(`Loaded ${news.length} news articles.`);

    // 2. Read Vite generated HTML
    const distDir = path.join(cwd(), "dist");

    const templatePath = path.join(
      distDir,
      "index.html"
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error(
        "dist/index.html not found. Run npm run build first."
      );
    }

    const template = fs.readFileSync(
      templatePath,
      "utf8"
    );

    // 3. Escape HTML values
    function escapeHtml(value = "") {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;");
    }

    // 4. Generate absolute image URL
    function getImageUrl(image) {
      if (!image || typeof image !== "string") {
        return "";
      }

      try {
        return new URL(image, SITE_URL).href;
      } catch {
        return "";
      }
    }

    // 5. Remove existing SEO metadata
    function removeExistingSeoMetadata(html) {
      // Remove existing title
      html = html.replace(
        /<title\b[^>]*>[\s\S]*?<\/title>/gi,
        ""
      );

      // Remove existing canonical
      html = html.replace(
        /<link\b[^>]*rel=["']canonical["'][^>]*>/gi,
        ""
      );

      // Remove existing SEO meta tags
      html = html.replace(/<meta\b[^>]*>/gi, (tag) => {
        const match = tag.match(
          /\b(?:name|property)=["']([^"']+)["']/i
        );

        if (!match) return tag;

        const key = match[1].toLowerCase();

        if (
          key === "description" ||
          key === "robots" ||
          key.startsWith("og:") ||
          key.startsWith("twitter:")
        ) {
          return "";
        }

        return tag;
      });

      return html;
    }

    // 6. Generate individual SEO page
    function createPage({
      route,
      title,
      description,
      image,
      type = "article"
    }) {
      if (!route || !title) {
        console.warn("Skipping page: missing route or title.");
        return;
      }

      const cleanRoute = `/${route.replace(/^\/+|\/+$/g, "")}`;

      const canonicalUrl = `${SITE_URL}${cleanRoute}/`;

      const imageUrl = getImageUrl(image);

      const safeTitle = escapeHtml(title);
      const safeDescription = escapeHtml(description || title);
      const safeCanonical = escapeHtml(canonicalUrl);
      const safeImage = escapeHtml(imageUrl);

      // Create output directory
      const relativeRoute = cleanRoute.replace(/^\/+/, "");

      const pageDir = path.join(
        distDir,
        relativeRoute
      );

      fs.mkdirSync(pageDir, {
        recursive: true
      });

      // Remove default SEO metadata
      let html = removeExistingSeoMetadata(template);

      // Create page-specific SEO metadata
      const meta = `
<title>${safeTitle}</title>

<meta name="description" content="${safeDescription}" />

<link rel="canonical" href="${safeCanonical}" />

<meta property="og:type" content="${escapeHtml(type)}" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:url" content="${safeCanonical}" />

${safeImage ? `
<meta property="og:image" content="${safeImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
` : ""}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDescription}" />

${safeImage ? `
<meta name="twitter:image" content="${safeImage}" />
` : ""}
`;

      // Insert metadata into head
      if (/<\/head>/i.test(html)) {
        html = html.replace(
          /<\/head>/i,
          `${meta}\n</head>`
        );
      } else {
        throw new Error("HTML template does not contain </head>.");
      }

      // Save HTML
      const outputFile = path.join(
        pageDir,
        "index.html"
      );

      fs.writeFileSync(
        outputFile,
        html,
        "utf8"
      );

      console.log("Generated:", cleanRoute);
      console.log("Title:", title);
      console.log("Canonical:", canonicalUrl);
    }

    // 7. Generate individual blog pages
    console.log("\nGenerating blog SEO pages...");

    blogs.forEach((blog) => {
      createPage({
        route: `/blogs/${blog.slug}`,
        title: blog.metaTitle || blog.title,
        description:
          blog.metaDescription || blog.title,
        image: blog.image,
        type: "article"
      });
    });

    // 8. Generate individual news pages
    console.log("\nGenerating news SEO pages...");

    news.forEach((item) => {
      createPage({
        route: `/news/${item.slug}`,
        title: item.metaTitle || item.title,
        description:
          item.metaDescription || item.title,
        image: item.image,
        type: "article"
      });
    });

    console.log("\nSEO pages generated successfully!");

  } catch (error) {
    console.error("\nSEO page generation failed:");
    console.error(error);

    process.exitCode = 1;

  } finally {
    if (vite) {
      await vite.close();
    }
  }
})();
