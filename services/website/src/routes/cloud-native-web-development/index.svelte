<script>
  import AboutTheBook from "../../components/cloud-native-web-development/about-the-book.svelte";
  import Chapters from "../../components/cloud-native-web-development/chapters.svelte";
  import Reviews from "../../components/cloud-native-web-development/reviews.svelte";
  import Stats from "../../components/cloud-native-web-development/stats.svelte";
  import { headerStore } from "../../stores";

  const nameAction = (node) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        headerStore.setHeaderTransparent(entry.isIntersecting);
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
  .buy-button {
    background-color: #e6e051;
    color: #041522;
    font-family: magistral-condensed, sans-serif;
    font-weight: 500;
    font-style: normal;
    bottom: 1rem;
    right: 1rem;
  }
  .wrapper :global(h1) {
    font-family: magistral-condensed, sans-serif;
    font-style: normal;
    font-weight: 500;
    color: #e6e051;
  }

  .wrapper :global(h2) {
    font-family: magistral-condensed, sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #e6e051;
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
    background-image: url("/cloud-native-web-development/cloud-native-web-development-bg-2000.jpg");
  }

  .colored-bg {
    background-color: #082134;
  }

  .intro .author {
    font-family: magistral, sans-serif;
    font-style: normal;
    font-weight: 300;
    color: #e6e051;
  }

  .the-author p {
    @apply text-base mb-5 leading-relaxed;
  }

  @screen md {
    .wrapper :global(p) {
      @apply text-lg leading-loose;
    }

    .wrapper :global(ul) {
      @apply text-lg;
    }

    .wrapper .author {
      @apply text-3xl;
    }
  }

  @screen lg {
    .buy-button {
      bottom: 4rem;
      right: 4rem;
    }

    .intro h1 {
      font-size: 5rem;
    }

    .intro .description {
      @apply text-2xl;
    }
  }
</style>

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
    @import url("https://use.typekit.net/iuz8ejq.css");
  </style>
</svelte:head>

<div class="wrapper max-w-6xl mx-auto text-white">
  <span
    class="buy-button fixed block z-20 py-2 px-4 md:py-3 md:px-6 rounded-lg
    text-xl tracking-widest">
    <a href="https://gumroad.com/l/cloud-native-web-development">Buy Now</a>
  </span>

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
        <p class="description text-base tracking-widest">
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
  <section class="the-author w-full px-6 py-8 md:p-24">
    <h2 class="text-2xl md:text-4xl uppercase mb-4 tracking-widest">
      The author
    </h2>
    <p>
      Mike is a software architect who started his career right at the peak of
      the dot-com bubble in summer of 2000. He currently works at Google,
      advising enterprise customers on their journey to the Cloud.
    </p>
    <p>
      He focuses on cloud native web development, best practices, productivity
      and team morale.
    </p>
    <p class="mb-0">
      He shares his thoughts at
      <a href="https://www.mikenikles.com">www.mikenikles.com</a>
      (previously on Medium at https://medium.com/@mikenikles) and can also be
      found on Twitter
      <a href="https://www.twitter.com/@mikenikles">@mikenikles</a>
      .
    </p>
  </section>
</div>
