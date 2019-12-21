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
  import LeftSideOverview from "../components/left-side-overview.svelte";

  export let posts;
</script>

<style>
  .content {
    @apply w-full m-auto;
    margin-top: 64px;
  }

  .right-side {
    @apply ml-72;
  }

  .large-screen {
    @apply hidden;
  }

  @screen lg {
    .content {
      @apply pt-0;
      margin-top: 0;
    }
    .large-screen {
      @apply block;
    }

    .small-screen {
      @apply hidden;
    }
  }
</style>

<svelte:head>
  <title>Software Architecture, Travel, Digital Transformation</title>
  <meta name="Description" content="Mike Nikles's blog about software architecture & related topics.">
</svelte:head>

<div class="content">

  <main class="large-screen">
    <LeftSideOverview />
    <div class="right-side">
      <FeaturedPosts posts={posts.filter(post => post.featured).slice(0, 3)} />
      <BlogPostSummaryList {posts} />
    </div>
  </main>

  <main class="small-screen">
    <Bio />
    <FeaturedPosts posts={posts.filter(post => post.featured).slice(0, 3)} />
    <BlogPostSummaryList {posts} />
  </main>

</div>
