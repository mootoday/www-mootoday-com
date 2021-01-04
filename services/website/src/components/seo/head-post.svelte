<script>
  import SeoHead from "./head.svelte";
  import LdJson from "./ld-json.svelte";

  export let post;

  const { createdAt, slug, coverPhotoId, summary: description, tags, title } = post.metadata;

  // Blog posts prior to PR 259 had their cover.jpg file stored in the `static` directory of this git repo.
  const image = coverPhotoId ? `https://source.unsplash.com/${coverPhotoId}/1200x1000` : `https://www.mikenikles.com/blog-posts/${slug}/cover-preview-lead.jpg`;

  const keywords = tags.join(', ');
</script>

<SeoHead
  {description}
  {image}
  {keywords}
  {title}
  imageAlt={`Cover picture for a blog post titled ${title}`}>
  <LdJson {post} />
</SeoHead>
