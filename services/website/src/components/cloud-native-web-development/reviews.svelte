<script>
  import Review from "./review.svelte";

  const reviews = [{
    content: "You’re producing really high quality content with this book! I think it’s a good sign that I can’t stop reading and I don’t have to force myself to try out all the stuff, which is actually the problem of most technical hands-on books. Also, even if you work with a different techstack, the concept applies anyways. I already had some takeaways which I brought to my company, especially from all those little sidenotes.",
    name: "Thomas Niedermaier",
    title: "Fullstack Engineer"
  }, {
    content: "I was very pleased to read through your book and enjoyed the content. Really like the diagram pictures and love the easiness to follow everything.",
    name: "Mihai Oprea",
    title: "Customer Engineer, Google"
  // }, {
  //   content: "",
  //   name: "Rock Hu",
  //   title: "Software Engineer, Grammarly"
  }, {
    content: "Enjoyed reading your analysis for major design decisions and recommendations. In addition highlighting Google Firebase product with concrete use cases, like feature toggling for example, will be highly appreciated by developers!",
    name: "Andrey Feldman",
    title: "Customer Engineer, Google"
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
