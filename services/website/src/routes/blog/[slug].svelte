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

<script lang="ts">
  import { DateTime } from "luxon";
  import LinkPreviewMetaTags from "../../components/link-preview/index.svelte";
  import GhostPost from "../../components/ghost/post.svelte";
  import Comments from "../../components/comments.svelte";

  // @ts-ignore: Not sure how to define `post` as an optional object
  export let post;
</script>

<style>
  .wrapper-blog-slug {
    @apply py-4
    px-5
    w-full;
    margin-top: 64px;
  }

  .post-full-header {
    @apply pt-5;
  }

  .post-full-header span {
    @apply uppercase text-sm font-semibold text-gray-700;
  }

  h1.post-full-title {
    @apply text-4xl
		text-brown-800 
		font-bold
    leading-tight;
  }

  .post-full-custom-excerpt {
    @apply my-5 
    mx-0
    text-xl
    leading-snug
    mb-8
    font-serif
    text-gray-700;
  }

  .date-duration {
    @apply pt-4
    border-t;
  }

  .date-duration span {
    @apply uppercase;
  }

  span {
    @apply text-sm text-gray-600 font-medium;
  }

  .post-full-image {
    @apply flex
    flex-col
    items-center
    mt-6;
  }

  .post-full-image img {
    max-width: 100vw;
  }

  @screen md {
    .wrapper-blog-slug {
      @apply py-10 
      px-20
      m-auto;
    }

    h1.post-full-title {
      @apply text-5xl
      leading-snug;
    }

    .post-full-custom-excerpt {
      @apply text-xl;
    }

    .post-full-image {
      @apply mt-12;
    }
  }

  @screen lg {
    .wrapper-blog-slug {
      @apply px-12
      m-auto;
      padding-top: 64px;
    }

    .post-full-header {
      @apply pt-10 
      pb-16
    px-32;
    }

    h1.post-full-title {
      @apply leading-snug;
    }

    .post-full-custom-excerpt {
      @apply text-2xl;
    }

    .post-full-image {
      @apply mt-2;
    }
  }

  @screen xl {
    .post-full-image img {
      @apply max-w-5xl;
    }
    .post-full-header {
      @apply pt-16 px-40;
    }
  }
</style>

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content={post.meta_description} />
  <LinkPreviewMetaTags {post} />
</svelte:head>

<div class="wrapper-blog-slug">
  <section class="post-full-header">
    {#each post.tags as tag, i}
      {#if i >= 1}&nbsp;|{/if}
      <span>{tag.name}</span>
    {/each}
    <h1 class="post-full-title">{post.title}</h1>
    <p class="post-full-custom-excerpt">{post.custom_excerpt}</p>
    <div class="date-duration">
      <span>{DateTime.fromISO(post.published_at).toRelative()} &bull;</span>
      <span>{post.reading_time} min read</span>
    </div>
  </section>

  <figure class="post-full-image">
    <img src={post.feature_image} alt="Featured image" />
  </figure>

  <GhostPost>
    {@html post.html}
  </GhostPost>
  <Comments />
</div>
