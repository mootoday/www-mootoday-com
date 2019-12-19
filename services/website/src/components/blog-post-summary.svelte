<script>
  import { DateTime } from "luxon";

  export let post;
</script>

<style>
  .wrapper-blog-post-summary {
    @apply border-b
    py-8;
  }

  .wrapper-blog-post-summary:first-of-type {
    @apply pt-0;
  }

  .wrapper-blog-post-summary span {
    @apply uppercase text-sm font-semibold text-gray-700;
  }

  .post-title {
    @apply text-3xl 
    text-brown-800 
    font-bold 
    leading-tight;
  }

  .date-duration {
    @apply mt-1;
  }

  .date-duration span {
    @apply text-xs text-gray-600 font-medium;
  }

  .post-excerpt {
    @apply mt-4
    leading-snug
    overflow-hidden;
  }

  @screen md {
    .post-title {
      @apply text-4xl;
    }
    .post-excerpt {
      @apply tracking-wide
      leading-normal;
    }
    .wrapper-blog-post-summary {
      @apply pb-10;
    }
  }
  @screen lg {
    .wrapper-blog-post-summary {
      @apply py-12;
    }
  }
</style>

<div class="wrapper-blog-post-summary">
  <a href="blog/{post.slug}">
    {#each post.tags as tag, i}
      {#if i >= 1}&nbsp;|{/if}
      <span>{tag.name}</span>
    {/each}
    <h2 class="post-title">{post.title}</h2>
    <div class="date-duration">
      <span>{DateTime.fromISO(post.published_at).toRelative()} &bull;</span>
      <span>{post.reading_time} min read</span>
    </div>
    <p class="post-excerpt">
      {@html post.excerpt}
    </p>
  </a>
</div>
