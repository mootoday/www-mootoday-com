<script>
  import { formatRelative } from "date-fns";

  export let entry;
</script>

<style>
  a {
    @apply underline;
  }

  p {
    @apply leading-10 text-xl;
  }
</style>

<div class="flex justify-between items-center">
  <span class="text-sm capitalize">{formatRelative(entry.timestamp, Date.now())}</span>
  <span class="py-1 px-4 rounded-full uppercase text-white bg-{entry.label}">{entry.label}</span>
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
