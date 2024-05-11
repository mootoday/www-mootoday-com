---
title: "I replaced Homebrew with Devbox"
summary: Jetify's Devbox standardizes project dependencies. It also supports global dependency management and is the most straightforward solution I have used.
createdAt: 2024-05-12T03:45:17.562Z
featured: false
---

**Key takeaways**

* Homebrew gets the job done, but it's 2024 and there is a great alternative.
* `devbox` is easy to maintain and works for individual projects as well as for global system dependency management.
* Configurations can be synced across devices!

> The Missing Package Manager for macOS (or Linux) – From the Homebrew website

Ask a developer who uses MacOS what they use to install packages and there is a high chance they reply with "Homebrew, of course.". There is nothing wrong with Homebrew as its success is undisputable.

As someone who's job it is to improve developer experience for companies, I always look for ways to remove friction and to streamline developers' efficiency. See "[Beyond the Bottom Line: The ROI of Investing in Developer Experience](/blog/beyond-the-bottom-line-the-roi-of-investing-in-developer-experience)" for a deep-dive into this topic.

## Devbox for projects

> Portable, Isolated Dev Environments on any Machine

Devbox (<a href="https://github.com/jetify-com/devbox" target="_blank">github.com/jetify-com/devbox</a>) is meant to improve the developer experience for individual projects. You configure all project dependencies, set up init scripts, and anyone who contributes to the project can get started with `devbox shell`. **Seriously, one command and Devbox takes care of everything else!**

If your projects contains services such as databases, APIs, web apps, etc. you can start them all up with `devbox services up`.

Oh my, I'm getting side-tracked... Contact me via <a href="https://onboarding.webstone.app" target="_blank">onboarding.webstone.app</a> and I will improve your project onboarding.

## Devbox as a Homebrew replacement

First things first, install Devbox:

```bash
curl -fsSL https://get.jetify.com/devbox | bash
```

Next, <a href="https://www.nixhub.io/" target="_blank">choose from 400,000 package versions</a> to install on your system or use the CLI via `devbox search <package-name>`.

Let's use `git` as an example. To install `git` system-wide, use the following command:

```bash
devbox global add git
```

> Note the `global` subcommand. If you were to install a dependency for a given project only, you would omit `global`.

If you no longer need a package:

```bash
devbox global rm <package>
```

To see what packages you already have installed:

```bash
devbox global ls
```

### Backup and sync across devices

You can easily back up and sync your Devbox packages configuration via a remote git repository.

To back up:

```bash
devbox global push <git-repo>
```

To pull / sync on another device:

```bash
devbox global pull <url>
```

## Why?

* I already use Devbox for my projects, so it's one tool less to install and maintain.
* I can back up / sync my configuration
* I find it easier to deal with than Homebrew

👋
