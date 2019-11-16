<script>
  import { DateTime } from 'luxon';
  
  export let post;
</script>

<style>
  .wrapper {
    @apply mt-4;
  }

  h3 {
    @apply text-lg text-red-900;
  }

  span {
    @apply text-xs text-gray-700;
  }

  p {
    @apply tracking-wide;
  }
</style>

<div class="wrapper">
  <h3><a href="blog/{post.slug}">{post.title}</a></h3>
  <div>
    <span>{DateTime.fromISO(post.published_at).toRelative()}</span>
    <span>{post.reading_time} min read</span>
  </div>
  <p>{@html post.excerpt}</p>
</div>