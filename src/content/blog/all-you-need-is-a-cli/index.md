---
title: "All you need is a CLI"
summary: If your product's audience is technical, you probably don't need a web app until you reach $5m in annual recurring revenue (ARR).
createdAt: 2025-01-22T02:34:12.067Z
featured: false
---

**Key takeaways**

- Web design & development is tedious, expensive, and you will never please everyone
- Developing and maintaining a CLI takes less time than for a web app
- With a CLI, customers can automate their workflows – and so can you
- A CLI must follow best practices and have some bells and whistles
- Read and apply the CLI Guidelines at <a href="https://clig.dev/" target="_blank">clig.dev</a>

> If your product's audience is technical, you probably don't need a web app until you reach ≈$5m in annual recurring revenue (ARR).

## When is a CLI **not** the right tool

Before we dive in, let's get this out of the way:

> If your product's **audience is not technical, build a web app**, not a CLI.

Alright, now let's go.

## Lessons learned from three years of building a Node.js CLI

In 2022, I started to help a client with their developer experience. They already had an initial CLI developed by another contractor, so that was what we kept and added to over time. It was built with Node.js, specifically with `yargs` (<a href="https://yargs.js.org/" target="_blank">yargs.js.org/</a>).

As is always the case, things worked until they started to become brittle. See my blog post "<a href="/blog/migrating-a-nodejs-cli-to-rust" target="_blank">Migrating a Node.js CLI to Rust</a>" to learn about the challenges, and how and why I migrated the CLI to Rust.

## A CLI is a 🐇, a web app a 🐢

Developing, and more importantly maintaining, a CLI is faster in any way you can think of.

All you need to get started is an API to interface with your backend systems. That is required no matter whether you develop a CLI or web app, so take care of that first 😊.

### Time to market

When you launch a new product, speed matters. Time to market is your "make it or break it" moment before you have customers, but equally so after you have customers.

It takes a day to develop and release your first useful CLI and that includes a short morning walk. I wrote how to do that in <a href="/blog/migrating-a-nodejs-cli-to-rust#sprint-from-zero-to-release-on-day-1" target="_blank">Sprint from zero to release on day 1</a>.

Not only is it quick to get started, maintaining a CLI is also significantly less effort. There is no (very little) design work required because technical people already know how to use CLIs. There is no need to discuss a button's border radius or the darkness of a modal's backdrop or spiritual-figure-of-your-choosing forbid whether the y-padding for secondary buttons should be 4 or 6 pixels.

So build that CLI, make it a first-class citizen, give it the priority it deserves, and you are off to the races.

### Documentation

To document a CLI, you automate the process (e.g. with <a href="https://crates.io/crates/clap_markdown" target="_blank">clap_markdown</a> if you use Rust, and you probably should in 2025 and beyond). Done.

To document a web app, most startups don't or don't keep it updated. The ones who do write good documentation and do keep it updated spend a good portion of their time doing so.
Doing a good job at documenting a web app begs the question of "Why?" though. Why document a web app when you already spend *so much* time designing and developing it? Until you reach 5m ARR, invest all that time into a better CLI.

My advice for startups who do think they need a web app in the early days: Add docs inline, make it part of the product. It is still not guaranteed to be kept up-to-date, but chances are higher than docs that live in a separate place from the production code.

### Cost

_**Development**_

To add a new feature to a CLI, you need a developer who adds the feature.

To add a new feature to a web app, you need a designer (UI/UX, asset creation, responsive design considerations) and a developer. One other cost to keep in mind is design trends. Let's say it takes you 4 - 5 years to reach $5m ARR, it is likely your web design from today looks outdated a few years from today, so you will need to deal with that in one way or another which results in more effort, more costs, and more delays.

_**CI/CD**_

For a CLI, you need time to build the CLI binaries. It is a simple pipeline to build binary artifacts for various operating systems. For CLI tests, you execute the command with the newly built binary and verify the output and optionally the state in the database.

For a web app, you need time to build the web app. For web app tests, you either wait for a preview deployment to be ready or start a preview build on the CI server. If you test against a preview deployment, you also need a database somewhere your preview deployment can access.

_**Runtime**_

A CLI costs you nothing to run and nothing to host the binary artifacts (e.g. as a GitHub release or on Cloudflare R2).

A web app needs to be hosted somewhere, so you pay $x per developer who needs access to that hosting service, $x for egress, compute, whatever it is you are charged for these days to host a web app. Unless you fully embrace feature flags, you likely also incur costs for a staging environment.

