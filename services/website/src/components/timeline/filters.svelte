<script>
  import { timelineFiltersStore } from "../../stores";

  export let filters;
</script>

<div class="mt-20 mb-10 flex flex-wrap md:flex-nowrap md:justify-center md:space-x-20">
  {#each filters as filter}
    <div class="relative flex items-center text-{filter}">
      <div class="flex items-center h-10">
        <input
          id="filter_{filter}"
          type="checkbox"
          bind:group={$timelineFiltersStore}
          value={filter}
          class="focus:ring-indigo-500 h-10 w-10 border-gray-300 rounded" />
      </div>
      <div class="ml-3 text-2xl">
        <label
          for="filter_{filter}"
          class="font-medium uppercase">{filter}</label>
      </div>
    </div>
  {/each}
</div>
