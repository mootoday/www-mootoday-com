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
    @apply p-10
		pt-6
		bg-brown-200;
  }

  h1 {
    @apply text-2xl	
		text-brown-800 
		font-bold leading-snug;
  }

  .content :global(h2) {
    @apply text-xl text-blue-800;
  }

  .content :global(p) {
    @apply mb-2;
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
    @apply list-disc list-inside pl-5;
  }

  .content :global(hr) {
    @apply border-b;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .content :global(img) {
    max-width: 100%;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content={post.meta_description} />
  <LinkPreviewMetaTags {post} />
</svelte:head>

<div class="wrapper-blog-slug">
  <h1>{post.title}</h1>
  <span>{DateTime.fromISO(post.published_at).toRelative()} &bull;</span>
  <span>{post.reading_time} min read</span>

  <div class="content">
    {@html post.html}
  </div>
</div>
