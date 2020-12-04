<script>
  import { formatDistanceToNow } from "date-fns";

  export let entry;

  $: humanReadableTimestamp = entry.isBirth ? "On a sunny day in the 1980s" : formatDistanceToNow(entry.timestamp, { addSuffix: true });
</script>

<style>
  a {
    @apply underline;
  }

  p {
    @apply leading-10 text-xl;
  }
</style>

<div class="z-10 p-4 w-full bg-white shadow-md rounded-md border-4 border-{entry.label} text-sm md:w-3/5 md:text-lg">
  <div class="flex justify-between items-center">
    <span class="text-sm capitalize">{humanReadableTimestamp}</span>
    {#if !entry.isBirth}
      <span class="py-1 px-4 rounded-full uppercase text-white bg-{entry.label}">{entry.label}</span>
    {/if}
  </div>

  <p>
    {#if entry.cta}
      {entry.milestone}
    {:else}
      <a href="{entry.link}">{entry.milestone}</a>
    {/if}
  </p>

  {#if entry.cta}
    <p><a href="{entry.link}">{entry.cta}</a></p>
  {/if}
</div>
