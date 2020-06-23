<script>
  import { stores } from "@sapper/app";
  import SeoHead from "./head.svelte";

  export let post;

  const { page } = stores();
  const { createdAt, slug, summary: description, title } = post.metadata;
  const image = `https://${$page.host}/blog-posts/${
    createdAt.split("T")[0]
  }-${slug}/cover-preview-lead.jpg`;
</script>

<SeoHead
  {description}
  {image}
  {title}
  imageAlt={`Cover picture for a blog post titled ${title}`} />
