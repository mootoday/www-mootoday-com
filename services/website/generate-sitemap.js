const fs = require("fs");

const readDirRecursively = (dir, files = []) => {
  const currentDirFiles = fs.readdirSync(dir, { withFileTypes: true });
  currentDirFiles.forEach((dirent) => {
    const fullPath = dir + "/" + dirent.name;
    if (dirent.isDirectory()) {
      files = readDirRecursively(fullPath, files);
    } else {
      if (fullPath.endsWith("/index.html")) {
        files.push(fullPath);
      }
    }
  });

  return files;
};

const EXPORT_DIR = "./__sapper__/export";
const generateUrls = () =>
  readDirRecursively(EXPORT_DIR)
    .map((path) => path.substring(EXPORT_DIR.length))
    .map((path) => path.substring(0, path.length - "/index.html".length))
    .map((path) => `https://www.mikenikles.com${path}`);

const generateSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${generateUrls()
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
    </url>`
    )
    .join("")}
  </urlset> 
`;

fs.writeFileSync(`${EXPORT_DIR}/sitemap.xml`, generateSitemap());
