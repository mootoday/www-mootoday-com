<script>
  import { headerStore } from "../../stores";

  $: isPositionTop = $headerStore.header.isTransparent;
  $: isPositionBottom = !isPositionTop;
</script>

<style>
  a {
    background-color: var(--primary-color);
    color: #041522;
    font-family: magistral-condensed, sans-serif;
    font-weight: 500;
    font-style: normal;
    right: 1rem;
    transform: translate(0, 5vh);
  }

  a.top {
    transform: translate(0, 5vh);
  }

  a.bottom {
    transform: translate(0, 80vh);
  }

  @screen lg {
    a {
      right: 4rem;
    }
  }
</style>

<a
  href="https://gumroad.com/l/cloud-native-web-development"
  class:top={isPositionTop}
  class:bottom={isPositionBottom}
  class="fixed transform duration-500 ease-in-out z-20 py-2 px-4 md:py-3 md:px-6
  rounded-lg text-xl tracking-widest">
  Buy Now
</a>
