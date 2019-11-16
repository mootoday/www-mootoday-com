<script>
  export let post;
</script>

<style>
  .wrapper {
    @apply m-4 rounded-lg overflow-hidden shadow-md;
  }

  .wrapper:first-child {
    @apply ml-0;
  }

  p {
    @apply p-2 h-full bg-red-900 text-white;
  }
</style>

<div class="wrapper">
  <a href="blog/{post.slug}">
    <img src="{post.featured_image}" alt="{post.title}"/>
    <p>{post.title}</p>
  </a>
</div>
