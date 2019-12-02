<script>
  import FeaturedPost from "./featured-post.svelte";

  export let posts;
</script>

<style>
  .wrapper-featured-posts {
    @apply py-8 px-5 bg-brown-400;
  }

  .featured-posts-title {
    @apply text-lg
    text-gray-700 
    uppercase
    tracking-wide
    font-semibold;
  }

  .posts {
    @apply flex 
    justify-around
    flex-wrap;
  }

  @screen md {
    .wrapper-featured-posts {
      @apply py-12 px-16;
    }
    .featured-posts-title {
      @apply text-xl
      font-normal;
    }
    .posts {
      @apply flex-no-wrap;
    }
  }
</style>

<div class="wrapper-featured-posts">
  <h3 class="featured-posts-title">Featured Posts</h3>
  <div class="posts">
    {#each posts as post}
      <FeaturedPost {post} />
    {/each}
  </div>
</div>
