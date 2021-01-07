<script>
  import A from "../../ui-elements/a.svelte";

  export let post;

  const coverImageBasePath = `event-posts/${
    post.metadata.createdAt.split("T")[0]
  }-${post.metadata.slug}/cover-preview.jpg`;
</script>

<div class="mb-20">
  <a href="event/{post.metadata.slug}" class="flex">
    <div class="flex-shrink-0 w-40">
      <img
              src={coverImageBasePath}
              loading="lazy"
              alt="Cover picture for a blog post titled {post.metadata.title}" />
    </div>
    <div class="fw ml-10">
      <h4 class="text-2xl mb-4">{post.metadata.title}</h4>
      <p>{post.metadata.event_start_date} to {post.metadata.event_end_date}</p>
      <p class="mb-4 text-gray-700">{post.metadata.summary}</p>
      <p class="mb-4">
        {#each post.metadata.tags as t}
          <a href="/teatime/tags/{t}" class="tag">#{t}</a>
        {/each}
      </p>

      {#if post.metadata.category}
        <p class="mb-4">
          {#each post.metadata.category as c}
            <a href="/event/category/{c.slug}" class="tag">#{c.name}</a>
          {/each}
        </p>
      {/if}
    </div>
  </a>
</div>
