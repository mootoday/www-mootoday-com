<script>
  import TailwindBase from "../tailwind-base.svelte";
  import LeftSideOverview from "../components/left-side-overview.svelte";
</script>

<style>
  main {
    @apply flex 
    max-w-6xl
    m-auto
    antialiased
    text-gray-900
    flex-wrap;
  }
  .right-side {
    @apply w-3/4 
		ml-72;
  }
</style>

<TailwindBase />
<main>
  <LeftSideOverview />
  <div class="right-side">
    <slot />
  </div>
</main>
