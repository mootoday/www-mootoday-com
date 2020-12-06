<script>
  import { searchStore } from "../../stores";

  let searchInputNode;
  let searchTerm = "";
  $: if (searchTerm === "/") {
    searchTerm = "";
  } else {
    $searchStore = searchTerm;
  }

  const handleBodyKeyPress = (event) => {
    if (event.key === "/") {
      searchInputNode.focus();
    }
  };
</script>

<svelte:body on:keypress={handleBodyKeyPress} />

<div class="mt-6 px-2 md:mt-10">
  <label for="search" class="sr-only">Search</label>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center
      pointer-events-none">
      <svg
        class="h-5 w-5 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1
          1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd" />
      </svg>
    </div>
    <input
      id="search"
      bind:this={searchInputNode}
      class="block w-full py-4 pl-10 pr-3 border border-transparent rounded-full
      leading-5 bg-gray-700 text-gray-400 placeholder-gray-400
      focus:outline-none focus:ring 
      transition duration-150 ease-in-out md:text-2xl"
      placeholder={`Search (Press "/" to focus)`}
      type="search"
      bind:value={searchTerm} />
  </div>
</div>
