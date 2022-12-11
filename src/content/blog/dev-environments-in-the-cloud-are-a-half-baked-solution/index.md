---
title: "Dev environments in the cloud are a half-baked solution"
slug: "dev-environments-in-the-cloud-are-a-half-baked-solution"
coverPhotoId: false
summary: "Cloud-only dev environments are fundamentally interested in charging you for writing code. Instead, we need a hybrid solution that automates local dev environments AND let's you run them in the cloud, should you choose to do so."
createdAt: 2022-12-08T04:03:13.067Z
tags: [""]
layout: blog
---

<script>
  const assetsBasePath = `/blog/${slug}`;
</script>

**Key takeaways**
* Developer environments in the cloud have existed for years
* Everything turns into SaaS, but should your dev environment, really?
* Service availability can never match localhost
* Pay-as-you-go pricing is for privileged people only and locks out many
* The fully baked solution is a hybrid that works offline

**Thanks**: I've meant to write about this topic for a few weeks, but didn't get to it until Mo [asked me to share my thoughts](https://twitter.com/codingmoh/status/1591276103129235457). A big shout out to him also for the blog post feedback and discussions about the topic 🙏.

## What are development environments in the cloud?
At a high-level, it's simple:

> Instead of developing software on your local computer, you leverage CPU, storage, and networking in a cloud-hosted environment.

However, there is more to it, a lot more!

**Reproducibility**

Dev environments in the cloud aim to eliminate the "it works on my machine" frustration. Instead of building and maintaining your dev environment over time, you configure and automate the setup. Instead of a `CONTRIBUTING.md`, you have scripts. Instead of tribal knowledge, you have configuration. This ensures every contributor's environment is identical. If one developer has an issue with the dev environment, everyone has an issue. Fix it and know everything works as expected, for everyone.

If you need to debug your app at the exact state it was six months ago, start a dev environment based on a given commit, done. It will work, 100% guaranteed.

**Collaboration**

We have tools to create pull request previews, especially in the context of web applications. Isolated, branch-specific deployments of the code as it gets pushed to a pull request. They are great for collecting feedback, collaborating, or demo a new feature or bug fix.

Take this concept and apply it to dev environments. This enables a variety of exciting use cases:
- Share your dev environment with colleagues to pair-program
- Work on changes in real time as you demo a project to your client
- If you run a workshop, help your students right in their own environment
  - This is like looking over a student's shoulder in a classroom, but anywhere in the world

**A new way of how we work**

Dev environments in the cloud improve how we work. By far the best demonstration of that is StackBlitz's [Codeflow](https://stackblitz.com/codeflow).

> Each task you work on happens in an isolated dev environment. You start it, you do your work, you commit and push, you forget about that particular dev environment.

**Note**: *Other than the workflow demonstration with Codeflow, StackBlitz is limited to Node.js development and is by no means a product that falls in the dev environments in the cloud category.*

## Challenges

> Anyone who tells you there are no downsides is a liar and puts their (financial) interests first. Developing in a cloud environment is not a one-size-fits-all solution and requires case-by-case evaluation.

Let's explore some challenges you would not read about on a provider's website.

### Must have internet access

If your dev environments live in the cloud, you need connectivity to said cloud and if you do not have that, you are out of luck. Period.

While 24/7/365 internet access is fairly common in Europe & North America, a vast group of software engineers globally do not have that luxury or cannot afford it.

Worth noting, this applies to self-hosted solutions as well. Whether you use a SaaS offering or host the service in your own data center, a loss of connectivity means nobody is able to work. Depending on your team size, this becomes costly quickly.

### Service availability & reliability

> If your CI is down, fine, keep writing code.
> If your Jira is down, fine, keep writing code.
> If your dev environment in the cloud is down, not so fine.

Even if you do have connectivity to your cloud-hosted dev environment, if the service is down, so is your productivity. It is not just you either, it is all your team members and anyone else who relies on that given service.

To put this into perspective, here is some food for thought about publicly reported service availability for Codespaces and Gitpod, a product with a workflow similar to StackBlitz's Codeflow, but hosted in two data centers.

|| Codespaces | Gitpod |
|--|--|--|
| November 2022 | 5 incidents | 6 incidents |
| October 2022 | 5 incidents | 21 incidents |
| September 2022 | 2 incidents | 14 incidents |
| August 2022 | 11 incidents | 7 incidents |

Sources: [Codespaces](https://www.githubstatus.com/history), [Gitpod](https://www.gitpodstatus.com/history)

### Product quality

Incidents are only one side of the coin, the other side is product quality. I am not aware that GitHub Codespaces open sources their bug reports, but **in Gitpod's case, over 100 bugs were reported per month** in [July](https://github.com/gitpod-io/gitpod/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+bug%22+created%3A2022-07-01..2022-07-31), [August](https://github.com/gitpod-io/gitpod/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+bug%22+created%3A2022-08-01..2022-08-31), [September](https://github.com/gitpod-io/gitpod/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+bug%22+created%3A2022-09-01..2022-09-30), [October](https://github.com/gitpod-io/gitpod/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+bug%22+created%3A2022-10-01..2022-10-31), and [November](https://github.com/gitpod-io/gitpod/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+bug%22+created%3A2022-11-01..2022-11-30+) of 2022.

Over the same period, at least 30% of reported bugs remained open.

If you develop locally, the product quality you care about is your laptop's hardware, your operating system, your terminal, and your editor.

With your entire dev environment in the cloud, all of a sudden you are locked in with a SaaS provider and rely on their quality assurance team. To shed some light on this: As of June 2022, Gitpod had zero people dedicated to QA whereas in December 2022, there were still no open positions for this role.

For a task like writing software that is by far the most important of your daily work activities, do you really want to rely on a 3rd party without a feasible workaround if their service is not available or broken?

### Latency

If you type a character and it takes 100+ milliseconds for that action to reach your dev environment, you are very likely to type less than five characters before you give up. Even worse, there are another 100+ milliseconds to get a response back from the dev environment.

Latency depends on the geographical availability of your dev environment relative to where you are physically located. To stick to our two providers, GitHub Codespaces and Gitpod, the table below lists their geographical availability.

| Provider | Regions |
|--|--|
| Codespaces | 4 (US West, US East, Europe West, Southeast Asia) |
| Gitpod | 2 (Europe, US) |

Gitpod has failed to expand to additional geographical regions for two years and counting. As of November 17, 2022 the official status update is that expansion is not straightforward ([source](https://github.com/gitpod-io/gitpod/issues/7489)).
To check your latency to Gitpod's EU or US data center, check [gcping.com](https://gcping.com) and look for the "europe-west1" or "us-west1" region.

GitHub Codespaces is twice as widely available, but also lacks proximity to developers in South America, anywhere in Africa, and Australia (the closest region is Southeast Asia aka Singapore).
To check your latency to Codespace's data centers, check [azurespeed.com](https://www.azurespeed.com/Azure/Latency), select the following regions, and look at the "Latency Test" table at the bottom: West US 2, East US, West Europe, Southeast Asia.

### Vendor lock-in

Remember how worried we were / are about getting locked-in with cloud providers when it comes to running applications in a production environment? Right 😰!
We mitigate that with open standards such as Docker images. Don't like AWS? Take your Docker image and spin up a container on railway.app. Yeah I know, it's not as easy as it sounds, but it's possible.

Why would you worry less about SaaS businesses who provide dev environments in the cloud? You should worry at least as much as with your production workloads!

I see two aspects of importance to evaluating how much lock-in there is:
1. Configuration
1. Self-hosting

**Configuration**

How do you configure the automation of your dev environment? Is it a proprietary configuration or is it an open standard?
GitHub Codespaces leads the way here with their `devcontainer.json` open standard (see [containers.dev](https://containers.dev/)).
Gitpod's configuration is a custom, proprietary yaml file ([reference docs](https://www.gitpod.io/docs/references/gitpod-yml)) you can only use with Gitpod.

**Self-hosting**

If you worry about service availability, can you self-host the product? GitHub Codespaces cannot be self-hosted whereas Gitpod is rumoured to discontinue their self-hosted offering in favour of a likely more pricey alternative called Gitpod Dedicated ([conversation in Discord](https://discord.com/channels/816244985187008514/839379835662368768/1049414773479067778)).

Regardless of these rumours, even for the currently available self-hosted offering, Gitpod does not provide instructions for a production-ready, highly available setup. I let you draw your own conclusions as to how difficult it may be to run Gitpod on your own.

### Supported tools & frameworks

You would think a SaaS business which claims they run your dev environment in the cloud supported whatever tools & frameworks you need.

This is certainly true if you are a Javascript / Node.js / web developer.

Anyone who develops full-stack applications on Kubernetes or is a data scientist who wants to leverage GPUs for example should take a step back. It is crucial to understand your SaaS provider's architecture and what limitations that brings. As you can imagine, limitations are not something a marketing website openly talks about...

The good news for GitHub Codespace users is they provide you with an actual virtual machine and whether you want to run Kubernetes or leverage GPUs for machine learning workloads, you are all set and ready to go.

Gitpod on the other hand limits you to whatever you can run in a docker container. Given Gitpod itself is already a Kubernetes application, all you get as a workspace is a container that runs on a Kubernetes pod. While well isolated, you do share that pod's resources with other random developers, even developers who are not part of your company.

### Pricing

You cannot sugarcoat this, no matter how you phrase it.

> Local development has a one-time upfront cost to buy your computer whereas dev environments in the cloud have usage-based pricing. **The more you work, the more you pay.**

This applies to students as well: the more you study and experiment, the more you pay*.

\* *As of November 21, 2022, Gitpod no longer supports student plans to reduce complexity and admin costs 🤷, as [mentioned in their Discord server](https://discord.com/channels/816244985187008514/879914823570309160/1044281777688154112), but nowhere else publicly.*

Just like cloud providers, companies which offer dev environments in the cloud cash in by the second/minute/hour your dev environment(s) run. Forgot to shut one down? You will get charged until you remember to turn it off, or it may turn off automatically at some point.

I also think there is a point to be made about the next billion developers who live outside Europe and North America. Dev environment in the cloud businesses will not be able to lower their prices to make it affordable to less privileged people, simply because the operational costs are too high.

For mid to large size companies, there are hard-to-measure cost savings thanks to streamlined workflows and automated dev environment setups. As I said earlier, each team has to evaluate the pros / cons individually. As with any business purchase, negotiate a price that works for you, never pay what is advertised.

## It's all SaaS, but should it be?

To give you a visual representation of how isolated writing code is for most developers, let's look at a 5-stage software development lifecycle (SDLC) diagram:

![A pie chart with 5 slices. Requirements, Design, Implementation, Test, Maintenance whereas Implementation is highlighted in red.]({assetsBasePath}/1.webp)
 
*Source: Myself on InfoQ, June 2020 ([article](https://www.infoq.com/articles/cloud-based-development))*

As I wrote in my InfoQ article in 2020 ([link](https://www.infoq.com/articles/cloud-based-development)), four out of five stages already happen in the cloud, why not implementation?
The question is, should implementation really happen in the cloud?

Since I published that article, I have worked with many existing solutions which provide dev environments in the cloud and have come to the conclusion that the implementation stage requires a much more dynamic, flexible approach.

## The fully baked solution is a hybrid in your backyard

Dev environments in the cloud have been used at Google, Facebook, and others for years and now they are here to stay for everyone in this industry, despite the various challenges they bring (see the **Challenges** chapter above).

> The most important benefit is how these environments allow us to eliminate context switching! You can work on a feature in the `my-feature` branch while in parallel review a PR in the `prod-hotfix` branch. Both branches are checked out in completely isolated environments. When you are done with your tasks, move on and forget about the previous environment, you will start a new environment for your next task.

As a developer, whether my dev environment is locally or in the cloud must be completely transparent. Since developers have spent years perfecting their development workflows, the evolution of how we develop software must allow for all muscle memory to continue to work.

On top of that though, we want to introduce a few improvements:
Share a dev environment to pair program with a team member
Spin up multiple dev environments in parallel (e.g. to work on a feature and quickly review a pull request)
Leverage more CPU / GPU / storage / faster networking provided by cloud providers
Prepare dev environment snapshots with the latest repository commits to further speed up dev environment readiness times

Let's explore what I mean by "a hybrid in your backyard" and how it addresses the challenges I outlined earlier.

### Architecture

Both GitHub Codespaces and Gitpod provide custom architectures.

This school of thought is outdated. As an industry, we already defined a widely-adopted solution for installing dependencies and creating isolated, reproducible environments: Nix ([nixos.org](https://nixos.org/)).

*Talking about Nix, if [this conversation](https://twitter.com/grhmc/status/1591631927999696897) is any indication, it is exciting to imagine Nix support on Codespaces!*

> **Step 1: The fully baked solution for dev environments in the cloud must be based on Nix.**

Nix has various benefits, a quick "Why Nix?" online search provides more details. One major benefit is how Nix separates individual dependency versions. For example, you work on two Python projects, one depends on Python 2.x and PostgreSQL 12, the other on Python 3.x and PostgreSQL 14. With Nix, you can have both versions installed and use the correct one depending on the project you work on. This concept applies to all OS dependencies and if applied to a dev environment, each dev environment exists completely isolated!

### Configuration

Nix is great, but... yes you read that right... but... The [Nix language](https://nixos.org/guides/nix-language.html) comes with a very steep learning curve. So steep in fact that it is a no-go for mass adoption to configure dev environments.

Let me show you what I mean. Here is a `shell.nix` file ([source](https://nix.dev/tutorials/declarative-and-reproducible-developer-environments#customizing-your-developer-environment)) to configure a development environment with Node.js 18:

```nix
{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/3590f02e7d5760e52072c1a729ee2250b5560746.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
  ];
}
```

What we really want is something like this:

```json
{
  "packages": ["nodejs-18_x"]
}
```

Concise, easy to understand, in a format developers are already familiar with.

> **Step 2: Completely abstract the Nix package manager and the Nix language.**

To avoid vendor lock-in, you must be able to export the dev environment configuration as an open standard, i.e. as a `devcontainer.json` specification as documented on [containers.dev](https://containers.dev).

### Lifecycle hooks

Installing required OS-level dependencies is a good start. Any application though comes with additional prerequisites and needs databases and application servers to be started. There also needs to be a way to run commands when a dev environment is terminated.

For the sake of this example, let's say we develop a full-stack web application with a PostgreSQL database. Let's extend the above JSON configuration file:

```json
{
  "packages": [
    "nodejs-18_x",
    "postgresql_14"
  ],
  "init_hook": [
    "npm install",
    "sh ./scripts/start-database.sh",
    "npm run dev"
  ]
}
```

> **Step 3: Provide lifecycle hooks to automate all aspects of the dev environment.**

Whether you want to install dependencies, start servers, or terminate connections to a shared database, you must be able to intercept various lifecycle events from the time a dev env is created until it is terminated.

### Hosted in your backyard

To truly provide the best experience to developers globally, your dev environment in the cloud needs to be located as closely to your physical location as possible, ideally in your backyard :-).

Codespaces' four data centers are likely not close, and most certainly neither are Gitpod's two!

One way to solve this is to architect the solution so it runs in all regions provided by cloud providers. No convoluted Kubernetes setup that doesn't scale horizontally, no centralized databases, no regional storage buckets, none of that. A lightweight, self-contained architecture that seamlessly scales across all regions globally.

However, even then you are still limited to the data centers provided by cloud providers.

As an industry, we already have another solution to that problem: an edge network. Deploying a self-contained dev environment on an edge network truly brings it to your backyard, or just slightly outside it.

> **Step 4: Run dev environments on an edge network.**

This of course is seamless to the developer. Whether I am based in Cape Town or Buenos Aires, I want my dev environment ready to go instantly with millisecond latency. If I travel and start a dev environment from Paris, I want my code available at the nearest edge node, connect to it and start developing.

### Drop the centralized database

To achieve the backyard-hosted latency mentioned in the previous section, there is no place for a centralized database. Even if your code and compute are in your backyard, as soon as the service on that edge node needs to request data from the database in the `us-east1` (for example) data center, all hope for millisecond latency is lost.

> **Step 5: Use SQLite, globally replicated.**

Co-locate the data required by the dev environment service provider right next to the dev environment on the edge node. This may be data related to authentication, service metrics, user settings, etc.

Every time a developer starts a dev environment in the cloud, a local SQLite database provides and collects necessary data. As transactions happen to that database, they get replicated across all other instances globally.

### Works offline

A dev environment which is only accessible when you have internet access or when the SaaS provider is available is 100% useless when either of these two situations is not true.

Developers should be able to run their dev environment locally just like they have been doing for decades. Same configuration, same ports, same automation.

If a developer chooses to work offline, they lose access to features such as
* sharing their dev environment with team members
* GPUs
* automated environment snapshots
* multiple environments in parallel

However, working offline without these features should be their choice, not something that is impossible because their dev environment is cloud-only.

> **Step 6: Transparently run a dev environment locally.**

Developers can configure whether they prefer their dev environment to start in the cloud or locally (env variable, CLI flag, etc.). If cloud connectivity is lost, the developer is informed about that and continues to work locally.

To achieve this, files are synchronized between the cloud and the local environment. When connectivity is lost, the automation scripts run locally and start up the databases & application services, completely seamless to the developer.

Likewise, when cloud connectivity is back, the developer is informed and may choose to switch back to develop in the cloud environment, or continue to work locally at no cost to them.

### Pricing

Developing software should not break anyone's bank. Anyone should be given free access to the benefits of automated dev environments, streamlined dependency management, and standardized configuration. This is possible thanks to what I outlined in "Works offline" above. This in itself is already a great evolution over (often outdated) `CONTRIBUTING.md` documentation and manual dev environment setup.

When a developer wants to leverage cloud features, pay-as-you-go pricing can be applied for the duration a developer uses these features.

Thanks to the seamless transition between local and cloud development (described in the previous chapter), there is zero overhead for developers to switch from local to cloud and vice versa.

## Wrap up

Today's development environments are flawed in that they are manually set up and maintained, too brittle, and sooner or later break on various team members' machines.

Furthermore, current cloud development environments are flawed in that they are cloud-only and attempt to cash in on your time spent developing software or learning how to develop software.

We cannot simply show up and dictate how we develop software. Decades of muscle memories need to be retained in order to guarantee a continuous flow of productivity for all developers.

Instead, we need an evolution where we fix the most critical challenges first: automation and reproducibility - at no cost to developers.

This acts as the foundation to introduce additional features with dev environments in the cloud:
* share with team members & other stakeholders
* take advantage of cloud compute, storage, and network speed
* run multiple environments in parallel
* automated environment snapshots to drop dependency installation wait time to close to zero

In summary:
* **Step 1: The fully baked solution for dev environments in the cloud must be based on Nix.**
* **Step 2: Completely abstract the Nix package manager and the Nix language.**
* **Step 3: Provide lifecycle hooks to automate all aspects of the dev environment.**
* **Step 4: Run dev environments on an edge network.**
* **Step 5: Use SQLite, globally replicated.**
* **Step 6: Transparently run a dev environment locally.**

### My bet on who has the best shot at building a hybrid in your backyard

> Meet Devbox 🎉!

I have used [Devbox](https://www.jetpack.io/devbox/) for a few months and can confidently say this is by far closest to what I imagine the next generation of development environments (in the cloud) to look & feel like.

Once you installed Devbox, run the following command in your project's root directory: `devbox init`.

This generates a `devbox.json` file. Commit this file to source control and anyone with Devbox installed can start their development environment with `devbox shell`, done.

Add packages with `devbox add package-1 package-n`. To find packages, use [search.nixos](https://search.nixos.org).

Start your dev environment with `devbox shell`.

For example, to create a Node.js project:

```
devbox init
devbox add nodejs-18_x
devbox shell
```

We can extend the `devbox.json` file as follows to install dependencies and start the dev server:

```json
{
  "packages": [
    "nodejs-18_x"
  ],
  "init_hook": [
    "npm install",
    "npm run dev"
  ]
}
```

Make sure you check out [github.com/jetpack-io/devbox-examples](https://github.com/jetpack-io/devbox-examples) for various examples to get you started.

**Want to use Codespaces?**

Use the [Devbox VS Code extension](https://marketplace.visualstudio.com/items?itemName=jetpack-io.devbox) and follow [these instructions](https://twitter.com/jetpack_io/status/1598748615559692288) to generate a `devcontainer.json` file. Commit that to source control and start the project in GitHub Codespaces.

**Automatically start your project when you `cd` into the directory**

See Devbox's [direnv integration](https://www.jetpack.io/devbox/docs/ide_configuration/direnv/) or install the [Devbox VS Code extension](https://marketplace.visualstudio.com/items?itemName=jetpack-io.devbox).

**Devbox in the cloud**

Well...

> All that's missing is something like `devbox cloud shell` to spin up the environment in a cloud environment and benefit from collaboration, better performance, etc.

👆️ Let's hope the Devbox team stops by and sees this 👋.

Famous last words: In theory, "it's just Nix" – so we are left with hope 🙏.

**Disclaimer**

This blog post uses GitHub Codespaces and Gitpod to outline challenges in today's implementations of dev environments in the cloud. These are the two solutions I am most familiar with. For transparency, please note that I did some contract work for Gitpod for almost two years. Regardless of that, anything shared in this blog post is based on public information with links to sources.