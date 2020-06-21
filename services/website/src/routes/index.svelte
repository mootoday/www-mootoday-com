<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import BlogPostPreview from "../components/blog-post/previews/index.svelte";
  import BlogPostPreviewLead from "../components/blog-post/previews/lead.svelte";
  import Footer from "../components/footer.svelte";
  import Header from "../components//header/index.svelte";
  import Subscribe from "../components/subscribe.svelte";
  import { searchStore } from "../stores/search";

  export let posts;

  // Without cloning the posts, it is an empty array when hydration kicks in.
  const postsArray = [...posts];

  $: filteredPosts = postsArray.filter(post =>
    post.metadata.title.toLowerCase().includes($searchStore.toLowerCase()) ||
    post.metadata.summary.toLowerCase().includes($searchStore.toLowerCase())
  );
</script>

<svelte:head>
  <title>Mike's Personal Website</title>
</svelte:head>

<div class="bg-gray-200 font-sans leading-normal tracking-normal">
  <Header />
  <div
    class="w-full m-0 p-0 bg-cover bg-bottom"
    style="background-image:url('images/cover.jpg'); height: 60vh;
    max-height:460px;">
    <div
      class="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
      <h1 class="text-white font-extrabold text-3xl md:text-5xl">
        👋 Mike Nikles
      </h1>
      <h2 class="text-xl md:text-2xl text-gray-500">Welcome to my blog</h2>
    </div>
  </div>

  <div class="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
    <div class="mx-0 sm:mx-6">
      <div
        class="bg-gray-200 w-full text-xl md:text-2xl text-gray-800
        leading-normal rounded-t">
        {#if filteredPosts.length > 0}
          <BlogPostPreviewLead post={filteredPosts.shift()} />
          <div class="flex flex-wrap justify-between py-12 md:-mx-6">
            {#each filteredPosts as post (post.metadata.slug)}
              <BlogPostPreview {post} />
            {/each}
          </div>
        {:else}
          <p>No blog posts match your search criteria.</p>
        {/if}
      </div>

      {#if false}
        <Subscribe />
      {/if}
    </div>
  </div>
  <Footer />
</div>
