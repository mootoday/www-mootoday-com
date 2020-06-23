<script>
  import { stores } from "@sapper/app";
  import SeoHead from "./head.svelte";

  export let post;

  const { page } = stores();
  const { createdAt, slug, summary: description, tags, title } = post.metadata;
  const image = `https://${$page.host}/blog-posts/${
    createdAt.split("T")[0]
  }-${slug}/cover-preview-lead.jpg`;
  const keywords = tags.join(', ');
</script>

<SeoHead
  {description}
  {image}
  {keywords}
  {title}
  imageAlt={`Cover picture for a blog post titled ${title}`} />
