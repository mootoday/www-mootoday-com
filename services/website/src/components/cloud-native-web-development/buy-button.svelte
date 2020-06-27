<script>
  import { headerStore } from "../../stores";

  $: isPositionTop = $headerStore.header.isTransparent;
  $: isPositionBottom = !isPositionTop;
</script>

<style>
  span {
    background-color: #e6e051;
    color: #041522;
    font-family: magistral-condensed, sans-serif;
    font-weight: 500;
    font-style: normal;
    right: 1rem;
  }

  span.top {
    top: 1rem;
  }

  span.bottom {
    bottom: 1rem;
  }

  @screen lg {
    span {
      right: 4rem;
    }

    span.bottom {
      bottom: 4rem;
    }

    span.top {
      top: 4rem;
    }
  }
</style>

<span
  class:top={isPositionTop}
  class:bottom={isPositionBottom}
  class="fixed block z-20 py-2 px-4 md:py-3 md:px-6 rounded-lg
  text-xl tracking-widest">
  <a href="https://gumroad.com/l/cloud-native-web-development">Buy Now</a>
</span>
