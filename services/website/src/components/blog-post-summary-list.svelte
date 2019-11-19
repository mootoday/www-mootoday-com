<script>
  import BlogPostSummary from "./blog-post-summary.svelte";

  export let posts;
</script>

<style>
  .wrapper-blog-post-summary-list {
    @apply py-8 px-10 bg-brown-200;
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
