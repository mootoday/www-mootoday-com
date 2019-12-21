<script>
  import TailwindBase from "../tailwind-base.svelte";
  import GoogleAnalytics from "../components/google-analytics.svelte";
  import Header from "../components/header.svelte";
  import Footer from "../components/footer.svelte";
</script>

<style>
  main {
    @apply antialiased;
    max-width: 72rem;
    margin: auto;
  }
</style>

<GoogleAnalytics />
<TailwindBase />

<main>
  <Header />
  <slot />
  <Footer />
</main>
