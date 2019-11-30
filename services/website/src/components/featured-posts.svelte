<script>
  import FeaturedPost from "./featured-post.svelte";

  const featuredPosts = [
    {
      featured_image:
        "https://assets.mikenikles.com/2019/11/penguin-107645987-1.jpg",
      slug: "migrating-from-medium-to-my-own-blog",
      title: "Migrating from Medium to my own blog"
    },
    {
      featured_image:
        "https://assets.mikenikles.com/2019/11/penguin-107645987-1.jpg",
      slug: "migrating-from-medium-to-my-own-blog",
      title:
        "Migrating from Medium to my own blog Migrating from Medium to my own blog Migrating from Medium to my own blog"
    },
    {
      featured_image:
        "https://assets.mikenikles.com/2019/11/penguin-107645987-1.jpg",
      slug: "migrating-from-medium-to-my-own-blog",
      title: "Migrating from Medium to my own blog"
    }
  ];
</script>

<style>
  .wrapper-featured-posts {
    @apply py-12 px-16 bg-brown-400;
  }

  .featured-posts-title {
    @apply text-xl text-gray-700 uppercase;
  }

  .posts {
    @apply flex justify-around;
  }
</style>

<div class="wrapper-featured-posts">
  <h3 class="featured-posts-title">Featured Posts</h3>
  <div class="posts">
    {#each featuredPosts as post}
      <FeaturedPost {post} />
    {/each}
  </div>
</div>
