---
title: "What was the biggest blunder in your career as a developer?"
slug: "what-was-the-biggest-blunder-in-your-career-as-a-developer"
summary: "A twenty year tech career retrospective of what I would do differently and why."
createdAt: 2020-08-20T12:47:18.287Z
tags: [""]
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

Photo credit: [NeONBRAND](https://unsplash.com/@neonbrand?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

## What inspired this blog post?

Florin Pop (follow him [on Twitter](https://twitter.com/florinpop1705)) asked the following question (see [thread](https://twitter.com/florinpop1705/status/1296392762347094018)):

> What was the biggest blunder in your career as a developer?

My snarky response was that Twitter doesn't provide enough characters to answer that question. Pushed by [Brian Andersen](https://twitter.com/Brianmanden), here I am writing this blog post :-).

I am going to expand on the question and include things I generally handled badly and would not let happen again.

*4 years ago, I wrote a related blog post: [Ever wondered why your best employees leave?](https://www.mikenikles.com/blog/ever-wondered-why-your-best-employees-leave)*

## Non-technical

### Share my current salary

I was young and naive and didn't know how recruiting worked. After a few months, I started to participate in technical hiring interviews and by chance got to see a candidate's offer with a salary quite a bit above mine... I asked HR to at least match my salary, without success. I moveed on.

**Lesson learned**: Never, ever share your current salary. It's nobody's business. You apply for a new role, a new company, a new environment and the salary should reflect what value you bring to that environment.

### Not negotiate my salary

My first job abroad. I thought I was lucky to get hired and have the company's support for my work visa. Again, young and naive.

**Lesson learned**: Always, always ask for more than the company offers. A recruiter's job is to hire you at the lowest possible rate. Remember, they work for the company, not for you! Worst that can happen is they say no and you get what they offered initially - don't give up easily though, they're trained professionals!

### Let micro-managers stress me out

That one makes me laugh when I think about it now 😀. There was a project manager who would constantly walk around, stand behind team members and ask "What's the timeline?" It was worst when customers reported bugs in production. Instead of letting the team focus, he'd be right there explaining how important it is to fix the bug as quickly as possible to keep customer satisfaction high.

**Lesson learned**: First, invest in a noise-cancelling headset! Second, in a retrospective, discuss the behavior and explain how it does not help. Ideally, your team lead is awesome enough to deal with the situation and shield the team from it.

### Working for a family business (twice 🤦)

Yeah well, my advice is just don't do it. It is always about them, their family, their reputation, their success, etc.

The first time around, I didn't know better and it sounded like a fun place to work at. Lots of top-down decision-making led to a fragmented product roadmap with few paying customers.

When I joined the second family business, a former co-worker lured me in with false promises. It was a daddy-sponsored family business where the children were running it.

**Lesson learned**: Stay away. If you want to experience a startup, find one that's run by people who are not related with each other.

### Let someone yell at me in a meeting

Also one that makes me laugh and feel pitty for the dude. I led the engineering team and a wants-to-be-important designer micro-manager yelled at me saying the engineering team needs to deliver software quicker. No other execs in the room would speak up and it was clear there's no hope for them.

**Lesson learned**: If yelled at again, get up and go home. Let people cool down and see what's next.

### Work evenings, nights and weekends

"We need to release the new version."
"It's important to fix that bug tonight."
"The customer is blocked, please get this ready by Monday."

The list goes on. It's very, very rarerly worth it to work evenings, nights or weekends.

**Unless**, you work on your own business! Even then though, don't burn out.

**Lesson learned**: Health & happiness are the most important. Putting that at risk to make someone else's dream come true is dumb.

### Miss my sister's graduation

At the time my younger sister graduated, I lived far away (2 flights, 15 hour travel time) and had only a few vacation days left. I asked my employer for unpaid leave and was told it was a busy time with deadlines to hit, so they can't give me days off.

**Lesson learned**: Family first, that's what the wealthy do too!

## Technical

I am not going to attempt to list what I messed up from a technical perspective. Think of something someone could mess up and I've likely messed it up at some point in my career. A few highlights for the curious among you:
* Deleted a production database?
    * *Yep*, had to pick up a backup tape from the physical vault and re-apply the previous day's backup.
* Deployed a staging config to production, shutting down prod?
    * *Yep*, that one led us to spend some time following the [Twelve Factor App](https://12factor.net/) guidelines and develop automation to mitigate that issue.
* Ran SQL queries without or invalid `WHERE` clauses?
    * *Yep*, that ended in a seamingly endless session with the DBA to restore data.
* Sent an internal email to a customer?
    * *Yep*, that one ended up quite well because I was outlining challenges I saw with the customer's environment. They read the email, agreed and we had constructive discussions on how to improve their environment.

**The most important lesson** I learned throughout my career when it comes to technical blunders is:

> Do not blame individuals for technical blunders - blame the processes, tools and workflows.

This is important and should be the #1 guideline every development team adopts. If your processes and tools allow inividuals to mess up, you failed at putting proper safeguards in place. Period.

👋
