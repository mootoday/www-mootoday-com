export default (fetch, slug) =>
  fetch(`blog/${slug}.json`)
    .then((r) => r.json())
    .then((post) => {
      return { post };
    });
