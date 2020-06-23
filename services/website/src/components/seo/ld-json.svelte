<script>
  import { stores } from '@sapper/app';
  
  export let post;

  const { page } = stores();
  const imageUrl = `https://${$page.host}/blog-posts/${
    post.metadata.createdAt.split("T")[0]
  }-${post.metadata.slug}/cover-preview-lead.jpg`;
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
