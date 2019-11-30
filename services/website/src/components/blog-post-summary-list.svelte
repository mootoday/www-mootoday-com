<script>
  import BlogPostSummary from "./blog-post-summary.svelte";

  export let posts;
</script>

<style>
  .wrapper-blog-post-summary-list {
    @apply py-12 px-16 bg-brown-200;
  }
</style>

<div class="wrapper-blog-post-summary-list">

  {#each posts as post}
    <BlogPostSummary {post} />
    <BlogPostSummary {post} />
    <BlogPostSummary {post} />
    <BlogPostSummary {post} />
    <BlogPostSummary {post} />
  {/each}
</div>
