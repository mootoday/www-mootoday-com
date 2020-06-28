<script>
  import AboutTheBook from "../../components/cloud-native-web-development/about-the-book.svelte";
  import BuyButton from "../../components/cloud-native-web-development/buy-button.svelte";
  import Chapters from "../../components/cloud-native-web-development/chapters.svelte";
  import Reviews from "../../components/cloud-native-web-development/reviews.svelte";
  import SeoHead from "../../components/seo/head.svelte";
  import Stats from "../../components/cloud-native-web-development/stats.svelte";
  import Subscribe from "../../components/subscribe.svelte";
  import Author from "../../components/cloud-native-web-development/author.svelte";
  import { headerStore } from "../../stores";

  const description = "A hands-on guidebook that leads you through the process of creating a cloud-native web application from scratch.";
  const image = "https://www.mikenikles.com/cloud-native-web-development/cloud-native-web-development-mikenikles-2000.jpg";
  const imageAlt = "Cloud Native Web Development Book Cover";
  const keywords = "cloud, google, google cloud platform, cloud-native, web, web development, book, svelte, sapper, tailwind css, firebase, cypress, cloud firestore, nodejs, node.js, cloud run, testing, end-to-end tests";
  const title = "Cloud Native Web Development - From zero to production: A hands-on guidebook";

  const nameAction = (node) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.top > 0) {
          headerStore.setHeaderTransparent(true);
        } else {
          headerStore.setHeaderTransparent(entry.isIntersecting);
        }
      });
    });

    observer.observe(node);

    return {
      destroy() {
        headerStore.setHeaderTransparent(false);
        observer.disconnect();
      },
    };
  };
</script>

<style>
  .wrapper {
    --primary-color: #e6e051;
    --secondary-color: #83fcfc;
  }

  .wrapper :global(h1) {
    font-family: magistral-condensed, sans-serif;
    font-style: normal;
    font-weight: 500;
    color: var(--primary-color);
  }

  .wrapper :global(h2) {
    font-family: magistral-condensed, sans-serif;
    font-style: normal;
    font-weight: 400;
    color: var(--primary-color);
  }

  .wrapper .subscribe :global(.container) {
    background-color: #041522;
    border-color: #082134;
    @apply border-t-2;
  }

  .wrapper .subscribe :global(h3) {
    @apply text-white;
  }

  .intro .description {
    font-family: industry, sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .wrapper :global(p) {
    font-family: "Open Sans", sans-serif;
  }

  .intro {
    background-image: url("/cloud-native-web-development/cloud-native-web-development-bg-2000-medium.jpg");
  }

  .colored-bg {
    background-color: #082134;
  }

  .intro .author {
    font-family: magistral, sans-serif;
    font-style: normal;
    font-weight: 300;
    color: var(--primary-color);
  }

  @screen md {
    .wrapper :global(ul) {
      @apply text-lg;
    }
  }

  @screen lg {
    .intro h1 {
      font-size: 5rem;
    }
  }
</style>

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
    @import url("https://use.typekit.net/iuz8ejq.css");
  </style>
</svelte:head>

<SeoHead {description} {image} {imageAlt} {keywords} {title} />
<div class="wrapper max-w-6xl mx-auto text-white">
  <BuyButton />

  <!-- Intro - The Book Cover -->
  <section
    class="intro subpixel-antialiased flex flex-col justify-between h-screen
    bg-center bg-cover bg-top w-full">
    <div class="flex justify-center pt-24">
      <div class="m-5 md:m-8 lg:m-10">
        <h1 class="flex flex-col text-4xl md:text-6xl tracking-wide">
          <span>Cloud Native</span>
          <span>Web Development</span>
        </h1>
        <p class="description text-base md:text-xl lg:text-2xl tracking-widest">
          From zero to production: A hands-on guidebook
        </p>
      </div>
    </div>
    <p
      use:nameAction
      class="author self-end m-6 md:m-10 tracking-widest text-2xl md:text-3xl">
      Mike Nikles
    </p>
  </section>

  <!-- About The Book -->
  <section class="w-full px-6 pt-8 md:p-24">
    <h2 class="text-2xl md:text-4xl uppercase mb-4 pt-4 tracking-widest">
      About the book
    </h2>
    <AboutTheBook />
  </section>

  <!-- Reviews -->
  <section class="colored-bg w-full px-6 pt-8 md:p-24">
    <h2 class="text-2xl md:text-4xl uppercase mb-4 tracking-widest">Reviews</h2>
    <Reviews />
  </section>

  <!-- Chapters -->
  <section class="w-full px-6 pt-8 md:p-24">
    <h2 class="text-2xl md:text-4xl uppercase mb-4 tracking-widest">
      Chapters
    </h2>
    <Chapters />
  </section>

  <section>
    <Stats />
  </section>

  <!-- The author -->
  <section class="w-full px-6 py-8 md:p-24">
    <Author />
  </section>

  <section class="subscribe">
    <Subscribe />
  </section>
</div>
