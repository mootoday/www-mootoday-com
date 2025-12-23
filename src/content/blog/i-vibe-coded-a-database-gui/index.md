---
title: 'I vibe-coded a database GUI'
summary: "It works. It's lightning fast. It took 4 hours. I wouldn't recommend it."
createdAt: 2025-12-23T03:45:22.067Z
featured: false
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

**Key takeaways**

- I kept arguing with vibe-coding experts online, so I needed hands-on experience to have better insights
- In 4 hours, I vibe-coded Seaquel (<a href="https://seaquel.app/" target="_blank">seaquel.app</a>) – the website and desktop app
- It works. It's lightning fast. I wouldn't recommend it

## How did I get here?

If you spend any time online at all these days, you must have come across vibe-coding. Don't ask me to define what it is... Something along the lines of "anyone can create software now, it's awesome, it's beautiful 🌸".

All you need to do is talk to AI (it's not true, it's a large language model (LLM), but AI it is) and it will do all the work. As simple as that. No strings attached.

Needless to say that with two decades of experience in writing software, I'm skeptical at best. However, experience these days doesn't cut it with the hip kids. If your buddy is a vibe coder, your mom uses ChatGPT, and your cat eats its food from an AI-controlled food delivery robot, you better call yourself a vibe coder too.

Unfortunately, none of the above applies to me. So the only path forward to join the vibe-coding conversations online is to do the work and vibe-code a product.

## The promise

As I mentioned, the promise of vibe-coding is that AI (every time I have to write that instead of LLM, I want to close my editor 😅) does all the work. Research, create a plan, write tests, write code, execute the tests, continue to write code until tests pass.

All that is expected from me is to write the prompts, wait, write more prompts, wait a bit more.

Given that, I decided not to look at the generated code. Instead, I would continue to use AI to fix bugs, syntax errors, add features, anything that was required would be done without manual intervention.

## The project

I have never found a SQL client that is fast, lightweight, free, and not bloated with features I don't need. So what better time than now to vibe-code one. For a while now I have had my eyes on <a href="https://tauri.app/" target="_blank">tauri.app</a> and decided to use that, of course with <a href="https://svelte.dev/" target="_blank">SvelteKit</a> for the frontend.

## The initial prompt

To build the frontend, I used <a href="https://svelte0.com/" target="_blank">svelte0.com</a>. Below is the initial prompt:

> Build a database GUI. Requirements:
> 
> - Support multiple database types
> - Support multiple database connections (maybe use tabs so people can switch easily?)
> - For each connected database, show a view of the schema and tables and a separate view for queries
> - Allow people to open multiple table schemas and/or queries
> - Provide a way for people to ask AI questions about their database. For example, to help draft queries, to review / optimize queries, or simply to ask generic questions like "Where is a user's email stored?"
> - Add any other feature that helps this app stand out from other database GUIs

## 15 revisions later

With the initial prompt fired off, I went to eat breakfast 🥐. Upon my return, my laptop had been asleep for a while. Well rested, I woke it up and continued my chat-like conversation with svelte0. Fifteen additional prompts to be exact. That gave me the following UI:

![A screenshot of the first functional Seaquel database GUI]({assetsBasePath}/seaquel-vibe-coded-ui.webp)

It worked, with dummy data of course. It looked decent enough to proceed.

## Getting real

I created a new Tauri project locally and set it up with SvelteKit. Then, I added Tailwind CSS and shadcn-svelte. With that in place, I used the svelte0 CLI command to add the vibe-coded UI to my project. I have to admit, this CLI is incredibly clever! Kudos to who came up with that idea, you're a genius 🫡!

At that point, `npm run tauri dev` fired up a dev version of my database desktop GUI. Nice, I still hadn't written a single line of code.

Next, I needed to replace the dummy data with actual data from a database. I opened Zed (<a href="https://zed.dev/" target="_blank">zed.dev</a>) where I have LLMs (come on man... I mean AI) configured with access to my project. Think Claude, but built by people who have experience building IDEs.

Numerous prompts and about an hour later, it all worked. I was able to paste a connection string, connect to a database, inspect its schema and tables, and run SQL queries.

Two things were missing:

1) A product name and a logo

2) A website

## The product name, logo, and website

Of course, I consulted the AI gods for that. They met behind closed doors, deliberated for a while, and suggested "Sequel". A SEO nightmare, so a friend (whooo an actual human) suggested "Seaquel". As good as anything.

With that in place, AI generated a logo. I took the logo and product name back to <a href="https://svelte0.com/" target="_blank">svelte0.com</a> with the following prompt:

> Build a product landing page for my database desktop app called Seaquel, as in Sequel, as in SQL. It's built with Tauri & SvelteKit, so it's lightning fast, extremely resource efficient, works offline (for local databases), and comes with AI integration to ask questions about the data or help write / improve SQL queries.

The result:

<p class="text-center text-2xl"><a href="https://seaquel.app/" target="_blank">https://seaquel.app</a></p>

## Distribution

The most time-consuming process was getting the app ready for distribution. I needed a DUNS number for my business, an Apple developer account, create private and public keys for code signing, etc. Easy stuff, but tedious.

The is currently available for Apple Silicon. Adding additional operating systems is a matter of building for the given target and actually testing the app on any operating system I claim to support.

## The source code

With all that out of the way, I decided to look at the code. It's available online:

- Website: <a href="https://github.com/webstonehq/seaquel-app" target="_blank">github.com/webstonehq/seaquel-app</a>
- Desktop GUI: <a href="https://github.com/webstonehq/seaquel" target="_blank">github.com/webstonehq/seaquel</a>

The website is quite decent, close to how I would structure and develop it too.

The desktop app, meh. There's a `database.svelte.ts` file (<a href="https://github.com/webstonehq/seaquel/blob/main/src/lib/hooks/database.svelte.ts" target="_blank">source</a>) with 1,007 lines which contains all the business logic. My main beef with it, and that matches exactly what I expected vibe-coded software would look like, is that it's unmaintainable.

Unmaintainable code leads to bugs. Bugs that are hard to debug, hard to fix, and sooner or later cause problems that reach beyond frustration or slow team velocity.

## Conclusion

I already hear the vibe coders among you telling me to continue to use AI to expand the product.

> Maintainability doesn't matter, AI will read and write code.

Nah... I don't buy it. This is awesome for a MVP, but not for anything serious where privacy, security, performance, modularity, efficiency matters.

In addition, onboarding new team members, debugging issues, adding new features all gets increasingly complicated. The winners are AI providers who charge you by the token count 🤑.

I've already heard all the "arguments", but still don't buy it. Ship, ship, ship and if there's a bug, AI will fix it. If there's a memory leak, AI will fix it. If PII data leaks and customers have a problem with that, AI will ... oh wait, no it won't.

👋
