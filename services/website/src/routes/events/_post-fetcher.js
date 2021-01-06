export default (fetch, slug) =>
  fetch(`events/${slug}.json`)
    .then((r) => r.json())
    .then((post) => {
      return { post };
    });
