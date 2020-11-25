<script>
  let img;

  const handleBodyClick = event => {
    if (
      event.path[0].nodeName === "IMG" &&
      event.path[0].src.indexOf("/blog-posts/")
    ) {
      img = event.path[0];
    }
  };

  const closeModal = () => {
    img = null;
  };

  const handleBodyKeydown = event => {
    let isEscape = false;
    if ("key" in event) {
      isEscape = event.key === "Escape" || event.key === "Esc";
    } else {
      isEscape = event.keyCode === 27;
    }
    if (isEscape && img) {
      closeModal();
    }
  };
</script>

<svelte:body on:click={handleBodyClick} on:keydown={handleBodyKeydown} />

{#if img}
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div
      on:click={closeModal}
      class="absolute w-full h-full bg-gray-900 opacity-50" />
    <div class="bg-white mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="py-4 text-left px-6">
        <div class="flex justify-end items-center pb-3">
          <button on:click={closeModal} class="cursor-pointer z-50">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18">
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94
                9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </button>
        </div>
        <img src={img.src} alt={img.alt} class="" />
      </div>
    </div>
  </div>
{/if}
