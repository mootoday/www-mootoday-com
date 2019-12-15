<script>
  import TailwindBase from "../tailwind-base.svelte";
  import GoogleAnalytics from "../components/google-analytics.svelte";
  import Header from "../components/header.svelte";
  import Footer from "../components/footer.svelte";
</script>

<style>
  .small-screen {
    @apply m-auto
    antialiased
    text-gray-900
    flex-wrap
    flex;
    padding-top: 64px;
  }

  .large-screen {
    @apply hidden
     /* antialiased */
     m-auto
    max-w-6xl;
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

<GoogleAnalytics />
<TailwindBase />
<main class="large-screen">
  <slot />
</main>

<main class="small-screen">
  <Header />
  <slot />
  <Footer />
</main>
