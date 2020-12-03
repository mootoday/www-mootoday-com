const timelineEntries = [
  {
    timestamp: 1606937475381,
    label: "Blog Posts",
    milestone: "Introduced the timeline view",
    link: "/blog/introducing-the-timeline-view",
  },
  {
    timestamp: 1606923412654,
    label: "Twitter",
    milestone: "700 Followers 🎉",
    cta: "Check out my tweets",
    link: "/blog/introducing-the-timeline-view",
  },
];

export const get = (_req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(timelineEntries));
};
