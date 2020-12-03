<script>
  import Entry from "./entry.svelte";
  import Filters from "./filters.svelte";
  import Intro from "./intro.svelte";

  export let entries;
</script>

<div class="pt-20">
  <Filters />
  <Intro />
  
  {#each entries as entry}
    <Entry {entry} />
  {/each}
</div>
