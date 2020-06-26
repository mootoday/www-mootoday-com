<script>
  import AboutTheBook from "../../components/cloud-native-web-development/about-the-book.svelte";
  import Chapters from "../../components/cloud-native-web-development/chapters.svelte";
  import Footer from "../../components/footer.svelte";
  import Reviews from "../../components/cloud-native-web-development/reviews.svelte";
</script>

<style>
  h2 {
    @apply text-4xl uppercase;
  }
</style>

<div>
  <div class="pt-16 md:pt-32">
    <div class="w-full">
      <h2>About the book</h2>
      <AboutTheBook />
    </div>
  </div>

  <div class="w-full">
    <h2>Reviews</h2>
    <Reviews />
  </div>

  <!-- Chapters -->
  <div class="w-full">
    <h2>Chapters</h2>
    <Chapters />
  </div>

  <!-- The author -->
  <div>
    <h2>The author</h2>
    <p>
      Mike is a software architect who started his career right at the peak of
      the dot-com bubble in summer of 2000. He currently works at Google,
      advising enterprise customers on their journey to the Cloud.
    </p>
    <p>
      He focuses on cloud native web development, best practices, productivity
      and team morale.
    </p>
    <p>
      He shares his thoughts at
      <a href="https://www.mikenikles.com">www.mikenikles.com</a>
      (previously on Medium at https://medium.com/@mikenikles) and can also be
      found on Twitter
      <a href="https://www.twitter.com/@mikenikles">@mikenikles</a>
      .
    </p>
  </div>
  <Footer />
</div>
