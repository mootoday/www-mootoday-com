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
  .wrapper {
    @apply p-8 bg-gray-300;
  }

  h2 {
    @apply text-3xl text-gray-700;
  }

  .posts {
    @apply flex justify-around;
  }
</style>

<div class="wrapper">
  <h2>Featured Posts</h2>
  <div class="posts">
    {#each featuredPosts as post}
      <FeaturedPost {post} />
    {/each}
  </div>
</div>
