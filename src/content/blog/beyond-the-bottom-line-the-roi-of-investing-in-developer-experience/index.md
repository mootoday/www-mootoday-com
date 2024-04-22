---
title: "Beyond the Bottom Line: The ROI of Investing in Developer Experience"
summary: Excellent developer experience leads to excellent customer experience. Learn what to look for and how to improve your internal and external developer experience.
createdAt: 2024-04-22T06:15:13.067Z
featured: true
---

<script>
	import TimeMeasurements from "./time-measurements.svelte";
</script>

**Key takeaways**

* Great developer experience is a competitive advantage on many levels.
* Measure how long it takes to fix a spelling mistake, improve from there.
* Manual and automated processes break, but only with automated processes do you know when they break.
* It is all an ever-moving target, keep up and make it a priority.
* Send me a link to your open source project and I will reduce your onboarding to a single command.

> 🙏 Thank you to <a href="https://twitter.com/mohsenari" target="_blank">@mohsenari</a> for the detailed reviews and the valuable feedback throughout the creation of this blog post!

Developer experience, DX, DevX, platform engineering – it comes in many shapes and forms, but at its core it refers to **the interactions and feelings a developer has while using or working on a product**.

As obvious as it sounds given the name, the focus of developer experience is to improve a developer's experience with your product.

When we talk about developer experience, it is important to differentiate between **[internal](#internal-developer-experience) and [external](#external-developer-experience) developer experience**.

## Internal developer experience

As the name implies, this chapter is all about how to improve your own developers' productivity, reduce their cognitive load, and provide overall great day-to-day satisfaction. For open source projects, "internal" applies to anyone who contributes to the project.

The following chapters discuss various promises and what you can do to make these promises come true.

### Faster time to market

**The promise**: Ship impactful, high quality software faster.

**How to achieve it**: Create a checklist of every task that is required to fix a spelling mistake in production (see below for a template). Measure how long each of these tasks take.

Review the time measurements with the team and brainstorm how to accelerate each task. Repeat this process every three to six months.

**More context**: Faster time to market can be measured and improved easily. First, measure how long everything takes. Without a baseline, you do not know what you do not know. From working with dozens of companies, I learned many significantly underestimate how long various tasks take.

Start with the macro level and work your way down to micro tasks. The most important measurement to start with:

> **How long does it take to fix, deploy, and verify a spelling mistake?**

Before you continue, carefully think through that process as it relates to your project and adjust the list of tasks below accordingly.

How long do you think it takes to work through these tasks? Ask your boss (and their boss if applicable) too. Write it down, you are going to need it soon :-).

Now, go ahead and actually work through your task list and track how long each task takes (write the duration in seconds). If you do not have a spelling mistake, improve the wording of an error message instead.

<TimeMeasurements />

> The **total time** you get by doing that is **the minimum amount of time it takes to make a small code change**.

Any feature more complex than fixing a spelling mistake takes more time!

That is your baseline. Check your notes, how close is it compared to your estimate from earlier? How close were your boss and their boss? From personal experience, everyone is off by 20%+, with people higher up in the reporting chain being further off from the actual result.

From this point on, your goal is to lower how long individual tasks take. You might be surprised how much you can automate to improve this end-to-end process significantly.

> Feeling overwhelmed? Reach out and let me and my team take care of this for you. See <a href="https://onboarding.webstone.app" target="_blank">onboarding.webstone.app</a>.

### Improved quality of work

**The promise**: Teams with a strong focus on developer experience ship fewer bugs.

**How to achieve it**: Invest in a robust, reliable, actively maintained testing infrastructure.

Write more maintainable code by experimenting with pair programming –at the very least, you know two people understand the code rather than only one.

Remove any friction from a developer's daily tasks and before you know it, people have the mental capacity to experiment with features or improvements. You never know what individuals may come up with!

