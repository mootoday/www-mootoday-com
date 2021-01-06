<script>
  import { fade } from "svelte/transition";
  import { headerStore } from "../../stores";
  import Footer from "../footer.svelte";
  import Header from "../header/index.svelte";
  import SeoHeadPost from "../seo/head-post.svelte";

  export let post;

  const floatImage = (node) => {
    const paragraphs = node.querySelectorAll('p')
    paragraphs.forEach(p => {
      const img = p.querySelector('img')
      if (img) {
        const img_title = img.title
        if (img_title && img_title > 0) {
          p.style.width = img_title + 'px'
          p.style.float = 'right'
          p.style.padding = '0 1em'
          p.style.margin = '0'
          img.style.margin = '0'
        }
      }
    })
  }
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

<div class="container max-w-6xl mx-auto px-4 mb-20">
  <div
          class="w-full max-w-6xl mx-auto bg-white bg-cover bg-center mt-8 rounded"
          style="background-image:url('event-posts/{post.metadata.createdAt.split('T')[0]}-{post.metadata.slug}/cover.jpg');
      height: 75vh;" />
  <div class="bg-white px-4 py-2 italic font-black">{post.metadata.coverCaption}</div>

  <div class="flex mt-20">
    <div class="flex-shrink-0 w-40">
      <img class="block h-32 rounded-full flex-shrink-0" src="/images/profile-pic.jpg" alt="Woman's Face">
      <p class="text-black font-semibold ml-4">
        {post.metadata.author}
      </p>
      <p>
        {new Date(post.metadata.createdAt).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>

    <div class="flex-1">
      <div class="prose lg:prose-xl content break-words mx-auto" use:floatImage>
        <h2 class="text-xl">{post.metadata.title}</h2>
        <slot />
      </div>
    </div>
  </div>

</div>

<Footer />
