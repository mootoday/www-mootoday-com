<style>
  .wrapper {
    @apply flex-none w-3/12 h-screen m-8
  }

  .bio {
    @apply flex flex-col text-center;
  }

  .name-title {
    @apply font-semibold tracking-widest uppercase;
  }

  h2 {
    @apply text-4xl text-gray-700;
  }

  h3 {
    @apply text-3xl text-gray-500;
  }

  .profile-pic {
    @apply mt-8 mb-8 self-center rounded-full;
  }

  p {
    @apply text-gray-700;
  }

  ul {
    @apply leading-loose mt-4;
  }

  li a {
    @apply text-xl text-gray-800;
  }

  .social-icons {
    @apply flex;
  }
</style>

<div class="wrapper">
  <div>
    <div class="bio">
      <div class="name-title">
        <h2><a href="/">Mike Nikles</a></h2>
        <h3><a href="/">Software Architect</a></h3>
      </div>
      <img class="profile-pic" src="/profile-pic.jpg" alt="Profile picture"/>
    </div>
    <p>I write about software architecture, travel and leadership. Content on this blog is my own and don't represent my former or current employer.</p>

    <ul>
      <li><a href="blog/featured">Featured Posts</a></li>
      <li><a href="blog">Software Architecture</a></li>
      <li><a href="blog">Travel</a></li>
      <li><a href="blog">Leadership</a></li>
    </ul>
  </div>

  <div class="social-icons">
    <a href="https://www.linkedin.com/in/mikenikles/"><img src="" alt="LinkedIn profile"/></a>
    <a href="https://github.com/mikenikles"><img src="" alt="Github profile"/></a>
    <a href="https://twitter.com/mikenikles"><img src="" alt="Twitter profile"/></a>
  </div>
</div>