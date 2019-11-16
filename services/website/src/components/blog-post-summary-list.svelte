<script>
  import BlogPostSummary from './blog-post-summary.svelte';

	export let posts;
</script>

<style>
  .wrapper {
    @apply p-8 bg-orange-200;
  }

  h2 {
    @apply text-3xl text-gray-700;
  }

</style>

<div class="wrapper">
  <h2>Software Development</h2>

  {#each posts as post}
    <BlogPostSummary {post}/>
  {/each}
</div>