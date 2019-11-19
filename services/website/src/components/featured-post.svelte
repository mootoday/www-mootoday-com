<script>
  export let post;
</script>

<style>
  .wrapper-featured-post {
    @apply m-4
     rounded-lg 
     overflow-hidden 
     shadow-md 
     w-full;
  }

  .wrapper-featured-post:first-child {
    @apply ml-0;
  }
  .wrapper-featured-post:last-child {
    @apply mr-0;
  }
  .image-bg {
    @apply relative pb-2/3;
  }
  img {
    @apply absolute
    w-full 
    h-full
    object-cover;
  }

  p {
    @apply p-3 bg-brown-700 text-white truncate;
  }
</style>

<div class="wrapper-featured-post">
  <a href="blog/{post.slug}">
    <div class="image-bg">
      <img src={post.featured_image} alt={post.title} />
    </div>
    <p>{post.title}</p>
  </a>
</div>
