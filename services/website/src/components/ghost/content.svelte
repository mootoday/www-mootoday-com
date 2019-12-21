<script>
  import { onMount } from 'svelte';

  onMount(() => {
    window.Prism && window.Prism.highlightAll();
  })
</script>
<style>
  .ghost-content {
  }
  .post-content {
    @apply flex
    flex-col;
  }

  .ghost-content :global(figure.kg-width-full .kg-image) {
    max-width: 100vw;
  }

  .ghost-content :global(.kg-gallery-container) {
    @apply flex flex-col
    w-screen
    max-w-5xl;
  }

  .ghost-content :global(.kg-gallery-row:first-child) {
    @apply mt-0;
  }

  .ghost-content :global(.kg-gallery-row) {
    @apply flex flex-row mt-3 justify-center;
  }

  .ghost-content :global(.kg-gallery-image:first-child) {
    @apply ml-0;
  }

  .ghost-content :global(.kg-gallery-image) {
    @apply ml-3 w-full;
  }

  .ghost-content :global(figure.kg-card-hascaption figcaption),
  .ghost-content :global(p:first-of-type) {
    @apply my-3 
    text-center
    text-xs
    leading-tight
    text-gray-700;
  }

  .ghost-content :global(p:first-of-type) {
    @apply text-right
    font-sans
    mb-10;
  }

  .ghost-content :global(figure) {
    @apply self-center
    my-6;
  }

  .ghost-content :global(h2) {
    @apply text-3xl
    font-semibold
    my-3
    leading-tight;
  }

  .ghost-content :global(h3) {
    @apply text-2xl
    font-semibold
    mt-3;
  }

  .ghost-content :global(p) {
    @apply mb-5
    text-lg
    font-serif
    text-gray-800
    leading-normal;
  }

  .ghost-content :global(a) {
    @apply border-b
    border-black;
  }
  .ghost-content :global(a:hover) {
    @apply text-brown-800;
  }

  .ghost-content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(80, 73, 73, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .ghost-content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .ghost-content :global(ul) {
    @apply list-disc list-outside leading-normal pl-8 mb-4;
  }

  .ghost-content :global(hr) {
    @apply border-b-0 my-10;
  }

  .ghost-content :global(li) {
    margin: 0 0 0.5em 0;
    @apply pl-1 font-serif text-lg;
  }

  .ghost-content :global(blockquote) {
    @apply min-w-full 
    text-lg
    px-5 mb-8 mt-3 border-l-4 border-brown-700 leading-loose font-serif;
  }

  .ghost-content :global(em) {
    @apply font-semibold;
  }

  @screen md {
    .ghost-content :global(p) {
      @apply mb-8
    leading-relaxed;
    }

    .ghost-content :global(p:first-of-type) {
      @apply mb-12
      mt-3;
    }

    .ghost-content :global(h2) {
      @apply text-3xl;
    }

    .ghost-content :global(figure) {
      @apply my-10;
    }

    .ghost-content :global(figure.kg-card-hascaption figcaption) {
      @apply mt-4;
    }
  }
  @screen lg {
    .ghost-content {
      @apply px-32;
    }

    .ghost-content :global(p) {
      @apply text-xl;
    }

    .ghost-content :global(figure) {
      /* @apply my-3; */
    }

    .ghost-content :global(figure.kg-card-hascaption figcaption) {
      @apply text-sm;
    }
  }

  @screen xl {
    .ghost-content {
      @apply px-40;
    }
    .ghost-content :global(p) {
      @apply text-xl;
    }
    .ghost-content :global(p:first-of-type) {
      @apply mb-20;
    }
  }
</style>

<section class="ghost-content ">
  <div class="post-content">
    <slot />
  </div>
</section>
