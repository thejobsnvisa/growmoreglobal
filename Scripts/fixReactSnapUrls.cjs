const fs = require("fs");
const path = require("path");

const distDir = path.join(process.cwd(), "dist");

function processHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processHtmlFiles(fullPath);
      continue;
    }

    if (!entry.isFile() || entry.name !== "index.html") {
      continue;
    }

    let html = fs.readFileSync(fullPath, "utf8");

    const original = html;

    // Remove React-Snap's temporary localhost server URL
    html = html.replace(
      /https?:\/\/localhost:\d+(\/assets\/)/g,
      "$1"
    );

    if (html !== original) {
      fs.writeFileSync(fullPath, html, "utf8");
      console.log(`Fixed React-Snap URLs: ${path.relative(distDir, fullPath)}`);
    }
  }
}

processHtmlFiles(distDir);

console.log("React-Snap URL cleanup completed.");