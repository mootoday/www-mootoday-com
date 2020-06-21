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

  export let posts;

  // Without cloning the posts, it is an empty array when hydration kicks in.
  const postsArray = [...posts];

  let isShowHeader = false;

  const homepageNavAction = node => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          isShowHeader = !entry.isIntersecting;
        });
      }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  };
</script>

<svelte:head>
  <title>Mike's Personal Website</title>
</svelte:head>

<div class="bg-gray-200 font-sans leading-normal tracking-normal">
  {#if isShowHeader}
    <Header />
  {/if}
  <div
    class="w-full m-0 p-0 bg-cover bg-bottom"
    style="background-image:url('images/cover.jpg'); height: 60vh;
    max-height:460px;">
    <div
      use:homepageNavAction
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
        <BlogPostPreviewLead post={postsArray.shift()} />
        <div class="flex flex-wrap justify-between py-12 md:-mx-6">
          {#each postsArray as post}
            <BlogPostPreview {post} />
          {/each}
        </div>
      </div>

      {#if false}
        <Subscribe />
      {/if}
    </div>
  </div>
  <Footer />
</div>
