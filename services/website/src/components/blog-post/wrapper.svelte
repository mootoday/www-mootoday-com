<script>
  import { fade } from "svelte/transition";
  import { headerStore } from "../../stores";
  import Comments from "../comments.svelte";
  import Footer from "../footer.svelte";
  import Header from "../header/index.svelte";
  import SeoHeadPost from "../seo/head-post.svelte";
  import Subscribe from "../subscribe.svelte";

  export let post;

  headerStore.setHeaderTransparent(false);
  const titleAction = node => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        headerStore.setScrollBarProgressVisible(!entry.isIntersecting, post.metadata.readingTime)
      });
    });

    observer.observe(node);

    return {
      destroy() {
        headerStore.setScrollBarProgressVisible(false, {});
        observer.disconnect();
      }
    };
  };
</script>

<style>
  /* Headings */
  div.content :global(h2) {
    @apply pt-6 text-3xl font-semibold;
  }

  /* Lists */
  div.content :global(ol, ul) {
    @apply list-inside text-lg;
  }

  div.content :global(ol) {
    @apply list-decimal;
  }

  div.content :global(ul) {
    @apply list-disc;
  }

  div.content :global(ol ul, ol ol, ul ul, ul ol) {
    @apply pl-8;
  }

  /* Content. p, code, etc. */
  div.content :global(p) {
    @apply py-4 text-lg;
  }

  div.content :global(code) {
    @apply py-4 text-lg;
  }

  div.content :global(blockquote) {
    padding: 0 1.5em;
    border-left: 3px solid #4c51bf;
  }

  div.content :global(a) {
    @apply text-gray-800 no-underline border-b-2 border-indigo-700;
  }

  div.content :global(a:hover) {
    @apply text-indigo-700;
  }
</style>

<SeoHeadPost {post} />
<svelte:head>
  <link href="prism.css" rel="stylesheet" />
</svelte:head>

<div class="bg-gray-200 font-sans leading-normal tracking-normal">
  <div class="text-center pt-16 md:pt-32">
    <p class="text-sm md:text-base font-bold">
      {new Date(post.metadata.createdAt).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      <span class="text-gray-900">-</span>
      <span class="uppercase">{post.metadata.tags.join(' | ')}</span>
    </p>
    <h1
      use:titleAction
      class="font-bold break-normal text-indigo-700 text-3xl md:text-5xl">
      {post.metadata.title}
    </h1>
  </div>

  <div
    class="container w-full max-w-6xl mx-auto bg-white bg-cover bg-center mt-8 rounded"
    style="background-image:url('blog-posts/{post.metadata.createdAt.split('T')[0]}-{post.metadata.slug}/cover.jpg');
    height: 75vh;" />

  <div class="container max-w-5xl mx-auto -mt-32">
    <div class="mx-0 sm:mx-6">
      <div
        class="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800
        leading-normal"
        style="font-family:Georgia,serif;">
        <p class="text-2xl md:text-3xl mb-5">{post.metadata.summary}</p>
        <div class="content break-words">
          <slot />
        </div>
        <Comments />
      </div>

      {#if false}
        <Subscribe />
      {/if}
    </div>
  </div>
  <Footer />
</div>
