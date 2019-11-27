<script>
  import TailwindBase from "../tailwind-base.svelte";
  import LeftSideOverview from "../components/left-side-overview.svelte";
</script>

<style>
  /* .small-screen { */
  /* @apply max-w-6xl */
  /* m-auto */
  /* antialiased */
  /* text-gray-900 */
  /* flex-wrap */
  /* hidden */
  /* md:flex */
  /* sm:block; */
  /* @media (min-width: 640px) { */
  /* display: block; */
  /* } */

  /* @screen sm {
      @apply text-red-600;
    } */
  /* } */

  .small-screen {
    @apply sm:text-left;
  }

  .right-side {
    @apply w-3/4 
		ml-72;
  }
</style>

<TailwindBase />
<main class="small-screen">
  <LeftSideOverview />
  <div class="right-side">
    <slot />
  </div>
</main>
<!-- 
<main>
  <slot />
</main> -->
