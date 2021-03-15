<script>
  import { fade } from "svelte/transition";
  // import { headerStore } from "../../stores";
  import Comments from "../comments.svelte";
  import Footer from "../footer.svelte";
  import Header from "../header/index.svelte";
  import ImageZoom from "./image-zoom.svelte";
  import SeoHeadPost from "../seo/head-post.svelte";
  import Subscribe from "../subscribe.svelte";

  export let post;

  // Blog posts prior to PR 259 had their cover.jpg file stored in the `static` directory of this git repo.
  const coverUrl = post.metadata.coverPhotoId ? `https://source.unsplash.com/${post.metadata.coverPhotoId}/1200x1000` : `blog-posts/${post.metadata.slug}/cover.jpg`

  const titleAction = (/*node*/) => {
  //   const observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach(entry => {
  //       // headerStore.setScrollBarProgressVisible(!entry.isIntersecting, post.metadata.readingTime)
  //     });
  //   });

  //   observer.observe(node);

  //   return {
  //     destroy() {
  //       headerStore.setScrollBarProgressVisible(false, {});
  //       observer.disconnect();
  //     }
  //   };
  };
</script>

<style>
  div.content :global(img) {
    cursor: zoom-in;
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
    class="container w-full max-w-full mx-auto bg-white bg-cover bg-center mt-8 rounded"
    style="background-image:url('{coverUrl}');
    height: 75vh;" />

  <div class="container max-w-5xl mx-auto -mt-32">
    <div class="mx-0 sm:mx-6">
      <div
        class="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800
        leading-normal"
        style="font-family:Georgia,serif;">
        <p class="text-2xl md:text-3xl mb-5">{post.metadata.summary}</p>
        <div class="prose lg:prose-xl content break-words">
          <slot />
        </div>
        <Comments />
      </div>
      <Subscribe />
    </div>
  </div>
  <ImageZoom />
  <Footer />
</div>
