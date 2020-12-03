<script>
  import EntryContent from "./entry-content.svelte";

  export let entry;
  export let isOddChild;
</script>

<style>
  div {
    @apply px-2;
  }

  .circle {
    @apply -ml-5;
  }

  .triangle {
    @apply ml-4 -mr-5;
  }

  @screen md {
    div {
      @apply px-0;
    }

    .circle {
      @apply -ml-5;
    }
    
    .odd .circle {
      @apply -mr-5;
    }

    .triangle {
      @apply ml-4 -mr-5;
    }

    .odd .triangle {
      @apply -ml-5 mr-9;
    }
  }
</style>

<div class:odd={isOddChild} class="flex w-full md:odd:justify-start md:even:self-end md:odd:flex-row-reverse md:w-1/2">
  <span class="circle hidden md:block z-10 self-center bg-white rounded-full h-10 w-10 border-4 border-{entry.label}"></span>
  <span class="triangle hidden md:block transform rotate-45 self-center h-10 w-10 bg-{entry.label}"></span>
  <EntryContent {entry} />
</div>
