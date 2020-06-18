<script>
  import { fade } from 'svelte/transition';
  import Footer from "../footer.svelte";
  import ScrollProgressBar from "./scroll-progress-bar.svelte";
  import Subscribe from "../subscribe.svelte";

  export let metadata;

  let scrollY;
  let navHeight;
  $: isShowHeader = scrollY > navHeight;

  const setNavHeight = (node) => {
    navHeight = node.offsetHeight;
  }
</script>

<style>
  div.content :global(h2) {
    @apply pt-6 text-3xl font-semibold;
  }

  div.content :global(ul) {
    @apply list-disc list-inside text-lg;
  }

  div.content :global(ol) {
    @apply list-decimal list-inside text-lg;
  }

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

<svelte:head>
  <title>{metadata.title}</title>
  <link href="prism.css" rel="stylesheet" />
</svelte:head>
<svelte:window bind:scrollY />

<div class="bg-white font-sans leading-normal tracking-normal">
  <nav use:setNavHeight class="bg-gray-900 p-4 mt-0 w-full">
    <div class="container mx-auto flex items-center">
      <div class="flex text-white font-extrabold">
        <a
          class="flex text-white text-base no-underline hover:text-white
          hover:no-underline"
          href="/">
          👋
          <span class="md:w-auto md:block pl-1">Mike Nikles</span>
        </a>
      </div>
      {#if false}
      <div class="flex pl-4 text-sm">
        <ul
          class="list-reset flex justify-between flex-1 md:flex-none
          items-center">
          <li class="mr-2">
            <a
              class="inline-block text-gray-600 no-underline hover:text-gray-200
              hover:text-underline py-2 px-2"
              href="TODO.html">
              LINK
            </a>
          </li>
        </ul>
      </div>
      {/if}
    </div>
  </nav>

  {#if isShowHeader}
  <div
    class="bg-white fixed w-full z-10 top-0 animated"
    style="opacity: .95;"
    transition:fade>
    <div class="bg-white p-4">
      <div class="container mx-auto flex flex-wrap items-center content-center">
        <div class="flex w-1/2 justify-start text-white font-extrabold">
          <a
            class="flex text-gray-900 no-underline hover:text-gray-900
            hover:no-underline"
            href="/">
            👋
            <span class="md:w-auto md:block pl-1">
              Mike Nikles
            </span>
          </a>
        </div>
        {#if false}
        <div class="flex w-1/2 justify-end content-center">
          <p class="sm:block mr-3 text-center h-14 p-4 text-xs">
            <span class="pr-2">Share this post</span>
            👉
          </p>
          <a
            class="inline-block text-white no-underline hover:text-white
            hover:text-underline text-center h-10 w-10 p-2 md:h-auto md:w-16
            md:p-4"
            href="https://twitter.com/intent/tweet?url=#"
            style="background-color:#33b1ff;">
            <svg
              class="fill-current text-white h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32">
              <path
                d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0
                1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063
                4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625
                2.563c-1.813.688-3.75 1-5.75 1-3.25
                0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0
                5.063-.875 7.188-2.5-1.25
                0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125
                1.125.125.5 0 1-.063
                1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0
                1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0
                1-1.875-2c-.5-.875-.688-1.813-.688-2.75
                0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313
                1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125
                2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0
                3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125
                2.188-.438 3.313-.875z" />
            </svg>
          </a>
        </div>
        {/if}
      </div>
    </div>
    <ScrollProgressBar height={navHeight} />
  </div>
  {/if}

  <div class="text-center pt-16 md:pt-32">
    <p class="text-sm md:text-base font-bold">
      {new Date(metadata.createdAt).toLocaleDateString(undefined, {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      })}
      {#if false}
      <span class="text-gray-900">/</span>
      GETTING STARTED
      {/if}
    </p>
    <h1 class="font-bold break-normal text-indigo-700 text-3xl md:text-5xl">
      {metadata.title}
    </h1>
  </div>

  <div
    class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
    style="background-image:url('blog-posts/{metadata.createdAt.split("T")[0]}-{metadata.slug}/cover.jpg');
    height: 75vh;" />

  <div class="container max-w-5xl mx-auto -mt-32">
    <div class="mx-0 sm:mx-6">
      <div
        class="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800
        leading-normal"
        style="font-family:Georgia,serif;">
        <p class="text-2xl md:text-3xl mb-5">
          {metadata.summary}
        </p>
        <div class="content">
          <slot />
        </div>
      </div>

      {#if false}
        <Subscribe />
      {/if}
    </div>
  </div>
  <Footer />
</div>
