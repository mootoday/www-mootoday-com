<script>
  import Footer from "../components/footer.svelte";
</script>

<style>
  .wrapper-left-side-overview {
    @apply p-8 
    pt-12
    border-r 
    min-h-screen
    w-72
    fixed;
  }

  .name-logo {
    @apply uppercase 
    font-logo-name01 
    text-center 
    font-semibold;
    line-height: 1.25;
  }

  .name {
    @apply text-4xl 
    text-brown-700;
    letter-spacing: 0.08em;
  }

  .title {
    @apply text-brown-500 
    tracking-normal
    text-4xl;
  }

  .bio {
    @apply flex 
    py-4
    flex-col;
  }

  .profile-pic {
    @apply h-24 mt-8 mb-8 self-center rounded-full;
  }

  p {
    @apply text-gray-700 text-base;
  }

  ul {
    @apply leading-loose mt-4;
  }

  li a {
    @apply text-xl text-gray-800;
  }
</style>

<div class="wrapper-left-side-overview">
  <div class="name-logo">
    <a href="/">
      <h1 class="name">Mike Nikles</h1>
      <h1 class="title">SW Architect</h1>
    </a>
  </div>

  <div class="bio">
    <img class="profile-pic" src="/profile-pic.jpg" alt="Profile picture" />
    <p>
      I write about software architecture, travel and leadership. Content on
      this blog is my own and don't represent my former or current employer.
    </p>
  </div>
  <!-- <ul>
    <li>
      <a href="blog/featured">Featured Posts</a>
    </li>
    <li>
      <a href="blog">Software Architecture</a>
    </li>
    <li>
      <a href="blog">Travel</a>
    </li>
    <li>
      <a href="blog">Leadership</a>
    </li>
  </ul> -->
  <Footer />
</div>
