<script>
  export let number;
  export let locale = "en";
  
  $: formattedNumber = number.toLocaleString(locale, {
    notation: "compact",
    compactDisplay: "short",
  });
</script>

<style>
  span {
    font-variant-numeric: tabular-nums;
  }
</style>

<span>{formattedNumber}</span>