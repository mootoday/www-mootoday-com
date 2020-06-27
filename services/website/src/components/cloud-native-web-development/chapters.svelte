<script>
  import Chapter from "./chapter.svelte";

  // prettier-ignore
  const chapterAboutThisBook = {
    page: 9,
    title: "About this book",
    subtitles: ["The author", "Why write a book?", "What does this book cover?", "Audience", "Source code", "Acknowledgments", "Stay informed"]
  };

  // prettier-ignore
  const chaptersPart1 = [{
    page: 19,
    title: "Topics you will learn",
    subtitles: []
  }, {
    page: 20,
    title: "What is cloud-native?",
    subtitles: []
  }, {
    page: 21,
    title: "Guiding Principles",
    subtitles: ["1. User experience", "2. Team Productivity", "3. Automation"]
  }, {
    page: 26,
    title: "Development Environment",
    subtitles: ["Gitpod.io", "GitHub"]
  }, {
    page: 29,
    title: "Frontend",
    subtitles: ["Svelte", "Tailwind CSS", "Firebase SDK"]
  }, {
    page: 35,
    title: "Backend",
    subtitles: ["Sapper", "Google Cloud Platform"]
  }, {
    page: 44,
    title: "Database",
    subtitles: ["Cloud Firestore"]
  }, {
    page: 46,
    title: "CI / CD",
    subtitles: ["GitHub Actions"]
  }, {
    page: 48,
    title: "Testing",
    subtitles: ["Cypress", "Testing Library"]
  }, {
    page: 56,
    title: "Monorepo",
    subtitles: []
  }, {
    page: 58,
    title: "Summary",
    subtitles: []
  }];

  // prettier-ignore
  const chaptersPart2 = [{
    page: 60,
    title: "Introduction",
    subtitles: []
  }, {
    page: 61,
    title: "Project Overview",
    subtitles: []
  }, {
    page: 62,
    title: "A monorepo template to start with",
    subtitles: ["Monorepo directory structure", "Create a new GitHub project", "Summary"]
  }, {
    page: 65,
    title: "Add the Sapper template",
    subtitles: ["Clone the repository", "Create a new branch", "Add the web service", "Create a pull request", "Summary"]
  }, {
    page: 70,
    title: "Hosting on Firebase",
    subtitles: ["Create a Firebase project", "Set a resource location", "Register your app with Firebase", "Add the Firebase SDK to the web application", "Install the Firebase CLI", "Log in to Firebase", "Initialize Firebase CLI", "Deploy to Firebase Hosting", "Deploy the web application", "Summary"]
  }, {
    page: 85,
    title: "Set up continuous deployment pipeline",
    subtitles: ["Why now? We haven't developed anything yet", "GitHub Actions", "Set up GitHub Actions", "Test the new workflow", "Summary"]
  }, {
    page: 92,
    title: "Local Development",
    subtitles: []
  }, {
    page: 95,
    title: "Feature Toggles",
    subtitles: ["What are feature toggles?", "Feature toggles to release unfinished code", "Firebase Remote Config", "Set up our first feature toggle", "Configure feature toggles", "Summary"]
  }, {
    page: 107,
    title: "Production Monitoring",
    subtitles: ["Create an uptime check", "Create an alert policy", "Summary"]
  }, {
    page: 111,
    title: "Rollbacks",
    subtitles: ["Fix Forward", "Summary"]
  }, {
    page: 112,
    title: "Testing",
    subtitles: ["End-to-end tests", "Component tests", "Use Testing Library", "Generate product videos", "Cypress Dashboard", "Enable tests in the continuous integration pipeline", "Summary"]
  }, {
    page: 135,
    title: "Tailwind CSS",
    subtitles: ["Initialize & configure", "Create a Tailwind CSS component", "Use Tailwind CSS in Svelte components", "Component libraries", "Summary"]
  }, {
    page: 142,
    title: "User authentication",
    subtitles: ["Configure Firebase Authentication", "Configure Firebase UI", "Create the login page", "Create the admin page", "Use a Svelte store to keep track of the current user", "Keep the user store updated", "Sign In vs Sign Out navbar item", "Secure the admin page", "Redirect once authenticated", "Enable additional sign-in providers", "Summary"]
  }, {
    page: 156,
    title: "Database - Cloud Firestore",
    subtitles: ["Create a Firestore instance", "Structure data", "Configure Firestore", "Create a user interface to write data", "Write data", "Read data", "Clean up", "Fix tests", "Security Rules", "Summary"]
  }, {
    page: 174,
    title: "Firebase Local Emulator Suite",
    subtitles: ["Initialize the emulators", "Configure the web application to use emulators locally", "Start the emulators in development", "Fix tests", "Summary"]
  }, {
    page: 183,
    title: "Trigger services based on events",
    subtitles: ["Initialize Firebase Cloud Functions", "Test the default Cloud Function locally", "Develop the new service placeholder", "Develop the integration with DEV", "Test the new service", "Convert Markdown to HTML", "Write tests for the service", "Deploy the new service", "Summary"]
  }, {
    page: 206,
    title: "Speed up CI / CD",
    subtitles: ["Summary"]
  }, {
    page: 209,
    title: "Connect a custom domain",
    subtitles: []
  }, {
    page: 210,
    title: "That's a wrap!",
    subtitles: []
  }, {
    page: 211,
    title: "What's next? Web development in 2025",
    subtitles: ["Distributed static page generation", "Web & IoT", "Upcoming personal projects"]
  }];
</script>

<style>
p span{
    font-family: magistral-condensed, sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #e6e051;
}
</style>

<div>
  <div>
    <Chapter chapter={chapterAboutThisBook} />
  </div>
  <div>
    <p class="pt-8 pb-5"><span class="text-2xl md:text-3xl tracking-wide">Part 1: Technologies, tools & processes</span></p>
    {#each chaptersPart1 as chapter}
      <Chapter {chapter} />
    {/each}
  </div>
  <div>
    <p class="pt-8 pb-5"><span class="text-2xl md:text-3xl tracking-wide">Part 2: Develop a foundation</span></p>
    {#each chaptersPart2 as chapter}
      <Chapter {chapter} />
    {/each}
  </div>
</div>
