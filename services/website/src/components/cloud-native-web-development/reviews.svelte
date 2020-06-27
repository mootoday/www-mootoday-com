<script>
  import Review from "./review.svelte";

  const reviews = [{
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos iste, alias facere quae provident aperiam, ab, modi consectetur molestiae rem dolore? Expedita facilis perspiciatis, harum minima excepturi et incidunt officiis?",
    name: "Hanna Choi",
    socialMediaLink: "https://www.github.com/hannac222"
  }, {
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos iste, alias facere quae provident aperiam, ab, modi consectetur molestiae rem dolore?",
    name: "Someone else",
    socialMediaLink: "https://www.twitter.com/someoneelse"
  }, {
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos iste, alias facere quae provident aperiam, ab, modi",
    name: "Me or you",
    socialMediaLink: "https://www.linkedin.com/in/meoryou"
  }];
</script>

<style>
div {
background-color: #082134;
}
</style>

<div class="max-w-screen-xl mx-auto lg:grid lg:grid-cols-3">
{#each reviews as review}
  <Review {review} />
{/each}
</div>
