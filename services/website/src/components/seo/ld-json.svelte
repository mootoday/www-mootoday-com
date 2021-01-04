<script>
  export let post;

  // Blog posts prior to PR 259 had their cover.jpg file stored in the `static` directory of this git repo.
  const imageUrl = coverPhotoId ? `https://source.unsplash.com/${post.metadata.coverPhotoId}/1200x1000` : `https://www.mikenikles.com/blog-posts/${post.metadata.slug}/cover-preview-lead.jpg`;
</script>

{@html `
<script type="application/ld+json">
  {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://google.com/article"
      },
      "headline": "${post.metadata.title}",
      "keywords": "${post.metadata.tags.join(",")}",
      "image": [
        "${imageUrl}"
       ],
      "datePublished": "${post.metadata.createdAt}",
      "dateModified": "${post.metadata.createdAt}",
      "author": {
        "@type": "Person",
        "name": "Mike Nikles"
      }
    }
</script>
`}
