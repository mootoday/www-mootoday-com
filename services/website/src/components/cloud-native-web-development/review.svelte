<script>
  export let review;
</script>

<style>
.wrapper {
    border-color:#041522;
}

</style>

<div class="wrapper py-12 px-4 border-t-2 sm:px-6 md:py-14 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-14 md:flex md:flex-col">
  <blockquote class="px-6 mt-8 md:flex-grow md:flex md:flex-col">
    <div class="relative text-lg leading-7 font-medium md:flex-grow">
      <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8" fill="#005072" viewBox="0 0 32 32">
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
      <p class="relative">
        {review.content}
      </p>
    </div>
    <footer class="mt-8">
      <div class="flex justify-end">
        <div>
          <div class="text-base leading-6 font-medium">{review.name}
          </div>
          <!-- <div class="text-base leading-6 font-medium text-indigo-200">
          <a href="{review.socialMediaLink}">{review.socialMediaLink}</a>
          </div> -->
        </div>
      </div>
    </footer>
  </blockquote>
</div>
