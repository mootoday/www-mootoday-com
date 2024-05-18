---
title: 'Work with multiple git branches in parallel'
summary: You work on a feature branch and your co-worker asks you to review their pull request. Panic. Fear. Ehm... yeah, let me wrap up my current work. Well, no more, I work with multiple branches in parallel.
createdAt: 2024-05-18T03:15:13.067Z
featured: false
---

**Key takeaways**

- Let's be honest, `git stash` gets the job done, but the mental overhead is draining
- Even after changing a git branch, you still don't know if the dependencies are up-to-date, the database migrations need to run, any shared code needs to be built, etc.
- Standardize your dev environment and use `git worktree` to make working on multiple branches in parallel a breeze

> 🙏 Thanks
>
> to <a href="https://x.com/TastefulElk/status/1790653359596130740" target="_blank">this tweet from Sebastian Bille</a> for the motivation to write this blog post and put together a demo repo
>
> to <a href="https://x.com/TastefulElk" target="_blank">Sebastian Bille </a>, <a href="https://x.com/meijer_s" target="_blank">Stephan Meijer</a>, and <a href="https://x.com/jetpack_john" target="_blank">John Lago</a> for the reviews, feedback, and brainstorming to make this blog post come to life

A **demo repository** based on this blog post is available at <a href="https://github.com/mootoday/parallel-git-branches" target="_blank">mootoday/parallel-git-branches</a>.

## The challenge with local development environments

You work on a feature in the `my-feature` branch. You have a bunch of new files, modified a handful of existing files, and added a new dependency (NPM package, Rust crate, etc.).

Alice, your team member, asks you to review a pull request that contains a production hotfix. As you read this blog post right now, put yourself into that situation and think about the last time a co-worker asked you to review their code while you were deep in the process of developing a new feature.

> How do you feel?

Up until a few years ago when I started to work the way I describe in this blog post, I had felt inconvenienced. Why? Let's look at a typical workflow for that scenario:

1. You stash your local files: `git add -A . && git stash`
1. You pull the hotfix branch: `git switch main && git pull`
1. You switch to the hotfix branch: `git switch hotfix`
1. Your dev server(s) crash because Alice also added a new dependency you don't have installed yet
1. You install the dependency (`npm install`, `cargo fetch`, etc.)
1. You restart the dev server(s) – it gets worse if there are database migrations, shared code that needs to be rebuilt, etc.)
1. You review Alice's hotfix and approve the pull request
1. You switch back to your feature branch: `git switch my-feature` (hopefully, you remember the branch name or else you have to spend time finding it)
1. You may or may not remember to install the dependencies needed for your branch. If you remember, good, if not your dev server(s) crash again
1. You apply your staged changes: `git stash pop`

What an ordeal... 😰 There are millions of developers who look at the above steps and say _"Yeah, that's fine. That's how it has always been."_. Well, that is a pretty bad attitude for a software engineer, so let me show you that things can be a lot simpler.

## Work with multiple git branches in parallel

What follows is a step-by-step guide on how to set up the demo repo (<a href="https://github.com/mootoday/parallel-git-branches" target="_blank">mootoday/parallel-git-branches</a>) and how to deal with Alice's hotfix with a lot less cognitive overhead.

### Prepare your computer

Install <a href="https://github.com/jetify-com/devbox" target="_blank">Devbox</a>. Devbox lets you create isolated shells for each of your projects. Every contributor uses the same dependencies, the same dependency versions, runs the same init scripts, database migrations, and database seed scripts.

Install Devbox with the following command:

```sh
curl -fsSL https://get.jetify.com/devbox | bash
```

### Clone the repository

The following steps are a one-time process when you set up a new git repository locally.

1. Clone the repository into a `<repo-name>/<branch>` directory:

```sh
git clone git@github.com:mootoday/parallel-git-branches.git parallel-git-branches/main
```

### Ready to go

1. Navigate to the repo: `cd parallel-git-branches/main`
1. Install dependencies, run database migrations, seed scripts, etc. and start dev server(s):

```sh
devbox services up
```

That's it. Seriously, try it.

Devbox installs the correct version of NodeJS (or any other dependencies your project needs, e.g. databases, system libraries, etc.) and starts the web app dev server at (<a href="http://localhost:5173" target="_blank">localhost:5173</a>).

Let's modify a few files to simulate the situation where you are working on a feature with local changes. A good candidate is `src/routes/+page.svelte` since that is the landing page displayed at http://localhost:5173. Change any text in that file.

