<style>
  .bio {
    @apply flex 
    py-4
    px-5
    items-center;
  }

  .profile-pic {
    @apply my-3
    self-center 
    rounded-full
    w-20;
  }

  p {
    @apply text-gray-700 
    text-sm
    ml-4
    leading-tight;
  }

  @screen sm {
    p {
      @apply text-base;
    }
  }

  @screen md {
    .bio {
      @apply px-16;
    }

    p {
      @apply ml-8
      leading-normal
      tracking-wide;
    }
  }
  @screen lg {
    .bio {
      @apply hidden;
    }
  }
</style>

<div class="bio">
  <img class="profile-pic" src="/profile-pic.jpg" alt="Profile picture" />
  <p>
    I write about software architecture, travel and leadership. Content on this
    blog is my own and don't represent my former or current employer.
  </p>
</div>
