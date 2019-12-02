<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      })
      .catch(error => {
        console.log(error);
      });
  }
</script>

<script>
  import FeaturedPosts from "../components/featured-posts.svelte";
  import BlogPostSummaryList from "../components/blog-post-summary-list.svelte";
  import Bio from "../components/bio.svelte";

  export let posts;
</script>

<style>
  .content {
    @apply w-full;
    padding-top: 64px;
  }
  @screen lg {
    .content {
      @apply pt-0;
    }
  }
</style>

<svelte:head>
  <title>Software Architecture, Travel, Digital Transformation</title>
</svelte:head>

<div class="content">
  <Bio />
  <FeaturedPosts posts={posts.filter(post => post.featured).slice(0, 3)} />
  <BlogPostSummaryList {posts} />
</div>
