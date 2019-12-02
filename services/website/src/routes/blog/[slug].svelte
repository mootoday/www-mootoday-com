<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200 && data) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { DateTime } from "luxon";
  import LinkPreviewMetaTags from "../../components/link-preview/index.svelte";
  export let post;
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .wrapper-blog-slug {
    @apply py-4
    px-5 
		bg-brown-200;
    padding-top: 64px;
  }

  .post-title-content {
    @apply text-3xl
		text-brown-800 
		font-bold
    mt-8;
    line-height: 1.15;
  }

  .date-duration {
    @apply mt-1;
  }

  span {
    @apply text-sm text-gray-600 font-medium;
  }

  .content {
    @apply mt-8;
  }

  .content :global(h2) {
    @apply text-xl;
  }

  .content :global(p) {
    @apply mb-6;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
    @apply list-disc list-outside;
    padding-left: 1.7rem;
  }

  .content :global(hr) {
    @apply border-b-0 my-10;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
    @apply pl-1;
  }

  .content :global(figure) {
    @apply my-8;
  }

  .content :global(img) {
    max-width: 100%;
  }
  @screen md {
    .wrapper-blog-slug {
      @apply py-10 
    px-12;
    }
    .post-title-content {
      @apply text-5xl;
    }
  }
</style>

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content={post.meta_description} />
  <LinkPreviewMetaTags {post} />
</svelte:head>

<div class="wrapper-blog-slug">
  <h1 class="post-title-content">{post.title}</h1>

  <div class="date-duration">
    <span>{DateTime.fromISO(post.published_at).toRelative()} &bull;</span>
    <span>{post.reading_time} min read</span>
  </div>

  <div class="content">
    <img src={post.feature_image} alt="Featured image" />
    {@html post.html}
  </div>
</div>
