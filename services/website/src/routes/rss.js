import fs from "fs";
import frontMatter from "front-matter";
import { formatRFC7231 } from "date-fns";

const BLOG_POSTS_BASE_DIR = "./src/routes/blog";

const escapeHtmlEntities = (raw) =>
  raw.replace(
    /[&<>]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "",
        ">": "",
      }[tag])
  );

const generateItem = (dirent) => {
  const postContent = fs.readFileSync(
    `${BLOG_POSTS_BASE_DIR}/${dirent.name}/index.svx`,
    {
      encoding: "utf-8",
    }
  );
  const postFrontMatter = frontMatter(postContent);

  return {
    title: escapeHtmlEntities(postFrontMatter.attributes.title),
    description: escapeHtmlEntities(postFrontMatter.attributes.summary),
    link: `http://www.mikenikles.com/blog/${postFrontMatter.attributes.slug}`,
    guid: `http://www.mikenikles.com/blog/${postFrontMatter.attributes.slug}`,
    pubDate: formatRFC7231(postFrontMatter.attributes.createdAt),
    timestamp: postFrontMatter.attributes.createdAt.getTime(), // Required to sort the array
  };
};

const items = fs
  .readdirSync(BLOG_POSTS_BASE_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map(generateItem)
  .sort((a, b) => b.timestamp - a.timestamp);

export const get = (req, res, next) => {
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.end(`<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
      <title>${escapeHtmlEntities(
        "Mike's Personal Website - Software Architecture & More"
      )}</title>
      <description>${escapeHtmlEntities(
        "Software Architect 👷. Productivity ⏱️ & Team Morale 😊. Javascript, Typescript, Cloud Native ☁️. Author 📚 and Educator 🧑‍🏫."
      )}</description>
      <link>http://www.mikenikles.com</link>
      <pubDate>${items[0].pubDate}</pubDate>
      ${items
        .map(({ title, description, link, guid, pubDate }) => ({
          title,
          description,
          link,
          guid,
          pubDate,
        }))
        .map(
          (item) => `<item>${Object.entries(item)
            .map(
              ([key, value]) => `
        <${key}>${value}</${key}>`
            )
            .join("")}
      </item>
      `
        )
        .join("")}
      </channel>
    </rss>`);
};
