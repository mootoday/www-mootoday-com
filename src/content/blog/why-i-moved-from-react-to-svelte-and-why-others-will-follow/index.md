---
title: "Why I moved from React to Svelte and why others will follow"
slug: "why-i-moved-from-react-to-svelte-and-why-others-will-follow"
summary: "A post about my React experience, why Svelte impressed me and code snippets to compare React with Svelte."
createdAt: 2019-12-26T00:00:00.000Z
tags: ["svelte", "development", "web", "react"]
layout: blog
---

<script>
  const assetsBasePath = `/blog/${slug}`;
</script>

Photo by [Aryan Singh](https://unsplash.com/@wuzclicks?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/bird-migration?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## React was my go-to choice for many years

On October 14, 2015, I hosted the [inaugural React Vancouver meetup](https://www.meetup.com/ReactJS-Vancouver-Meetup/events/225362860/). It was at a point were I had used React for the better part of the year and wanted to bring like-minded developers together.

React back then was, dare I say it, revolutionary in the web frontend world. Compared to the alternatives such as jQuery, Backbone.js or Angular 1.x, developing with React felt intuitive, refreshing and productive. Personally, the idea of isolated building blocks (aka components) really appealed to me as it naturally led to a structured, well organized and more maintainable code base.

Over the coming years, I kept a close eye on Angular 2.x+, Vue et al but none felt like a wortwhile choice to jump ship.

## Then I learned about Svelte

I first learned about Svelte in mid 2018, almost a year before version 3.0 was released (see below). "[Computer, build me an app.](https://www.youtube.com/watch?v=qqt6YxAZoOc)" by [Rich Harris](https://twitter.com/Rich_Harris) is what got me hooked on Svelte.

> If you're not familiar with Svelte ([https://svelte.dev/](https://svelte.dev/)), please go to the website and spend 5 minutes reading the intro.

Read it? Really? Excellent 👍

Once I watched the video, the main question in my mind was whether or not it's worth learning Svelte and starting to use it for new or even existing projects. In all fairness, Svelte impressed me but it still wasn't enough to embrace it fully.

## Svelte 3.x

April 22, 2019 - [Svelte 3: Rethinking reactivity](https://svelte.dev/blog/svelte-3-rethinking-reactivity) was the blog post I had been waiting for.

> Please take some time to read the blog post and [watch the video](https://www.youtube.com/watch?v=AdNJ3fydeao) - it's about spreadsheets but I promise it's fun 😉

Why was this such a big deal? For one, the Svelte team had been talking about version 3 quite a bit and I wanted to see it in action. On the other hand, Svelte and its promise excited me even more than React did when first I heard of it.

I mentored web developers at that time and had spent quite a bit of time bringing them up to speed on React. Things like JSX, CSS-in-JS, Redux, create-react-app, SSR and other concepts needed to be learned, understood and to a certain degree mastered in order to develop React apps.

> **None of that was necessary with Svelte.**

```svelte
<script>
  let name = 'world';
</script>

<style>
  h1 {
    color: blue;
  }
</style>

<h1>Hello {name}!</h1>
```

App.svelte

Simple enough? I agree. In fact, it is so simple I recommend it to my mentees who are new to web development.

### Real quick, what's going on in that code?

The `script` tag is where the component's logic lives.

The `style` tag defines this component's CSS - none of this leaks outside the component, so we can safely use `h1` and it only applies to this component. It's real CSS, not a Javascript object that pretends to be CSS or a string literal that pretends to be CSS.

At the bottom is the component's HTML. Use variables with `{myVariable}`. Compared to React's JSX, Svelte allows you to use the correct HTML tags such as `for`, `class` instead of `forHtml` and `className`. See "[Differencs In Attributes](https://reactjs.org/docs/dom-elements.html#differences-in-attributes)" in the React documentation for a list of all attributes that are not standard HTML.

## Let's rebuild React examples

To give you an idea of what Svelte looks like compared to React, let's rebuild what's listed on [https://reactjs.org/](https://reactjs.org/).

### A Simple Component

See the code snippet above.

### A Stateful Component

[Interactive demo](https://svelte.dev/repl/6e9ef214ae774287b21f902d7e6f0e68?version=3.16.6)

```svelte
<script>
  let seconds = 0;
  setInterval(() => seconds += 1, 1000);
</script>

Seconds: {seconds}
```

App.svelte

React: 33 lines  
Svelte: 6 lines

### An Application

[Interactive demo](https://svelte.dev/repl/817d413fd6c344bf859f0dbf8063de2f?version=3.16.6)

```svelte
<script>
  import TodoList from './TodoList.svelte';
	
  let items = [];
  let text = '';
	
  const handleSubmit = () => {
    if (!text.length) {
      return
    }
    const newItem = {
      text,
      id: Date.now(),
    };
    items = items.concat(newItem);
  }
</script>

<div>
  <h3>TODO</h3>
  <TodoList {items} />
  <form on:submit|preventDefault={handleSubmit}>
    <label for="new-todo">
      What needs to be done?
    </label>
    <input
      id="new-todo"
      bind:value={text}
      />
    <button>
      Add #{items.length + 1}
    </button>
  </form>
</div>
```

App.svelte

```svelte
<script>
  export let items = [];
</script>

<ul>
  {#each items as item}
    <li key={item.id}>{item.text}</li>
  {/each}
</ul>
```

TodoList.svelte

React: 66 lines  
Svelte: 43 lines

### A component Using External Plugins

[Interactive demo](https://svelte.dev/repl/28f4b2e36e4244b8b23cae3d584c4c88?version=3.16.6)

```svelte
<script>
  const md = new window.remarkable.Remarkable();
  let value = 'Hello, **world**!';
</script>

<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.0/remarkable.min.js"></script>
</svelte:head>

<div className="MarkdownEditor">
  <h3>Input</h3>
  <label htmlFor="markdown-content">
    Enter some markdown
  </label>
  <textarea
    id="markdown-content"
    bind:value={value}
  />
  <h3>Output</h3>
  <div
    className="content">
      {@html md.render(value)}
  </div>
</div>
```

App.svelte

React: 42 lines  
Svelte: 24 lines

> Less code = fewer bugs  
> Less code = better performance = better user experience  
> Less code = less maintenance = more time to develop features

## What else do I like about Svelte?

### Reactivity

Another powerful feature is _[reactive declarations](https://svelte.dev/tutorial/reactive-declarations)_. Let's start with an example:

```svelte
<script>
  let count = 0;
  $: doubled = count * 2;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

Svelte's reactive declarations

Whenever you have variables that depend on other variables, declare them with `$: myVariable = [code that references other variables]`. Above, whenever `count` changes, `doubled` gets recalculated automatically and the UI updates to reflect the new value.

### Stores

In cases where state needs to be shared across components, Svelte provides the concept of stores. [The tutorial explains stores well](https://svelte.dev/tutorial/auto-subscriptions). No need to read lengthy tutorials - stores are that simple.

**Derived stores**

Often, one store depends on other stores. This is where Svelte provides `derived()` to combine stores. [See the tutorial for details](https://svelte.dev/tutorial/derived-stores).

### Await as a logic block

Alright, this one is a quite elegant. Let's start with the code ([interactive demo](https://svelte.dev/repl/b9fc662a253443dc901ff189ce1cdd4b?version=3.16.7)):

```svelte
<script>
  let githubRepoInfoPromise;
  let repoName = 'mikenikles/ghost-v3-google-cloud-storage';

  const loadRepoInfo = async () => {
    const response = await fetch(`https://api.github.com/repos/${repoName}`);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  }
	
  const handleClick = () => {
    githubRepoInfoPromise = loadRepoInfo();
  }
</script>

<input type="text" placeholder="user/repo" bind:value={repoName} />
<button on:click={handleClick}>
  load Github repo info
</button>

{#await githubRepoInfoPromise}
  <p>...loading</p>
{:then apiResponse}
  <p>{apiResponse ? `${apiResponse.full_name} is written in ${apiResponse.language}` : ''}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
```

See the `#await` block in the HTML? In a real-world application, you'd have a Loading component, an error component and the actual component to render the API response in this case. Try to enter an invalid repo name in the text box to trigger the error case.

## "But wait, what about..."

### open source components?

The main response I get when I introduce Svelte to someone is "but what about the ecosystem, components, tutorials, tools, etc?"

Yes, there are nowhere near as many open source Svelte components as there are components for React. Having said that though, how often do you take an open source React component and integrate it without any issues or unnecessary overhead? I'd argue many of us in the Javascript community have become too reliant on `npm install ...` to piece together a web application. Often building your own components, especially in Svelte, leads to less time spent overall. I have no data to proof that, it's base on my personal experience.

Related though, there is a growing list of Svelte components for anyone who sees comfort in reusing open source components.

### finding a job?

Plenty of opportunities, see [https://sveltejobs.dev/](https://sveltejobs.dev/). Apple's Fraud Engineering team is [looking for a Svelte developer](https://sveltejobs.dev/jobs/apple-senior-front-end-developer) (as of December 2019).

Also remember, the competition is much smaller compared to applying for a job that requires React, Vue, Angular, etc.

## And then, there's Sapper to deploy Svelte apps

Developing an app is only a piece of the full cake - the app also needs to be deployed. For this, the Svelte team provides [Sapper](https://sapper.svelte.dev/). That's an entire post in itself, so for now please have a look at the website for details.

## Conclusion

That brings me to the second part of this blog's title, "why others will follow." Every day, new web developers start their journey and the first thing many hit is an uncertainty of what to learn first. I say the future is about simplicity, quick time to market and I can't think of anything simpler and quicker than this:

```svelte
<script>
  let name = 'world';
</script>

<style>
  h1 {
    color: blue;
  }
</style>

<h1>Hello {name}!</h1>
```

Do hit me up on Twitter [@mikenikles](https://twitter.com/mikenikles/status/1210185500159594496) with your feedback.

👋