<script>
  import EntryContent from "./entry-content.svelte";

  export let entry;
  export let isPositionLeft;
</script>

{#if isPositionLeft}
  <div class="flex justify-end w-1/2">
    <div class="z-10 p-4 w-3/5 bg-white shadow-md rounded-md border-4 border-{entry.label}">
      <EntryContent {entry} />
    </div>
    <span class="-ml-5 mr-4 transform rotate-45 self-center h-10 w-10 bg-{entry.label}"></span>
    <span class="z-10 -mr-5 self-center bg-white rounded-full h-10 w-10 border-4 border-{entry.label}"></span>
  </div>
{:else}
  <div class="flex self-end w-1/2">
    <span class="z-10 -ml-5 self-center bg-white rounded-full h-10 w-10 border-4 border-{entry.label}"></span>
    <span class="-mr-5 ml-4 transform rotate-45 self-center h-10 w-10 bg-{entry.label}"></span>
    <div class="z-10 p-4 w-3/5 bg-white shadow-md rounded-md border-4 border-{entry.label}">
      <EntryContent {entry} />
    </div>
  </div>
{/if}

