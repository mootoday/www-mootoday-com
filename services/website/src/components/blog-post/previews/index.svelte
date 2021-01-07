<script>
  import A from "../../ui-elements/a.svelte";
  import PostAuthor from './post-author.svelte'

  export let post;

  const coverImageBasePath = `blog-posts/${
    post.metadata.createdAt.split("T")[0]
  }-${post.metadata.slug}/cover.jpg`;
</script>

<div class="mb-20">
  <a href="blog/{post.metadata.slug}" class="flex">
    <div class="flex-shrink-0 w-40">
      <img
              src={coverImageBasePath}
              loading="lazy"
              alt="Cover picture for a blog post titled {post.metadata.title}" />
    </div>
    <div class="fw ml-10">
      <h4 class="text-2xl mb-4">{post.metadata.title}</h4>
      <p class="mb-4 text-gray-700">{post.metadata.summary}</p>
      <p class="mb-4">
        {#each post.metadata.tags as t}
          <a href="/blog/tags/{t}" class="tag">#{t}</a>
        {/each}
      </p>

      {#if post.metadata.category}
        <p class="mb-4">
          {#each post.metadata.category as cat}
            <a href="/blog/category/{cat.slug}" class="tag">#{cat.name}</a>
          {/each}
        </p>
      {/if}

      <PostAuthor {post}/>
    </div>
  </a>
</div>
