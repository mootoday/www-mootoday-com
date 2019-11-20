<script>
  import { DateTime } from "luxon";

  export let post;
</script>

<style>
  .wrapper-blog-post-summary {
    @apply mb-8
    border-b
    pb-8;
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

  span {
    @apply text-xs text-gray-600 font-medium;
  }

  .post-excerpt {
    @apply tracking-wide 
    mt-4
    leading-normal
    overflow-hidden;
    height: 4.5em;
  }
</style>

<div class="wrapper-blog-post-summary">
  <h2 class="post-title">
    <a href="blog/{post.slug}">{post.title}</a>
  </h2>
  <div class="date-duration">
    <span>{DateTime.fromISO(post.published_at).toRelative()} &bull;</span>
    <span>{post.reading_time} min read</span>
  </div>
  <p class="post-excerpt">
    {@html post.excerpt}
  </p>
</div>
