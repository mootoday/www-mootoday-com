<script>
  export let post;
</script>

<style>
  .wrapper-featured-post {
    @apply mt-3
    rounded-lg 
    overflow-hidden 
    shadow-md
    min-w-full;
  }

  .wrapper-featured-post:first-child {
    @apply ml-0;
  }

  .wrapper-featured-post:last-child {
    @apply mr-0;
  }

  .image-bg {
    @apply relative 
    pb-5/12;
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
    p-3;
    height: 4.5rem;
  }

  .post-title {
    @apply text-white
    overflow-hidden
    leading-normal
    h-12
    leading-snug
    font-medium
    w-full;
  }

  @screen md {
    .wrapper-featured-post {
      @apply m-4
      w-full
      min-w-0
      mb-0;
    }
    .image-bg {
      @apply pb-3/5;
    }
    .post-title {
      @apply leading-normal
      text-center;
    }
  }

  @screen lg {
    .wrapper-featured-post {
      @apply mt-6;
    }
  }
</style>

<div class="wrapper-featured-post">
  <a href="blog/{post.slug}">
    <div class="image-bg">
      <img src={post.feature_image} alt={post.title} />
    </div>
    <div class="post-title-bg">
      <p class="post-title">{post.title}</p>
    </div>
  </a>
</div>
