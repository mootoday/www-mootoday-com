<script>
  export let filters = [];

  let uniqueFilters = new Set(filters);
</script>

<div class="flex justify-center space-x-4">
  {#each Array.from(uniqueFilters) as filter, index}
    <div>
      <input
        id="filter_{index}"
        type="checkbox"
      />
      <label for="filter_{index}">{filter}</label>
    </div>
  {/each}
</div>
