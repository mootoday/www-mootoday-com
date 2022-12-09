<style>
  .colored-bg {
    background-color: #082134;
  }

  h3 {
    color: var(--primary-color);
    font-family: industry, sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .card-bg {
    background-color: #041522;
  }

  .number {
    color: var(--secondary-color);
  }
</style>

<div class="wrapper colored-bg pt-12 sm:pt-16">
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <h3 class="text-3xl leading-9 font-extrabold sm:text-4xl sm:leading-10">
        A book, source code & a community
      </h3>
      <p class="mt-3 text-xl leading-7 text-white sm:mt-4">
        Be part of a community with other readers. Review & discuss source
        code. Ask questions.
      </p>
    </div>
  </div>
  <div class="mt-10 pb-12 sm:pb-16">
    <div class="relative">
      <div class="absolute inset-0 h-1/2 bg-gray-50" />
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <dl class="rounded-lg shadow-lg sm:grid sm:grid-cols-3">
            <div
              class="card-bg flex flex-col border-b p-6
              text-center sm:border-0 sm:border-r">
              <dt
                class="order-2 mt-2 text-lg leading-6 font-medium text-white"
                id="stats-pages">
                Pages
              </dt>
              <dd
                class="number order-1 text-5xl leading-none font-extrabold"
                aria-describedby="stats-pages">
                214
              </dd>
            </div>
            <div
              class="card-bg flex flex-col border-white border-t border-b p-6
              text-center sm:border-0 sm:border-l sm:border-r">
              <dt
                class="order-2 mt-2 text-lg leading-6 font-medium text-white"
                id="stats-chapters">
                Chapters
              </dt>
              <dd
                class="number order-1 text-5xl leading-none font-extrabold"
                aria-describedby="stats-chapters">
                32
              </dd>
            </div>
            <div
              class="card-bg flex flex-col border-gray-500 border-t p-6
              text-center sm:border-0 sm:border-l">
              <dt
                class="order-2 mt-2 text-lg leading-6 font-medium text-white"
                id="stats-pr">
                Pull Requests
              </dt>
              <dd
                class="number order-1 text-5xl leading-none font-extrabold"
                aria-describedby="stats-pr">
                19
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>
