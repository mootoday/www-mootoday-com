<script>
  import A from "../ui-elements/a.svelte";

  export let isOpen = false;
  export let menuItems;
</script>

  {#if isOpen}
    <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
      <div class="rounded-lg shadow-lg">
        <div class="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-semibold">Projects</span>
              </div>
              <div class="-mr-2">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <nav class="grid gap-y-8">
                {#each menuItems as menuItem}
                <A href="{menuItem.href}" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                  <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{menuItem.svgPath}"/>
                  </svg>
                  <div class="text-base leading-6 font-medium text-gray-900">
                    {menuItem.label}
                  </div>
                </A>
                {/each}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}