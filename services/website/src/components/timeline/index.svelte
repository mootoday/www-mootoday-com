<script>
  import { timelineEntries } from "../../stores/timeline";
  import Entry from "./entry.svelte";
  import Filters from "./filters.svelte";
  import Search from "./search.svelte";
  import Intro from "./intro.svelte";
  import YearDivider from "./year-divider.svelte";

  const birthEntry = {
    label: "black",
    isBirth: true,
    milestone: "👶🍼 => 🤓🖥️ => 👨🗺️",
    timestamp: "Starting on a sunny day in the 1980s...",
    year: "1980s",
  };
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
  <Filters />
  <Search />

  <div class="entries mt-10 flex flex-col space-y-10 relative md:mt-20">
    {#each $timelineEntries as entry}
      {#if typeof entry === "number"}
        <YearDivider year={entry} />
      {:else}
        <Entry {entry} />
      {/if}
    {/each}
    <Entry entry={birthEntry} />
  </div>
</div>
