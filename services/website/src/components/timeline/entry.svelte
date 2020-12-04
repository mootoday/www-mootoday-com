<script>
  import EntryContent from "./entry-content.svelte";

  export let entry;
</script>

<style>
  @screen md {
    div:nth-child(odd) .circle {
      @apply -mr-5;
    }

    div:nth-child(odd) .triangle {
      @apply -ml-5 mr-9;
    }
  }
</style>

<div class="px-2 flex w-full md:odd:justify-start md:even:self-end md:odd:flex-row-reverse md:px-0 md:w-1/2">
  <span class="circle hidden -ml-5 z-10 self-center bg-white rounded-full h-10 w-10 border-4 border-{entry.label} md:block"></span>
  <span class="triangle hidden ml-4 -mr-5 transform rotate-45 self-center h-10 w-10 bg-{entry.label} md:block"></span>
  <EntryContent {entry} />
</div>
