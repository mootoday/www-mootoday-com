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

<span class="text-sm capitalize">{formatRelative(entry.timestamp, Date.now())}</span>

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
