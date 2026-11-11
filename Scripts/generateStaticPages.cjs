
const fs = require("fs");
const path = require("path");

(async () => {
  let vite;

  try {
    // Import Vite
    const { createServer } = await import("vite");

    // Create Vite server to handle React, JSX and image imports
    vite = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.js"),
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });

    // Import blog and news data using Vite SSR loader
    const blogsModule = await vite.ssrLoadModule(
      "/src/data/blogsData.js"
    );

    const newsModule = await vite.ssrLoadModule(
      "/src/data/newsData.js"
    );

    // Support named and default exports
    const blogs =
      blogsModule.blogs ??
      blogsModule.default?.blogs ??
      blogsModule.default ??
      [];

    const news =
      newsModule.news ??
      newsModule.default?.news ??
      newsModule.default ??
      [];

    const distDir = path.join(process.cwd(), "dist");

    if (!fs.existsSync(path.join(distDir, "index.html"))) {
      throw new Error("dist/index.html not found. Run Vite build first.");
    }

    // Your website URL
    const SITE_URL = "https://growmoreglobalvisa.com";

    // Read the base Vite HTML
    const template = fs.readFileSync(
      path.join(distDir, "index.html"),
      "utf8"
    );

    // Escape HTML attributes
    function escapeHtml(value = "") {
      return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);
    }

    function createPage({
      route,
      title,
      description,
      image,
    }) {
      // Remove duplicate trailing slashes
      const cleanRoute = route.replace(/\/+$/, "");

      const pageDir = path.join(
        distDir,
        cleanRoute.replace(/^\/+/, "")
      );

      fs.mkdirSync(pageDir, {
        recursive: true,
      });

      // Generate image URL
      let imageUrl = "";

      if (image) {
        imageUrl = image.startsWith("http")
          ? image
          : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
      }

      const canonicalUrl = `${SITE_URL}${cleanRoute}/`;

      let html = template;

      // ---------- TITLE ----------
      html = html.replace(
        /<title>.*?<\/title>/is,
        `<title>${escapeHtml(title)}</title>`
      );

      // Add title if missing
      if (!/<title>/i.test(html)) {
        html = html.replace(
          "</head>",
          `<title>${escapeHtml(title)}</title></head>`
        );
      }

      // ---------- META TAGS ----------
      const meta = `
<meta name="description" content="${escapeHtml(description)}" />

<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
${imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />` : ""}
<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
${imageUrl ? `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />` : ""}
`;

      // Insert metadata into head
      html = html.replace(
        "</head>",
        `${meta}\n</head>`
      );

      // Save generated HTML
      fs.writeFileSync(
        path.join(pageDir, "index.html"),
        html,
        "utf8"
      );

      console.log("Generated:", cleanRoute);
    }

    // ---------- INDIVIDUAL BLOG PAGES ----------
    if (!Array.isArray(blogs)) {
      throw new Error("Blogs data must be an array.");
    }

    blogs.forEach((blog) => {
      if (!blog.slug) return;

      createPage({
        route: `/blogs/${blog.slug}`,
        title: blog.metaTitle || blog.title,
        description:
          blog.metaDescription || blog.title || "",
        image: blog.image,
      });
    });

    // ---------- INDIVIDUAL NEWS PAGES ----------
    if (!Array.isArray(news)) {
      throw new Error("News data must be an array.");
    }

    news.forEach((item) => {
      if (!item.slug) return;

      createPage({
        route: `/news/${item.slug}`,
        title: item.metaTitle || item.title,
        description:
          item.metaDescription || item.title || "",
        image: item.image,
      });
    });

    console.log("-----------------------------------");
    console.log("Static pages generated successfully!");
    console.log("Total blogs:", blogs.length);
    console.log("Total news:", news.length);
    console.log("-----------------------------------");

  } catch (error) {
    console.error("Static page generation failed:", error);
    process.exitCode = 1;
  } finally {
    if (vite) {
      await vite.close();
    }
  }
})();
