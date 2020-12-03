<script context="module">
  export async function  preload() {
    const response = await this.fetch(`blog.json`);
    const posts = await response.json();
    return { posts };
  }
</script>

<script>
  import BlogPostPreview from "../components/blog-post/previews/index.svelte";
  import BlogPostPreviewLead from "../components/blog-post/previews/lead.svelte";
  import Footer from "../components/footer.svelte";
  import SeoHead from "../components/seo/head.svelte";
  import Subscribe from "../components/subscribe.svelte";
  import { headerStore, searchStore } from "../stores";

  export let posts;

  $: filteredPosts = posts.filter(post =>
    post.metadata.title.toLowerCase().includes($searchStore.toLowerCase()) ||
    post.metadata.summary.toLowerCase().includes($searchStore.toLowerCase())
  ).sort((a, b) =>
    a.metadata.createdAt > b.metadata.createdAt
      ? -1
      : a.metadata.createdAt < b.metadata.createdAt
      ? 1 
      : 0
  );
  $: mostRecentPost = filteredPosts[0];
  $: olderPosts = filteredPosts.slice(1);

  const titleAction = node => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        headerStore.setHeaderTransparent(entry.isIntersecting);
      });
    });

    observer.observe(node);

    return {
      destroy() {
        headerStore.setHeaderTransparent(false);
        observer.disconnect();
      }
    };
  };

</script>

<SeoHead />
<div class="flex flex-col min-h-screen bg-gray-200 font-sans leading-normal tracking-normal">
  <div
    class="w-full m-0 p-0 bg-cover bg-bottom"
    style="background-image:url('images/cover.jpg'); height: 60vh;
    max-height:460px;">
    <div
      class="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
      <h1 use:titleAction class="text-white font-extrabold text-3xl md:text-5xl">
        👋 Mike Nikles
      </h1>
      <h2 class="text-xl md:text-2xl text-gray-500">Welcome to my blog</h2>
    </div>
  </div>

  <div class="flex-grow container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
    <div class="mx-0 sm:mx-6">
      <div
        class="bg-gray-200 w-full text-xl md:text-2xl text-gray-800
        leading-normal rounded-t">
          {#if mostRecentPost}
            <BlogPostPreviewLead post={mostRecentPost} />
          {/if}
          {#if olderPosts.length > 0}
            <div class="flex flex-wrap justify-between py-12 md:-mx-6">
              {#each olderPosts as post (post.metadata.slug)}
                <BlogPostPreview {post} />
              {/each}
            </div>
          {/if}
        {#if !mostRecentPost && olderPosts.length === 0}
          <p>No blog posts match your search criteria.</p>
        {/if}
      </div>
      <Subscribe />
    </div>
  </div>
  <Footer />
</div>