### Review Alice's hotfix (the easy way)

With that set up, let's now shift our focus to Alice's hotfix and the workflow we use to review that.

Oh... here comes Alice. "Hey pal, I fixed a production bug and need an urgent pull request review 🙏."
You, "Nothing easier than that, I'm on it."

1. Create a new worktree to review the `hotfix` branch: `git worktree add ../hotfix hotfix`
1. Switch to the hotfix worktree: `cd ../hotfix`
1. Install dependencies used in the `hotfix` branch and start the dev server(s): `devbox services up`
1. Look at the `dev_web` console output and open the URL at the new port, i.e. <a href="http://localhost:5174" target="_blank">localhost:5174</a>
1. Review the changes and approve the pull request
1. Switch back to your feature branch: `cd ../main` (or whatever branch you were working on)

If your dev server cannot be started twice because it uses a fixed port, shut all services down with `CTRL + C` in the terminal where you see the running processes, i.e. where you ran `devbox services up`. When you completed the `hotfix` review, run `devbox services up` again in your feature branch and it will install the correct dependencies and start the dev server(s).

Thanks to Devbox, each worktree directory (e.g. `hotfix`) contains its own database files. This means database migrations from one git branch are isolated from database migrations in another branch!

### Cleaning up

You can list all available worktrees with `git worktree list`. To remove the `hotfix` worktree, run `git worktree remove ../hotfix`. To learn about more related commands, check the help output: `git worktree -h`.

## How does it work?

Let's explore the tools and configuration files required to make this all work.

### Devbox

<a href="https://github.com/jetify-com/devbox" target="_blank">Devbox</a> ensures all dependencies, including the correct versions, are installed. This goes beyond your regular NPM packages or Rust crates.

> Devbox installs the required OS-level libraries, databases, CLIs, etc.

Devbox is configured for each project. This means if you work on two projects where one uses Node.js 18 and the other one Node.js 20, Devbox uses the correct version depending on the project. Even better, there is no Node.js binary on your computer when you are in your regular terminal without a Devbox shell open!

You can search for dependencies with `devbox search <your-dependency>` or on <a href="https://www.nixhub.io/" target="_blank">Nixhub.io</a>.

To add a dependency: `devbox add <your-dependency>`. To remove it: `devbox rm <your-dependency>`.

The Devbox configuration is stored in the `devbox.json` file at the project's root.

### Process Compose

<a href="https://github.com/F1bonacc1/process-compose" target="_blank">Process Compose</a> comes bundled with Devbox. When you run `devbox services up`, Devbox spins up Process Compose's terminal user interface (TUI) where you can look at logs, restart processes, etc.

> Use Process Compose to define not only processes for services, but also for tasks like running database migrations, seeding the database, building shared libraries in a monorepo, etc.

This allows you to re-run various tasks ad-hoc which improves the developer experience. For example, someone can re-seed the database by selecting that task in the Process Compose TUI and use CTRL+R to restart the task.

There is so much more to this tool, definitely check out their <a href="https://f1bonacc1.github.io/process-compose/launcher/" target="_blank">documentation</a>.

The Process Compose configuration is stored in the `process-compose.yaml` file at the project's root.

### `git worktree`

<a href="https://git-scm.com/docs/git-worktree" target="_blank">git-worktree</a> has been around since 2015 (git v2.5) and is without a doubt one of my favourite git features. Even before I knew about Devbox and Process Compose, `git worktree` had saved me so much time.

This is an easy workflow you can experiment with on your own laptop and introduce to your team if you like it. Why stop there though and not go all-in based on this blog post 😅?!

## Conclusion

With the combination of <a href="https://github.com/jetify-com/devbox" target="_blank">Devbox</a> (which comes with <a href="https://github.com/F1bonacc1/process-compose" target="_blank">Process Compose</a>) and `git worktree`, you are able to easily work with multiple git branches in parallel.

No more `git stash`, no more missing / outdated dependencies, no more "It works on my machine".

If this is something you want for your project, here's a shameless plug 😊: Contact me via <a href="https://onboarding.webstone.app">onboarding.webstone.app</a>. My team and I do this for a living and help companies improve their internal & external developer experience. I shared more on what I think developer experience means in <a href="/blog/beyond-the-bottom-line-the-roi-of-investing-in-developer-experience" target="_blank">Beyond the Bottom Line: The ROI of Investing in Developer Experience</a>

👋
