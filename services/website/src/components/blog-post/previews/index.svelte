<script>
  import A from "../../ui-elements/a.svelte";

  export let post;

  const coverImageBasePath = `blog-posts/${
    post.metadata.createdAt.split("T")[0]
  }-${post.metadata.slug}/cover-preview`;
</script>

<div class="w-full md:w-1/3 py-6 md:px-6 flex flex-col flex-grow flex-shrink">
  <div
    class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
    <A
      href="blog/{post.metadata.slug}"
      class="flex flex-wrap no-underline hover:no-underline">

      <picture>
        <source srcset={`${coverImageBasePath}.webp`} type="image/webp" />
        <source srcset={`${coverImageBasePath}.jp2`} type="image/jp2" />
        <img
          src={`${coverImageBasePath}.jpg`}
          loading="lazy"
          class="h-64 w-full rounded-t pb-6 object-cover"
          alt="Cover picture for a blog post titled {post.metadata.title}" />
      </picture>

      <p class="w-full text-gray-900 text-xs md:text-sm px-6 uppercase">
        {post.metadata.tags[0]}
      </p>
      <h2 class="w-full font-bold text-indigo-700 text-xl text-gray-900 px-6">
        {post.metadata.title}
      </h2>
      <p class="text-gray-900 font-serif text-base px-6 mb-5">
        {post.metadata.summary}
      </p>
    </A>
  </div>
  <div
    class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden
    shadow-lg p-6">
    <div class="flex items-center justify-between">
      <img
        class="w-8 h-8 rounded-full mr-4 avatar"
        data-tippy-content="Author Name"
        src="images/profile-pic.jpg"
        alt="Avatar of Author" />
      <p class="text-gray-900 text-xs md:text-sm">{post.metadata.readingTime.text}</p>
    </div>
  </div>
</div>
