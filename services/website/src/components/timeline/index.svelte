<script>
  import Entry from "./entry.svelte";
  import Filters from "./filters.svelte";
  import Intro from "./intro.svelte";

  export let entries;

  $: filters = entries.map(entry => entry.label);
</script>

<style>
  .entries::after {
    /* Kudos to https://www.florin-pop.com/timeline */
    background-color: #000;
    content: "";
    position: absolute;
    left: calc(50% - 2px);
    width: 4px;
    height: 100%;
  }
</style>

<div class="container mx-auto pt-20">
  <Filters {filters} />
  <Intro />
  
  <div class="mt-20 flex flex-col space-y-10 entries">
    {#each entries as entry, index}
      <Entry {entry} isSelfPositionEnd={index % 2 !== 0} />
    {/each}
  </div>
</div>
