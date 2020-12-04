<script>
  import { timelineFiltersStore } from "../../stores";
  import Entry from "./entry.svelte";
  import Filters from "./filters.svelte";
  import Intro from "./intro.svelte";
  import YearDivider from "./year-divider.svelte";

  export let entries;

  const birthEntry = {
    label: "black",
    isBirth: true,
    milestone: "👶",
  };

  const uniqueFilters = Array.from(
    new Set(entries.map((entry) => entry.label))
  );
  $timelineFiltersStore = uniqueFilters;

  $: filteredEntries = entries.filter(
    (entry) =>
      $timelineFiltersStore.includes(entry.label)
  );
  $: entriesGroupedByYear = filteredEntries.reduce((result, entry) => {
    const entryYear = new Date(entry.timestamp).getFullYear();
    if (!result[entryYear]) {
      result[entryYear] = [];
    }
    result[entryYear].push(entry);
    return result;
  }, {});
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
    {#each Object.keys(entriesGroupedByYear).sort((a, b) => b - a) as year}
      {#each entriesGroupedByYear[year] as entry, indexEntry}
        <Entry {entry} />
      {/each}
      <YearDivider {year} />
    {/each}
    <Entry entry={birthEntry} />
    <YearDivider year="1980s" />
  </div>
</div>
