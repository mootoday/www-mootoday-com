<script>
  import TailwindBase from "../tailwind-base.svelte";
  import LeftSideOverview from "../components/left-side-overview.svelte";
</script>

<style>
  .small-screen {
    @apply m-auto
    antialiased
    text-gray-900
    flex-wrap
    flex;
  }

  .large-screen {
    @apply hidden
     m-auto
     max-w-6xl;
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
