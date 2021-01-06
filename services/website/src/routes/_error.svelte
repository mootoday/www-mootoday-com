<script>
  import Footer from "../components/footer.svelte";
  import Header from "../components/header/index.svelte";
  import { headerStore } from "../stores";

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
  const title =
    status === 500 ? "Updates available..." : "Don't worry, we can fix this.";

  headerStore.setHeaderTransparent(false);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div
  class="flex flex-col min-h-screen bg-gray-200 font-sans leading-normal
  tracking-normal">
  <Header isSearchVisible={false} />
  <section class="flex-grow text-gray-700 body-font">
    <div
      class="container mx-auto flex px-5 py-24 items-center justify-center
      flex-col">
      <div class="text-center lg:w-2/3 w-full">
        <h1
          class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          {#if status === 500}
            🎉 A new version is available
          {:else}Error: {status} {error.message}{/if}
        </h1>

        {#if status === 500}
          <div class="flex justify-center">
            <a href="/"
              class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6
              focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Click here to update the site
            </a>
          </div>
        {/if}

        {#if dev && error.stack}
          <pre class="mb-8 leading-relaxed">{error.stack}</pre>
        {/if}

      </div>
    </div>
  </section>
  <Footer />
</div>
