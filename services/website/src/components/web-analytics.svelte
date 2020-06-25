<!-- Chiffre.io - Privacy-first analytics -->
{@html `
  <script id="chiffre:analytics-config" type="application/json">
    {
      "publicKey": "pk.LgoXBSKhG225yGIzbTXiZyyfmis2ZBA4JJhN7XqS0nY",
      "pushURL": "https://push.chiffre.io/event/31cUlsf71GIpwH24"
    }
  </script>
`}

<svelte:head>
<script
  src="https://embed.chiffre.io/analytics.js"
  crossorigin="anonymous"
  async=""
>
</script>
</svelte:head>
<noscript>
  <img
    src="https://push.chiffre.io/noscript/31cUlsf71GIpwH24"
    alt="Chiffre.io anonymous visit counting for clients without JavaScript"
    crossorigin="anonymous"
    width="1px"
    height="1px"
    style="display:none"
  />
</noscript>