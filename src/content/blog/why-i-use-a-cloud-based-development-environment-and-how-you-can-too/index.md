---
title: 'Why I use a cloud-based development environment and how you can too'
slug: 'why-i-use-a-cloud-based-development-environment-and-how-you-can-too'
summary: 'JBuilder, Eclipse, WebStorm, Atom, VS Code - The evolution of my development IDEs before I moved to the cloud. Learn why I did and how you can too!'
createdAt: 2020-03-31T00:00:00.000Z
tags: ['development', 'cloud']
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

<!-- Photo by myself, [Sulsseeli](https://goo.gl/maps/tezxpewfmSGkNFme6) in Switzerland -->

## CPU, Memory & Storage on a laptop

I'm coming up to two decades since I started my career in software engineering and it's an understatement to say things have changed... 👴

The choice of integrated development environments, or IDEs for short, as a junior software engineer were somewhat limited. I personally was too new to have an opinion and often used what co-workers used to develop Java applications - [Borland's JBuilder](https://en.wikipedia.org/wiki/JBuilder).

You better had a beefy machine to run this thing smoothly 💪. Over the years, IDEs continued to be fairly CPU & memory intensive. To support a more or less productive work style, it could result in purchasing a new laptop every two or three years.  
In parallel, developing software required an increased storage capacity - initially because of `*.jar` file dependencies in the Java world and more recently due to `node_modules` directories that can quickly take up large amounts of disk space as illustrated in the following, academically absolutely correct (_not_) image:

![A comparison of the universe's heaviest objects]({assetsBasePath}/1.jpg)

A comparison of the universe's heaviest objects

This too led to a need to purchase better hardware. That all was fine "back then", but it's 2020 as of the time of this writing and I don't see a need to pay a lot of money to purchase a top-of-the-market laptop.

## ☁️, ☁️, ☁️ - Everything is in the ☁️

As the software world embraced cloud environments to deploy and run applications, one aspect seemingly was forgotten... IDEs.

I'm a Chromebook user - have been for a year and a half and will continue to be (AMA if you're curious why)! While I can install [VS Code](https://code.visualstudio.com/) - my editor of choice - on a Chromebook thanks to its linux support, I couldn't find an answer to "Why?". Why would I develop locally when in the end, the applications I work on run in the cloud? Why would I want to carry my laptop everywhere I want to write code?

There have been solutions to run an IDE in the cloud for some time. I remember Cloud9, then experimented with [code-server](https://github.com/cdr/code-server) before I settled on [www.gitpod.io](https://www.gitpod.io/).

> **Are You Ready-To-Code?** Start Instantly. Anywhere.  
> Gitpod launches ready-to-code dev environments for your GitHub or GitLab project with a single click.

Gitpod is based on the online IDE [Theia](https://theia-ide.org/), which very recently [launched version 1.0](https://dev.to/svenefftinge/theia-1-0-finally-a-good-browser-ide-3ok0) 🎉!

## Why Gitpod?

A core principle of mine is productivity. Anything I can automate, I automate. Anything I can get rid of, I get rid of. Anything I can outsource, I outsource. If I can drop my local development environment, I do so. As soon as you work in a team, all your effort of setting up a local development environment instantly multiplies by the number of team members. I'd much rather not have to deal with that for every new team member that joins and have them started with a fully functioning development environment within minutes. Who's worked in a team where the most recent developer who joins updates the "Development environment setup" wiki page only to find it outdated by the time the next team member joins? Be honest with yourself when you answer that 😉.

Let's illustrate life without and with Gitpod:

![Development environment setup without Gitpod]({assetsBasePath}/2.jpg)

Development environment setup without Gitpod

Now the Gitpod marketing team's magic... That entire circle is irrelevant!

![Development environment setup with Gitpod]({assetsBasePath}/3.jpg)

Development environment setup with Gitpod

Please read on if you're a skeptic by nature.

### A URL to start the development environment

Here's how to get started with Gitpod and any Github or Gitlab repository - up and running with 0 clicks (but 1 press of the Enter key 😉).

1.  Copy the Github or Gitlab URL of your preferred project.
2.  Open a new tab in your browser.
3.  Type "gitpod.io/#" and paste the URL from step 1. Hit Enter.

Don't have your laptop? Want to quickly review code with a peer? The process is always the same.

### Consistency

If your project has special requirements, Gitpod provides [custom docker images](https://www.gitpod.io/docs/config-docker/). Your existing team and every new team member or open source collaborator runs the same environment. No more "it worked when I joined two weeks ago".

### Terminal

A terminal is provided, based on the Docker image (see above).

### Built-in code reviews

This is a nifty feature I quite like. Just as you can prefix a Github or Gitlab project URL with `gitpod.io/#` to start the workspace, the same applies to a pull request URL. Look at diffs and leave comments right from within Gitpod. [More on that in the documentation](https://www.gitpod.io/docs/code-reviews/).

### What about my VS Code extensions?

That's [supported](https://www.gitpod.io/docs/vscode-extensions/) in beta. Once configured, extensions are installed automatically when a workspace is opened.

## Oh wait... it costs money... monthly?!

The overall feedback from my post reviewers was about Gitpod's monthly subscription fee, so it's worth I address that before I publish.

To start, there's a free (as in, the same cost as your local development IDE) version for open source projects that gives you 50 hours / month.

If you want access to private repos, you start with a 30 day free trial. After that, it's $9 / month for 100 hours of usage. If you need unlimited hours, it's $25 per month - that's less than $1 per day.

To put this into perspective: A 13-inch MacBook Pro costs $1,299. A Pixelbook Go costs $649 (or buy an even more inexpensive Chromebook). You save $650 and can invest it into an online IDE.  
\* Divided by $25 = 26 months  
\* Divided by 12 = **2 years and 2 months**

## Look out for...

It's important to be fully transparent and list two gotchas that come to mind.

- **Online only**: Yep, you need internet access to work on your code.
- **Startup time**: Yep, there's a startup time of a few seconds when you open a workspace. I've used Gitpod for a few weeks now and that never bothered me in the slightest. You may feel differently, but for me it's well worth all the benefits I get out of Gitpod.

## Summary

I most recently developed [https://github.com/mikenikles/markua-docs-addon](https://github.com/mikenikles/markua-docs-addon) entirely in Gitpod. The efficiency and convenience of this experience led me to write this post and to share my experience with a wider audience.

There is a lot more to how I work, reduce friction and increase productivity especially when it comes to web development. If you're interested, please head over to [the book's detail page](/cloud-native-web-development) to learn more and purchase **Cloud Native Web Development**.

👋