**Observability**

A CLI produces telemetry data you need to store somewhere, plus a tool to inspect said data.

A web app also produces telemetry data, but also requires periodic uptime checks, some sort of real-time user monitoring, performance monitoring.

### One exception: Distribution

When it comes to distributing a CLI, it is without a doubt the turtle in the story while the web app is the rabbit or to be more clear, the cheetah.

If you release a new version of the CLI at noon today, you have no idea when people will upgrade. You can of course force people to upgrade, but **use this carefully as it will instantly break your customers automations!**

On the other hand, if you release a new version of a web app today at noon, you know everyone will use the latest version the next time they load your web app. However, web apps do have an issue of being stale too which is very often ignored by developers. If a customer opens the web app at 11:55am and keeps the browser tab open until past noon, they will use a stale version. This may or may not cause an issue.

## Automation

> Build a web app and give your customers one way to use your product.<br/>
> Build a CLI and give you customers infinite ways to use your product.

As simple as that 😊.

It is not only your customers though who can automate their workflows, but your teams as well. The one or two people support team at a &amp;lt; $5m ARR company likely comes up with more ways than you can think of to improve their productivity if you give them a CLI.

## Follow basic CLI guidelines

There are CLIs from the 1980s and then there are CLIs from 2025 onwards. You want to build a 2025-onwards CLI. A must-read page is <a href="https://clig.dev/" target="_blank">Comman Line Interface Guidelines</a>.

Read it, make sure your CLI follows these guidelines, and you already have a CLI that stands out and is better in many ways than what your competitors have.

Because CLIs have been around for decades, there are certain expectations technical people have of CLIs. If your CLI does not conform to that, it quickly becomes an unnecessary friction your customers will not appreciate.

## Add bells and whistles to your CLI

Take 15% of the time and money you save by not developing a web app and invest it into making your CLI shine. Most CLIs out there today are plain old 1980s-style CLIs. Boring, black & white, text-only, and they get the job done.

Luckily, it does not take much to stand out. Here are a few features that add value:

- Display the CLI's changelog (<a href="https://bsky.app/profile/mootoday.com/post/3lgaypql74c22" target="_blank">here is a video of how I made it look</a>)
- When an error happens, prompt for feedback and provide an option to never ask again
- Check for new CLI versions automatically and offer to self-update the CLI
- Provide context-aware help and examples
- Support a `--debug` flag to show debugging output

Also see <a href="/blog/migrating-a-nodejs-cli-to-rust#the-perfect-cli" target="_blank">The perfect CLI</a> where I shared a few more features to help you stand out.

## Security

A CLI is as secure as your API interface.

A web app introduces an extra layer of potential security vulnerabilities. See <a href="https://owasp.org/www-project-top-ten/" target="_blank">OWASP Top Ten</a> to get an idea of the types of web application security vulnerabilities that exist.

## Conclusion

The decision to build a CLI is not only about technical preferences. If done well, it is a strategic advantage.

Do you remember the `now` CLI, by Zeit? It was Vercel's (prev. Zeit) first product (afaik) and to this day one of my favourite examples of how a CLI-first product can be very successful. Developers loved and used `now` because it was simple, it worked, it was fast, and it did the job better than alternative solutions that provided a web interface.

There is also `flyctl` from <a href="https://fly.io/docs/flyctl/" target="_blank">fly.io</a>. Their CLI is as comprehensive as it gets and a must-study CLI to learn from. 

More recently, `ssh terminal.shop` demonstrated how a CLI-only approach to e-commerce can challenge decades of "e-commerce best practices".

These success stories aren't accidents. They reflect a deep understanding of technical users' needs:
- Speed and efficiency over fancy interfaces
- Automation capabilities over point-and-click workflows
- Reliable tooling over trendy designs

Until you reach $5m ARR, every hour spent on development should maximize impact for your technical customers. A well-built CLI lets you:
1. Ship features faster
2. Maintain less code
3. Enable powerful automations
4. Focus on core functionality
5. Build a foundation that scales

I have seen startups spend months building a web interface for something that could have been a few days of work if it was a CLI instead. The reasons for that are manifold.

Know your audience. If they are technical, you may likely go a long way with a solid CLI built with best practices in mind.

Ready to start? Check out the CLI Guidelines at <a href="https://clig.dev/" target="_blank">clig.dev</a> and <a href="https://bsky.app/profile/mootoday.com" target="_blank">follow me on Bluesky</a> to learn more about CLIs (and full-stack web development).

👋
