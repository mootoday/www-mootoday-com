<script>
  export let href;

  // Ignore $$scope and $$slots, store the remaining props as `hrefProps`
  const {$$scope: x, $$slots: y, ...hrefProps} = $$props;

  if (href.startsWith("http")) {
    hrefProps.rel = "noopener"
  } else {
    hrefProps.rel = "prefetch"
  }
</script>

<a href={hrefProps.href} {...hrefProps}><slot /></a>