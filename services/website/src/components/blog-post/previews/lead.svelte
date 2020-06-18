<script>
  export let post;

  const coverImageBasePath = `blog-posts/${
    post.metadata.createdAt.split("T")[0]
  }-${post.metadata.slug}/cover-preview-lead`;
</script>

<div class="flex h-full bg-white rounded overflow-hidden shadow-lg">
  <a
    href="blog/{post.metadata.slug}"
    rel="prefetch"
    class="flex flex-wrap no-underline hover:no-underline">
    <div class="w-full md:w-2/3 rounded-t">
      <picture>
        <source srcset={`${coverImageBasePath}.webp`} type="image/webp" />
        <source srcset={`${coverImageBasePath}.jp2`} type="image/jp2" />
        <img
          src={`${coverImageBasePath}.jpg`}
          loading="lazy"
          class="h-full w-full shadow"
          alt="Cover picture for a blog post titled {post.metadata.title}" />
      </picture>
    </div>

    <div class="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
      <div
        class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden
        shadow-lg">
        {#if false}
          <p class="w-full text-gray-900 text-xs md:text-sm pt-6 px-6">
            GETTING STARTED
          </p>
        {/if}
        <h2 class="w-full font-bold text-indigo-700 text-xl text-gray-900 px-6">
          {post.metadata.title}
        </h2>
        <p class="text-gray-900 font-serif text-base px-6 mb-5">
          {post.metadata.summary}
        </p>
      </div>

      <div
        class="flex-none mt-auto bg-white rounded-b rounded-t-none
        overflow-hidden shadow-lg p-6">
        <div class="flex items-center justify-between">
          <img
            class="w-8 h-8 rounded-full mr-4 avatar"
            data-tippy-content="Author Name"
            src="images/profile-pic.jpg"
            alt="Avatar of Author" />
          <p class="text-gray-900 text-xs md:text-sm">{post.metadata.readingTime}</p>
        </div>
      </div>
    </div>

  </a>
</div>
