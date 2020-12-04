<script>
  import EntryContent from "./entry-content.svelte";
  import YearDivider from "./year-divider.svelte";

  export let entry;
</script>

<style>
  .break {
    /* Kudos to https://tobiasahlin.com/blog/flexbox-break-to-new-row */
    flex-basis: 100%;
    height: 0;
  }

  .year {
    /* `space-y-10 taken from https://tailwindcss.com/docs/space#class-reference */
    --tw-space-y-reverse: 0;
    margin-top: calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(2.5rem * var(--tw-space-y-reverse));
  }

  @screen md {
    div:nth-child(odd) .circle {
      @apply -mr-5;
    }

    div:nth-child(odd) .triangle {
      @apply -ml-5 mr-9;
    }

    div:nth-child(even) .year {
      @apply -translate-x-1/2;
    }

    div:nth-child(odd) .year {
      @apply translate-x-1/2;
    }
  }
</style>

<div class="px-2 flex justify-center flex-wrap w-full md:justify-start md:even:self-end md:odd:flex-row-reverse md:px-0 md:w-1/2">
  <span class="circle hidden -ml-5 z-10 self-center bg-white rounded-full h-10 w-10 border-4 border-{entry.label} md:block"></span>
  <span class="triangle hidden ml-4 -mr-5 transform rotate-45 self-center h-10 w-10 bg-{entry.label} md:block"></span>
  <EntryContent {entry} />

  {#if entry.year}
    <div class="break"></div>
    <div class="year z-10 transform">
      <YearDivider year={entry.year} />
    </div>
  {/if}
</div>