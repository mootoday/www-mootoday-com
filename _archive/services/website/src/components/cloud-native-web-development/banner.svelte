<script>
  import { onMount } from "svelte";
  import A from "../ui-elements/a.svelte";

  let isBannerVisible;

  onMount(() => {
    isBannerVisible = !localStorage.getItem("hideCnwdBanner");
  });

  const hideBanner = () => {
    isBannerVisible=false;
    localStorage.setItem("hideCnwdBanner", true)
  }
  </script>

<style>
  .wrapper {
    --primary-color: #e6e051;
    --secondary-color: #83fcfc;
  }

  div :global(a) {
    background-color: var(--primary-color);
    color: #041522;
    font-family: magistral-condensed, sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .book-title{
      color:var(--primary-color);
  }
</style>

{#if isBannerVisible}
<div
  class="wrapper z-50 transition transform fixed z-100 bottom-0 inset-x-0 pb-2
  sm:pb-5">
  <div class="max-w-screen-xl mx-auto px-2 sm:px-4">
    <div class="p-2 rounded-lg bg-gray-900 shadow-lg sm:p-3">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <img class="md:hidden h-6" src="/cloud-native-web-development/icon-part-cloud-native-web-development.svg" alt="Book logo" />
          <p class="ml-3 font-medium text-white truncate">
            <span class="md:hidden">
              <span class="sr-only">Cloud Native Web Development</span>
             is now available!
            </span>
            <span class="hidden md:inline text-gray-400">
<span class="book-title font-semibold mr-1">Cloud Native Web Development </span>
              <strong class="text-white font-semibold mr-1">
                Now available!
              </strong>
              <span class="hidden xl:inline">
                From zero to production: A hands-on guidebook.
              </span>
            </span>
          </p>
        </div>
        <div
          class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
          <div class="rounded-md shadow-sm">
            <A
              href="/cloud-native-web-development"
              class="flex items-center justify-center px-4 py-2 border
              border-transparent text-sm leading-5 font-medium rounded-md
              text-gray-900 bg-white hover:text-gray-800 focus:outline-none
              focus:underline">
              Learn more
            </A>
          </div>
        </div>
        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
          <button on:click={hideBanner}
            type="button"
            aria-label="Hide banner"
            class="-mr-1 flex p-2 rounded-md hover:bg-gray-800
            focus:outline-none focus:bg-gray-800">
            <svg
              class="h-6 w-6 text-white"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}