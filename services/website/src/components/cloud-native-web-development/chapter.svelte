<script>
  export let chapter;
</script>

<style>
  .page {
    color: #e6e051;
  }
</style>

<div class="flex mb-4">
  <div class="w-1/6">
    <p class="page">{chapter.page}</p>
  </div>
  <div class="w-5/6">
    <p class="text-lg">{chapter.title}</p>
    <p class="text-sm">{chapter.subtitles.join(" • ")}</p>
  </div>
</div>