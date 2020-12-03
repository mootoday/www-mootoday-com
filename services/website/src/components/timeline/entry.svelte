<script>
  export let entry;
  export let isSelfPositionEnd = false;
</script>

<style>
  .isSelfPositionEnd {
    @apply self-end;
  }
</style>

<div class:isSelfPositionEnd class="w-1/2">
  <p>{entry.timestamp}</p>
  <p>{entry.label}</p>
  <p>{entry.milestone}</p>
  <p>{entry.cta}</p>
  <p>{entry.link}</p>
</div>
