<script>
  import TailwindBase from "../tailwind-base.svelte";
  import LeftSideOverview from "../components/left-side-overview.svelte";
</script>

<style>
  .small-screen {
    @apply max-w-6xl
    m-auto
    antialiased
    text-gray-900
    flex-wrap;
  }

  .large-screen {
    @apply hidden;
  }

  .right-side {
    @apply w-3/4 
		ml-72;
  }

  @screen lg {
    .large-screen {
      @apply block;
    }

    .small-screen {
      @apply hidden;
    }
  }
</style>

<TailwindBase />
<main class="large-screen">
  <LeftSideOverview />
  <div class="right-side">
    <slot />
  </div>
</main>

<main class="small-screen">
  <slot />
</main>