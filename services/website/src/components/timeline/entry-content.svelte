<script>
  import { formatRelative } from "date-fns";

  export let entry;
</script>

<p>{formatRelative(entry.timestamp, Date.now())}</p>
<p>{entry.milestone}</p>
<p>{entry.cta}</p>
<p>{entry.link}</p>
