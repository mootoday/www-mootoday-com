<script>
  import TailwindBase from '../tailwind-base.svelte';
  import LeftSideOverview from '../components/left-side-overview.svelte';
</script>

<style>
  main {
    @apply flex;
  }
</style>

<TailwindBase />
<main>
  <LeftSideOverview />
	<slot></slot>
</main>