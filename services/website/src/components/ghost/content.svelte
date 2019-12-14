<style>
  .ghost-content {
    @apply mt-8;
  }

  .ghost-content :global(figure.kg-gallery-card) {}

  .ghost-content :global(.kg-gallery-container) {
    @apply flex flex-col;
  }

  .ghost-content :global(.kg-gallery-row:first-child) {
    @apply mt-0;
  }

  .ghost-content :global(.kg-gallery-row) {
    @apply flex flex-row mt-3 justify-center;
  }

  .ghost-content :global(.kg-gallery-image:first-child) {
    @apply ml-0;
  }

  .ghost-content :global(.kg-gallery-image) {
    @apply ml-3;
  }

  .ghost-content :global(figure.kg-gallery-card figcaption) {
    @apply mt-4 text-center;
  }

  .ghost-content :global(h2) {
    @apply text-xl;
  }

  .ghost-content :global(h3) {
    @apply text-lg;
  }

  .ghost-content :global(p) {
    @apply mb-6;
  }

  .ghost-content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .ghost-content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .ghost-content :global(ul) {
    line-height: 1.5;
    @apply list-disc list-outside;
    padding-left: 1.7rem;
  }

  .ghost-content :global(hr) {
    @apply border-b-0 my-10;
  }

  .ghost-content :global(li) {
    margin: 0 0 0.5em 0;
    @apply pl-1;
  }

  .ghost-content :global(figure) {
    @apply my-8;
  }

  .ghost-content :global(img) {
    max-width: 100%;
  }
</style>

<div class="ghost-content">
  <slot />
</div>
