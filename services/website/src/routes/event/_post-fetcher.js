export default (fetch, slug) =>
  fetch(`event/${slug}.json`)
    .then((r) => r.json())
    .then((post) => {
      return { post };
    });
