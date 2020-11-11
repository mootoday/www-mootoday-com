<script>
  import BlogPostWrapper from "./wrapper.svelte";

  export let title;
  export let slug;
  export let summary;
  export let createdAt;
  export let tags;
  export let layout;

  const post = {
    metadata: {
      title,
      slug,
      summary,
      createdAt,
      tags,
      layout,
    }
  };
</script>

<BlogPostWrapper {post}>
  <slot />
</BlogPostWrapper>
