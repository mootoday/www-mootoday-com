<script>
  import Content from "./about-the-book-content.svx";
</script>

<style>
  div :global(ul) {
    @apply list-disc text-base ml-6;
  }

  div :global(li) {
    @apply mb-2;
  }

  div :global(p) {
    @apply text-base mb-5 leading-relaxed;
  }

  div :global(a){
      @apply font-semibold;
      color: #83fcfc;
  }

  div :global(a:hover){
      @apply underline;
  }

@screen md {
   div :global(p) {
      @apply text-lg leading-loose;
    }
}
</style>

<div>
  <Content />
</div>
