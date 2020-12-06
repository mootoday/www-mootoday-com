<script>
  import { formatDistanceToNow } from "date-fns";
  import A from "../ui-elements/a.svelte";

  export let entry;

  $: humanReadableTimestamp = entry.isBirth ? entry.timestamp : formatDistanceToNow(entry.timestamp, { addSuffix: true });
</script>

<style>
  p :global(a) {
    @apply underline;
  }

  p {
    @apply leading-relaxed text-xl;
  }
</style>

<div class="z-10 p-4 w-full bg-white shadow-md rounded-md border-4 border-{entry.label} text-sm md:w-5/6 md:text-lg">
  <div class="flex justify-between items-center">
    <span class="text-sm capitalize">{humanReadableTimestamp}</span>
    {#if !entry.isBirth}
      <span class="px-3 py-0.5 inline-flex items-center rounded-full text-sm font-medium bg-{entry.label} text-white uppercase">
        {entry.label}
      </span>
    {/if}
  </div>

  <p class="py-2 font-medium">
    {entry.milestone}
  </p>

  {#if !entry.isBirth}
    <p><A href="{entry.link}">{entry.cta}</A></p>
  {/if}
</div>
