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
    @apply relative 
    pb-3/5;
  }

  img {
    @apply absolute
    w-full 
    h-full
    object-cover;
  }

  .post-title-bg {
    @apply bg-brown-700 
    flex
    items-center
    p-3;
    height: 4.5rem;
  }

  .post-title {
    @apply text-white
    overflow-hidden
    leading-normal
    h-12;
  }
</style>

<div class="wrapper-featured-post">
  <a href="blog/{post.slug}">
    <div class="image-bg">
      <img src={post.featured_image} alt={post.title} />
    </div>
    <div class="post-title-bg">
      <p class="post-title">{post.title}</p>
    </div>
  </a>
</div>
