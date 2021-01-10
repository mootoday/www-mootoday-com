import { formatRFC7231 } from "date-fns";
import { posts } from "./timeline/_blog";

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

const generateItem = (postFrontMatter) => ({
  title: escapeHtmlEntities(postFrontMatter.attributes.title),
  description: escapeHtmlEntities(postFrontMatter.attributes.summary),
  link: `http://www.mikenikles.com/blog/${postFrontMatter.attributes.slug}`,
  guid: `http://www.mikenikles.com/blog/${postFrontMatter.attributes.slug}`,
  pubDate: formatRFC7231(postFrontMatter.attributes.createdAt),
});

const sortedItems = posts
  .sort(
    (a, b) =>
      b.attributes.createdAt.getTime() - a.attributes.createdAt.getTime()
  )
  .map(generateItem);

const printItem = (item) => `<item>${Object.entries(item)
  .map(
    ([key, value]) => `
        <${key}>${value}</${key}>`
  )
  .join("")}
      </item>
      `;

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
      <pubDate>${sortedItems[0].pubDate}</pubDate>
      ${sortedItems.map(printItem).join("")}
      </channel>
    </rss>`);
};