**More context**: Quality in software development is often associated with bugs. That is likely because bugs are tangible, they are easy to understand and can be counted. From personal experience, teams with a strong focus on their developer experience ship fewer bugs. That is the case because they not only rely on their tests and automations, but also regularly verify what they do is the best they can do.

Let us go beyond bugs though, to areas that are much more difficult to quantify or measure, but are equally important.

The first area is **code maintainability**. We read more code than we write, without a doubt. Teams I have worked with who are actively aware of that as they write code make it more pleasant for themselves and their team members to contribute to someone else's code without scratching their heads. For every "Wait a sec, what is going on here?" moment, time is wasted and the likelihood of bugs being introduced increases. With the right team members, pair programming is an incredible way to ensure code is written in a way that is easy to understand. Why? As the code is written, there are at least two people who have to agree what is written is understandable.

> On a slightly unrelated note: Pair programming may eliminate the need for pull request code reviews, which often artificially slow down the software development lifecycle significantly.

Unfortunately, pair programming requires people to leave their ego at the door. This is very hard for certain people, in which case pair programming is incredibly painful for the other person... How do you know if someone is great at pair programming or not? When I hire software engineers, I do not give them a take-home assignment (they are a waste of everyone's time, IMHO). Instead, I or a team member pair program with the candidates for 30 - 45 minutes.

The other area is that excellent internal developer experience leads to **more innovative solutions**. Just like with code maintainability, how do you know if the effort you invest in internal developer experience leads to more innovative solutions?

The simpler answer: You do not know until you improve your internal developer experience, wait for three to six months and look back.

What can companies expect though? Remove any friction from development teams and suddenly, instead of being exhausted by the daily little annoyances, teams have extra mental capacity to experiment with the product. I have seen it many times where a team member sends a message saying something similar to "A thought crossed my mind and I quickly whipped something up this morning. My experiment resulted in 25 percent faster request handling." Instant customer impact right there, besides cost savings!

But for the love of [insert your religious figure of choice], do not mandate company-wide hackathons! They may be fun for little children who recently learned how to write software or people who have no other interests in life. If your project is easy to experiment with and your team feels excited, experiments with incredible results will happen organically. I have experienced it and it was awesome!

If you really, truly believe your company needs to run a hackathon: make attendance optional.

### Positive company culture

**The promise**: Happy, highly satisfied team members spread their happiness to friends & social media, leading to higher quality hires and increased inbound customer interest.

**How to achieve it**: Experiment with a 4-day work week – you will be surprised that time to market is not impacted, but instead people have more energy to build quality software. Try every week, every other, once a month, whatever you feel comfortable with.

Cancel unnecessary meetings. Got a weekly All Hands scheduled, but nothing to talk about? Say so, cancel it, tell people to go for a walk instead. That hour would have been "wasted" (from a company's point of view) regardless of whether the All Hands without much content happened or not.

**More context**: Ah, company culture. I could write a separate post about that topic and how companies are not families etc 😅. For now though, the focus is on how internal developer experience improves whatever it is you consider your company culture.

For the sake of this chapter, I define company culture as follows:

> Whatever it takes to make a group of people who work on the same project as happy and satisfied as possible for the duration they work together.

If your development team has a great time on a daily basis, they will tell their friends and share their experience on social media. They will reply to "#fail" posts on 𝕏 saying "Not at @company, we solved this by ..." This is a company's best talent acquisition strategy!

However, this only works wonderfully as long as people have a great time and internal developer experience is continuously valued and focused on. Hire someone who does not care as much or even worse, a non-engineer who introduces tedious, unnecessary processes or any sort of friction, and things go downhill much quicker than they went uphill! People who brought their friends to the team will suddenly leave and before you add 1+1 together, you find yourself with a group of new people who have none of the tribal knowledge your initial engineers had. Costly to say the least.

There is another benefit to happy team members: It may attract new customers. In a past role, I selected one vendor over another based on how their team members talked about the company publicly – given equal satisfaction for all other evaluation criteria. Think about it, who would you rather work with? A company where employees happily talk about their experience or a company where you have no insights other than the marketing team's carefully curated material?

## External developer experience

In this chapter, we dive into how external people perceive your product. There is some overlap between external developer experience and overall user experience. However, the former focuses on technical individuals who work with your product while the latter includes any audience that interacts with your product, which includes your marketing material, email campaigns, events, web interfaces, etc.

Remember, focus on internal developer experience (see above) first, at least give it one pass to remove the biggest daily frictions. The topics we are about to discuss can be achieved much easier if the team is already used to a great internal developer experience.

### Lower friction leads to higher product adoption

**The promise**: The quicker developers experience your product, the more likely they are to adopt it.

**How to achieve it**:

*For APIs*: Provide an [OpenAPI spec](https://spec.openapis.org/oas/latest.html) and with it, leverage [Swagger UI](https://swagger.io/tools/swagger-ui) and [Swagger Codegen](https://swagger.io/tools/swagger-codegen).
In addition, provide [Hoppscotch](https://hoppscotch.io) and/or [Postman](https://www.postman.com) collections for your API endpoints.


*For [GraphQL APIs](https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme)*: Expose a GraphiQL interface for developers to explore your API.

Ideally, expose a sandbox environment that is highly rate limited but does not require authentication.

*For SDKs*: Automate the process to provide SDKs for as many programming languages as possible. One way to do that is with [Swagger Codegen](https://swagger.io/tools/swagger-codegen).

Display these SDKs prominently in the docs so people can find them with a click or two.

*For CLIs*: Let people install your CLI with `curl https://your-domain.com | sh` and provide a default command that guides people through the onboarding, i.e. `my-cli` without any arguments or flags kicks off an interactive wizard. To learn how to do that, [see my instructions here](/blog/curl-your-landing-page).

*For web interfaces*: The best place to let people experience your web interface is on your website's landing page (e.g. [melt-ui.com](https://melt-ui.com/)).

The second best place is behind a Sign Up button that provides SSO options and does not require a credit card or any additional setup steps.

**More context**: With every click, every second looking at a spinner, every command to run, a certain percentage of people drop off and look for an alternative solution. Regularly review that initial impression and brainstorm what can be done to improve the experience further.

Regardless of how developers use your product, **be predictable**. For CLI commands and API endpoints, use nouns and verbs your target audience understands. Use the same verbs for all commands. For example, if your CLI has a `projects list` command, it should also have `users list` and `services list` commands. If you provide `projects list`, `users show --all` and `services all` commands, I can guarantee your business is losing customers.

The same predictability applies to a web interface. Lists of projects, users, and services should look & feel alike, except for different table columns. If one uses a list of cards vs a table, all should use cards vs a table. The same applies to project, user, and service detail pages. Define and follow design patterns.

### Community growth

**The promise**: Developers who like your product invest their time in answering questions, contribute to documentation, and generally advocate on your behalf.

**How to achieve it**: Decide where you want to provide public support for your product. Choose a medium where anyone can contribute, such as a Discord server or GitHub Discussions. Do not use 1:1 chats, emails, or Slack workspaces.

Be present, answer questions, share your roadmap, release changelogs, publish announcements. Have your customer success or engineering team members be present too. Developers love to hear from the people who build a product they use, leverage that fact. Most importantly: be open and transparent.

**More context**: The days where companies developed software behind closed doors and occasionally emerged to present a new version are long gone. Developers, and people in general, value transparency and involvement now more than ever. A public forum for customers and product developers to mingle opens doors that simply do not exist without that direct connection.

It is a win-win where developers who use your product feel valued and heard while you get feedback from the most important people possible: your customers.

The more superfans you have, the less there is to do in that public forum for a product team. Over time, people organically help each other. The key is *over time*... You do have to invest time upfront to ensure it is a place where people feel safe, heard, and valued. It is well worth the effort though.

### Advocacy

**The promise**: Developers wear a dozen hats and value great products that make their life simpler. When they find such a product, they love talking about it.

Crucially though, developers also like to trash products that are, well, trash. Watch out for that, you can often spot when things go downhill if you pay attention.

**How to achieve it**: Monitor your public forum (see previous chapter) and social media. Engage with people who mention your product, both in positive and negative scenarios. Let technical people reply to technical content to match the language and provide details and insights your marketing or support teams may not have.

If things went wrong in whatever way, publish a thorough post-mortem. Developers love reading them and you may very well end up on Hackernews or Reddit where you can gain invaluable insights from the comments.

**More context**: There is not much more to say :-).

### Ecosystem development

**The promise**: Develop your software with extensibility in mind and the sky is the limit of what people will do with it.

**How to achieve it**:

*For APIs*: Version your APIs and do not introduce breaking changes without changing the API version. There is not much more frustrating than for someone to build an integration on top of an API only to discover it changed without notice, breaking their code and impacting their customers.

Allow for user-defined output formats, e.g. JSON or YAML. Decide on a format you use internally (e.g. JSON), but allow external developers to specify the output format for each request (e.g. YAML). If YAML is requested, convert your internal JSON structure to YAML right before you send the response. For incoming requests, convert the incoming YAML to JSON in the request handler and continue any further processing based on the JSON representation.

*For CLIs*: Include a `CHANGELOG.md` in each release and strictly follow [semver versioning](https://semver.org).

Provide human and machine-readable output. Tables, colors, spinners, etc. are great for humans, but add no value when someone, for example, wants to pipe a CLI command's output to another script.

Every command must be 100 percent non-interactive when machine-readable output is requested. For example, `my-cli users create` without any flags may invoke an interactive wizard whereas `my-cli users create --output json --name "John Doe"` prints no output other than whatever is documented as the success / error output of this command.
A note on errors: `my-cli users create --output json` should exit with a non-zero exit code and machine-readable output of an error mentioning that a `--name` command flag is required.

Consider support for a plugin ecosystem. Develop your CLI so that anyone can extend it with additional commands by placing their command's code in a certain location on the file system. An incredible example of how to do this right is [Gluegun's plugin system](https://github.com/infinitered/gluegun/blob/master/docs/plugins.md).

*For web interfaces*: Yes, even web interfaces can be extended by external developers. Either with bookmarklets or browser extensions. To support these extensions, one approach is to provide `data-*` HTML attributes on various elements.This lets anyone who wants to add functionality hook into your web interface and extend it as they wish.

**More context**: Extensibility is a powerful, yet often underestimated secret competitive advantage. Your team may be excellent, but there are always passionate developers who use your product and find ways to improve it in ways you cannot imagine. Take [Raycast](https://www.raycast.com) for example: They make it very simple for people to write extensions. If your API, CLI, or web interface allow developers to easily hook in, they may develop a Raycast extension you would not have thought of or prioritized internally. By the way, if you find such an extension for your product, reach out to the developer(s) and offer them to sponsor their work – it's the right thing to do as a business who profits from other people's work.

### Reduce support costs

**The promise**: A self-explanatory product with impeccable docs leads to fewer support tickets.

**How to achieve it**: Constantly improve the developer experience based on questions in your public forum (see above), support emails, ad-hoc conversations, etc. This means, engineers should rotate or at the very least have access to your customer success team's tools & processes.

The majority of questions you get should be answered with a link to your docs. If an answer does not exist in the docs, update the docs, then reply to the customer with the link to the docs.

**More context**: As information travels, details are lost. What a customer tells your support team member is not the same as the support team member writes in an internal engineering ticket. Even that is not the same as what the developer reading said ticket understands. The best way for developers to experience what customers experience is for developers to read customer emails or watch user feedback video recordings.

This can be achieved asynchronously, or as part of a rotation where engineers work as part of the support team a day a week / month / etc. Perhaps it is that each engineer answers one customer email per week, there are many ways to achieve that.

Anyone, technical or not, at your company should be able to update the documentation without friction and do so whenever they see a gap.
A person on the sales team gets a question about pricing? Check docs, update docs if information is missing.
A person on the marketing team is asked about a past event the company attended? Check docs, add events calendar if it does not exist.

### Competitive advantage

**The promise**: A better external developer experience, despite missing features, leads to more customers.

**How to achieve it**: Apply all the suggestions from the chapters above.

**More context**: You have to select one of the following two companies:
* *Company A*: Provides all the features you need today, but you cannot get started unless you read the docs, create an account, provide a credit card and "schedule a quick call with one of their sales experts"
* *Company B*: Provides most of the features you need today, but you can get started within minutes and experience the product. You also see the missing features listed on the roadmap, along with past velocity, including a public status page with detailed postmortems on what went wrong.

Your choice :-)

## Suggestions you can apply today

### Open source everything that is not "secret sauce"

Is your marketing website open source? What about your docs? Open source both today. If you feel uncomfortable, why? Fix what makes you uncomfortable, then open source the code. Increased transparency leads to increased trust!

Add an "Edit this page" link to every page in your documentation. Make it a one-click effort so anyone can fix spelling mistakes, suggest better wording, etc.

There is going to be a bit of management overhead with public source code, but as is the case with anything else we discussed in this article, you iterate and improve on it as the need arises and it will pay for itself.

Do customers have access to your roadmap? Why? Why not? Are you worried your competitors will launch a feature before you do? If you really think you have a killer feature you want to keep secret, omit it from the public roadmap – just do not make it a habit to hide 90 percent of the features...
With a public roadmap, let customers provide their prioritization preferences. Make it clear this is no guarantee to develop features as they request them, but it provides an extra signal your product team can take into account.

### Deluxe error messages

> ❌ Something went wrong. We are looking into it.

> ✅ The user could not be created. We had an issue connecting to the database. Please try again now and one more time in five minutes. If the error persists, please contact us at oops@domain.com and include this request's ID: 1247e403-8dcd-4872-abd2-1a4287cf147d. You can also learn more about this error at https://docs.domain.com/e/database-connection-issue.

In your code, centralize error handling. Work with internal unique error codes and map these codes to verbose error messages as shown above. Also centralize all links to docs and have an automated process that verifies a GET request to each link returns a 200 OK HTTP response code.

### Show docs within your product

An easy, non-intrusive way to have context-aware documentation is by providing a `?` tooltip next to important areas in the web interface.

Another approach is a drawer that slides in/out with page-specific documentation.

As a last resort, and still better than nothing, you can provide links to documentation that open in a new browser tab. Remember though, there is a potential a user navigates to the newly opened browser tab, gets distracted and ends up on their social media site of choice, not returning back to your product.

## Conclusion

Internal & external developer experience is key to business success. It impacts everything from customers, to retention, to sales, to support, and of course developers.

There is a lot to it, as you can tell by the length of this article 😅. My team and I have done this kind of work for years and helped businesses worldwide to improve their developer experience.

We always start by improving a project's onboarding. It is the first experience new hires and customers have with a product and with that, it is the most important aspect to polish to perfection.

From there, we dive into the daily processes and work closely with your team to improve internal & external developer experience.

**What is next?**

Return to the tasks list above and start to reduce individual task's duration. Another fairly low-hanging fruit is to improve your error messages as discussed in [Deluxe error messages](#deluxe-error-messages).

Another idea: Contact me. My team and I will provide in-depth feedback on your existing developer experience. For many years, we have helped businesses reduce their project onboarding to a single command!

**If you have an open source project, send me a link to the repository.** We are going to reduce your project onboarding to minutes and send you a recording of what that looks like for your project. If you like what you see, we work together and my team and I help you improve your developer experience across your product(s).

Learn more at <a href="https://onboarding.webstone.app" target="_blank">onboarding.webstone.app</a>.

👋