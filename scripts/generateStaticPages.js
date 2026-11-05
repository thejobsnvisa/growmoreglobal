import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

(async () => {
  // Import blog and news data
  const { blogs } = await import("../src/Data/blogsData.js");
  const { news } = await import("../src/Data/newsData.js");

  const distDir = path.join(cwd(), "dist");

  // Read the base Vite HTML
  const template = fs.readFileSync(
    path.join(distDir, "index.html"),
    "utf8"
  );

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


    const imageUrl = image.startsWith("http")
      ? image
      : `https://growmoreglobal.com${image}`;

    let html = template;

    // ---------- TITLE ----------
    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${title}</title>`
    );

    // If there isn't a title tag
    if (!html.includes("<title>")) {
      html = html.replace(
        "</head>",
        `<title>${title}</title></head>`
      );
    }

    const meta = `
<meta name="description" content="${description}" />

<link rel="canonical" href="https://growmoreglobal.com${route}/" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://growmoreglobal.com${route}/" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />
`;

    html = html.replace(
      "</head>",
      `${meta}\n</head>`
    );

    fs.writeFileSync(
      path.join(pageDir, "index.html"),
      html
    );

    console.log("Generated:", route);
  }

  // Individual blogs
  blogs.forEach((blog) => {
    createPage({
      route: `/blogs/${blog.slug}`,
      title: blog.metaTitle || blog.title,
      description:
        blog.metaDescription ||
        blog.title,
      image: blog.image,
    });
  });

  // Individual news
  news.forEach((item) => {
    createPage({
      route: `/news/${item.slug}`,
      title:
        item.metaTitle || item.title,
      description:
        item.metaDescription ||
        item.title,
      image: item.image,
    });
  });

  console.log(
    "✅ Static pages generated successfully."
  );
})();