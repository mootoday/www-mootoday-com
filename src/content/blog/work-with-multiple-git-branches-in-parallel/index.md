---
title: 'Work with multiple git branches in parallel'
summary: You work on a feature branch and your co-worker asks you to review their pull request. Panic. Fear. Ehm... yeah, let me wrap up my current work. Well, no more, I work with multiple branches in parallel.
createdAt: 2024-05-17T03:15:13.067Z
featured: false
---

**Key takeaways**

- Let's be honest, `git stash` works, but the mental overhead is draining
- Even after changing a git branch, you still don't know if the dependencies are up-to-date, the database migrations need to run, etc.
- Standardize your dev environment and use `git worktree` to make working on multiple branches in parallel a breeze

> 🙏 Thanks to <a href="https://twitter.com/TastefulElk/status/1790653359596130740" target="_blank">this tweet from Sebastian Bille</a> for the motivation to write this blog post and put together a demo repo.

A **demo repository** based on this blog post is available at <a href="https://github.com/mootoday/parallel-git-branches" target="_blank">mootoday/parallel-git-branches</a>.

## The challenge with local development environments

You work on a feature in the `my-feature` branch. You have a bunch of new files, modified a handful of existing files, and added a new dependency (NPM package, Rust crate, etc.).

Alice, your team member, asks you to review a pull request that contains a production hotfix. How do you feel? More importantly, what do you do? Here's a typical workflow for that scenario:

1. You stash your local files: `git add -A . && git stash`
1. You pull the hotfix branch: `git switch main && git pull`
1. You switch to the hotfix branch: `git switch hotfix`
1. Your dev server(s) crash because Alice also added a new dependency you don't have installed yet
1. You install the dependency (`npm install`, `cargo fetch`, etc.)
1. You restart the dev server(s) – it gets worse if there are incompatible database migrations between your and Alice's branch...)
1. You review Alice's hotfix and approve the pull request
1. You switch back to your feature branch: `git switch my-feature`
1. You may or may not remember to install the dependencies needed for your branch. If you remember, good, if not your dev server(s) crash again
1. You apply your staged changes: `git stash pop`

What an ordeal... 😰 There are millions of developers who look at the above steps and say _"Yeah, that's fine. That's how it has always been."_. Well, let me show you things can be a lot simpler.

## Work with multiple git branches in parallel

What follows is a step-by-step guide on how to set up the demo repo (<a href="https://github.com/mootoday/parallel-git-branches" target="_blank">mootoday/parallel-git-branches</a>) and how to deal with Alice's hotfix with a lot less cognitive overhead.

### Prepare your computer

While optional, the demo repo (and any of my projects for that matter) uses <a href="https://github.com/jetify-com/devbox" target="_blank">Devbox</a>. Devbox lets you easily create isolated shells for development. Every contributor for your project uses the same dependency versions, runs the same init scripts and database migrations.

Install Devbox with the following command:

```sh
curl -fsSL https://get.jetify.com/devbox | bash
```

### Prepare the repository

The following steps are a one-time process when you set up a new git repository locally.

1. Clone the repository into a `<repo-name>/<branch>` directory:
   ```sh
   git clone git@github.com:mootoday/parallel-git-branches.git parallel-git-branches/main
   ```
1. Install dependencies and start dev server(s):
   ```sh
   devbox services up
   ```

That's it. Devbox installed the correct version of NodeJS (or any other dependencies your project needs, e.g. databases, system libraries, etc.) and started the web app dev server at (<a href="http://localhost:5173" target="_blank">localhost:5173</a>).

### Review Alice's hotfix (the easy way)

With that set up, let's now shift our focus to Alice's hotfix and the workflow we use to review that.

First things first, modify a few files. A good candidate is `src/routes/+page.svelte` since that is the landing page displayed at http://localhost:5173.

Here comes Alice, "Dear team member, I fixed a production bug and need an urgent pull request review 🙏."

You, "Alice, give me a minute, I'm on it."

1. Create a new worktree to review the `hotfix` branch: `git worktree add ../hotfix hotfix`
1. Switch to the hotfix worktree: `cd ../hotfix`
1. Install dependencies used in the `hotfix` branch and start the dev server(s): `devbox services up`
1. Look at the `dev_web` console output and open the URL at the new port, i.e. <a href="http://localhost:5174" target="_blank">localhost:5174</a>
1. Review the changes and approve the pull request
1. Switch back to your feature branch: `cd ../main` (or whatever branch you were working on)

If your dev server cannot be started twice because it uses a fixed port, shut all services down with `CTRL + C` in the terminal where you see the running processes, i.e. where you ran `devbox services up`. When you completed the `hotfix` review, run `devbox services up` again in your feature branch and it will install the correct dependencies and start the dev server(s).

### Cleaning up

You can list all available worktrees with `git worktree list`. Check its help output to see how to delete individual worktrees or prune them all: `git worktree -h`.

## Conclusion

With the combination of <a href="https://github.com/jetify-com/devbox" target="_blank">Devbox</a> (which comes with <a href="https://github.com/F1bonacc1/process-compose" target="_blank">process-compose</a>) and `git worktree`, you are able to easily work with multiple git branches in parallel.

If this is something you want for your project, here's a shameless plug: Contact me via <a href="https://onboarding.webstone.app">onboarding.webstone.app</a>. My team and I do this for a living and help companies improve their internal & external developer experience. I shared more on what I think developer experience means in <a href="/blog/beyond-the-bottom-line-the-roi-of-investing-in-developer-experience" target="_blank">Beyond the Bottom Line: The ROI of Investing in Developer Experience</a>

👋
