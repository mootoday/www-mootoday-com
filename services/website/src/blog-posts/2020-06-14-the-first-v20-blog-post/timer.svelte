<script>
  import { onMount } from "svelte";

  let seconds = 0;

  onMount(() => {
    setInterval(() => {
      seconds++;
    }, 1000);
  });
</script>

<p>You have been here for {seconds} {seconds === 1 ? "second" : "seconds"}.</p>
