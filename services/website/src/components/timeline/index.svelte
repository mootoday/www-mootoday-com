<script>
  import { timelineFiltersStore } from "../../stores";
  import Entry from "./entry.svelte";
  import Filters from "./filters.svelte";
  import Intro from "./intro.svelte";

  export let entries;

  const uniqueFilters = Array.from(new Set(entries.map(entry => entry.label)));
  $timelineFiltersStore = uniqueFilters;

  $: filteredEntries = entries.filter(entry => $timelineFiltersStore.includes(entry.label));
</script>

<style>
  .entries::after {
    /* Kudos to https://www.florin-pop.com/timeline */
    @apply bg-black absolute left-4 w-1 h-full;
    left: calc(50% - 2px);
    content: "";
  }
</style>

<div class="pt-20 md:container md:mx-auto">
  <Intro />
  <Filters filters={uniqueFilters} />
  
  <div class="mt-20 flex flex-col space-y-10 relative entries">
    {#each filteredEntries as entry, index}
      <Entry {entry} isOddChild={index % 2 === 0} />
    {/each}
  </div>
</div>
