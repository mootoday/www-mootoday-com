<script>
  import { slide } from "svelte/transition";
  import FlyOutMenuItem from "./fly-out-menu-item.svelte";

  export let isOpen = false;
  export let menu;
</script>

<div class="relative">
  <button on:click|stopPropagation type="button" class="text-white group inline-flex items-center space-x-2 text-base leading-6 font-medium focus:outline-none transition ease-in-out duration-150">
    <span>{menu.label}
    </span>
    <svg class="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
    </svg>
  </button>

  {#if isOpen}
    <div in:slide={{duration: 200}} out:slide={{duration: 150}} class="absolute right-0 mt-3 transform px-2 w-screen max-w-md sm:px-0 z-10">
      <div class="rounded-lg shadow-lg">
        <div class="rounded-lg shadow-xs overflow-hidden">
          <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            {#each menu.items as menuItem}
              <FlyOutMenuItem {menuItem} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
