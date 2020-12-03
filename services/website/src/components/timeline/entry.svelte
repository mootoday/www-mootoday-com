<script>
  import EntryContent from "./entry-content.svelte";

  export let entry;
  export let isSelfPositionEnd = false;
</script>

<style>
  /* Border */
  .blog-border {
    @apply border-purple-500;
  }

  .project-border {
    @apply border-red-500;
  }

  .twitter-border {
    @apply border-green-500;
  }

  .youtube-border {
    @apply border-blue-500;
  }

  /* Background */
  .blog-bg {
    @apply bg-purple-500;
  }

  .project-bg {
    @apply bg-red-500;
  }

  .twitter-bg {
    @apply bg-green-500;
  }

  .youtube-bg {
    @apply bg-blue-500;
  }
</style>

{#if isSelfPositionEnd}
  <div class="flex self-end w-1/2">
    <span class="z-10 -ml-5 self-center bg-white rounded-full h-10 w-10 border-4 {entry.label}-border"></span>
    <span class="-mr-5 ml-4 transform rotate-45 self-center h-10 w-10 {entry.label}-bg"></span>
    <div class="z-10 p-4 w-3/5 bg-white shadow-md rounded-md border-4 {entry.label}-border">
      <EntryContent {entry} />
    </div>
  </div>
{:else}
  <div class="flex justify-end w-1/2">
    <div class="z-10 p-4 w-3/5 bg-white shadow-md rounded-md border-4 {entry.label}-border">
      <EntryContent {entry} />
    </div>
    <span class="-ml-5 mr-4 transform rotate-45 self-center h-10 w-10 {entry.label}-bg"></span>
    <span class="z-10 -mr-5 self-center bg-white rounded-full h-10 w-10 border-4 {entry.label}-border"></span>
  </div>
{/if}

