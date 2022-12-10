---
title: "How I wrote 214 pages for a web development book with 19 pull requests in 3 months"
slug: "how-i-wrote-214-pages-for-a-web-development-book-with-19-pull-requests-in-3-months"
summary: "An in-depth journey report of the last three months when I wrote the Cloud Native Web Development book. Why did I write it? How did I develop the source code? Why do I self-publish? What has the post-publication experience been like?"
createdAt: 2020-07-03T20:26:33.694Z
tags: ["book", "cloud", "cloud-native", "web", "development", "webdev", "community", "self-publish"]
layout: blog
---

<script>
  const assetsBasePath = `blog-posts/${slug}`;
</script>

Photo credit: [Florian Klauer](https://unsplash.com/@florianklauer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

## About the book

The best place to learn about the book is on its [landing page](/cloud-native-web-development). It contains
details of the content, a list of each chapter, reviews and more.

![Cloud Native Web Development cover]({assetsBasePath}/2.jpg)

In short: Cloud Native Web Development is a hands-on guidebook that walks readers through the entire end-to-end
process of developing, testing, deploying and monitoring a cloud-native web application.
**Everything you need to know, packed into a single book.**

Each hands-on chapter comes with a corresponding pull request on GitHub. All readers are part of a private GitHub
organization where they can collaborate together, ask questions and exchange their experiences.

## Writing and self-publishing the book - my journey

### 2000 until early 2020

A book like Cloud Native Web Development cannot be written over night. It's twenty years of work experience,
numerous failures, a handful of successes and a personal desire to continously grow and expand my knowledge.

For the past few years, I repeatedly thought I would like to write a book about everything it takes to run a
web application in production. There are tutorials, video courses and guides available online for any topic
you can imagine. Need to compare React and Svelte? You'll find
[plenty of tutorials](/blog/why-i-moved-from-react-to-svelte-and-why-others-will-follow). Want to learn SRE
(site reliability engineering) best practices? [Check here](https://landing.google.com/sre/books/).

However, unless you know what to look for, you won't succeed because there are so many pieces to the puzzle,
it's challenging to know where to start.

### February 2020

With COVID-19 spreading across the globe and governments putting countries into lockdown, it became immediately
apparent that this is not like a previous pandemic. I had two options:
* worry, feel anxious, be unsure what to do
* look at it as an opportunity

I was privileged enough not to worry, not to feel anxious. So I went for the second option and decided to make
the best of the situation.

It was now or never to write a book. Luckily, my wife supported me all the way, otherwise this would have never
been possible. In fact, she encouraged me to spend as much of my spare time on the book because she knew how much
it would mean to me to publish that book I had been talking about for years.

The outline of the book had been in my mind for a while already. The tech stack I wanted to use was pretty clear
to me as well. I wanted to use technologies that I believe in, technologies I use in my projects and technologies
I believe are about to become very popular.

**Self-publish vs. using a publisher**

This is a tricky one. Late in 2019, I was contacted by two publishers who asked me to develop a [Svelte](https://svelte.dev/)
online course. When I learned that my take-home pay would be between 12% and 18%, I declined. Now, writing a book
was never about earning a lot or quitting my day job. It was about sharing my knowledge and helping others learn from
my experience. Having said that and knowing my personality, I knew I would make this as perfect as it gets and invest
a lot of time. So why did I reject the publishers? Quite simple, while the financial reward is not the first priority,
I believe my knowledge and two decades of experience is worth something worth paying for. It's still a lot cheaper than
four years at university where you are taught things you likely won't need in real life.

In addition, a publisher provides you with technical reviews. Without sounding arrogant, my book is about my experience,
my view of what's best and my best practices. There are very few people who know my experience better than myself.
It turned out I had amazing technical reviwers among my co-workers and friends, and even a PhD student from Austria
who, by chance, found my website and contacted me. He became the first to fully review line by line and provided
input as valuable as a tech reviewer at a publishing company could have done.

A publisher would have given me a wider reach, but on the other hand, my blog gets 80 to 100 unique visitors per day
from across the world, that's good enough for me to get started.

### March, April and May 2020

From a "behind the scenes" point of view, these months were not exciting. Lots of writing, both the book and the
corresponding source code.

I started with an empty Google Doc, wrote down the top-level chapters and started with the "About the author" chapter. It
was the only chapter I was pretty sure I knew what to write :-). It also helped to turn the white screen into
something that looked like a tiny essay. Anything other than a blank page is better at that stage of the process!

**Development of the source code**

The idea was to give access to the source code to all readers. I wanted to make sure the commit history, the PRs and
everything related to the code was perfect. So how did I manage 105 commits without any mistakes or commit messages
such as "Whoops... try again."?

I had two repositories! A "playground" where I experimented, made sure everything worked and tested things for
individual chapters. In parallel to the experimentation, I wrote the book's hands-on part. When I was satisfied
with the code, I switched to the "clean" repository, the one readers have access to now. I followed the instructions
I wrote in the book. This made sure I was the first person to actually follow along my instructions in the book.
It also meant I wrote the entire book's source code twice - once with lots of experimentation and once in a clean way.
As I'm writing this, I was curious to see how many commits the "playground" repo has and to my surprise... it has 119!
That's only 14 more than the final repo... I could have sworn it would be a lot messier!

**June 2020**

The book's content was completely written some time in early June. At that point, I shared the book with a few more
technical reviewers. Prior to that, I had a few close friends and "Thomas, the Austrian" who provided feedback.
The tech reviews went very well and I felt comfortable publishing the book.

**June 26, 2020**

Two days before the self-imposed publication deadline, my wife suggested we develop a landing page for the book.
"Sure!" She also did some research on book covers and designed the one you see now. Based on that, we developed
the website in the same colors.

**June 27, 2020**

I adjusted headings, aligned them to new pages and updated the table of contents. My wife reviewed it and made
sure everything was properly aligned. My wife got up, looked at me and said, "We need to change the icons in the
book." One day to go... I was surely nervous, but learned over the years that it's best to trust her. I'm glad I
did as the icons now look a million times better than the black & white ones I used previously!

June 27 was a Saturday and we stayed up until 2:30am or so on Sunday morning. When we finally went to bed, we felt
we were ready.

**June 28, 2020**

A few last-minute updates to the table of contents due to changes to page numbers and I downloaded the PDF and
published it on [Gumroad](https://gum.co/cloud-native-web-development).

## Lessons I learned up to this point

**Pros**

I think the best thing I did was starting with a very clear idea in my mind of what I want to write about. I knew
exactly who the target audience would be, I pretty much had all chapters in mind and also knew I wanted there to be
source code and a private community of everyone who buys the book.

Patience & dedication: From the very beginning, I set myself a strict deadline of June 28, 2020 (my birthday).
This project was a big time investment and I knew there is no excuse to delay anything if I wanted to hit that deadline.
The rule I set myself was very clear: Spend as much of my spare time on writing, every day. Looking back at my time
tracking, I wrote at least a little bit every single day.

**Cons**

Writing a 200+ book, with 19 pull requests is a lot of work and I spent a few hundred hours on it. If I write
another book, I will give myself more time. It is more likely though that I would write a shorter book ;-).

Perfectionism is your biggest enemy to get stuff done. Sure, I'm very proud of the final outcome and how each
chapter maps to a pull request and sometimes even individual sub-chapters that map to commit messages. My readers
absolutely love and appreciate this, but it put a lot of pressure on me throughout the process.

## The first week since publication

![Gumroad sales in week 1]({assetsBasePath}/1.jpg)

37 books sold with no advertising other than posting on my Twitter account (500 followers) and LinkedIn.
Given the incredible feedback I received from reviewers, I am confident I will reach a wider audience once
the 37 readers wrap up the book and hopefully provide some feedback on Twitter to help promote the book.

Estimates from reviewers vary between 30 to 50 hours to finish the book, depending on their level of experience
in web development. I'm keen to keep an eye on what happens over the next few weeks and months.

## Final thoughts

Writing Cloud Native Web Development was an incredibly fun project. I learned a lot about writing, publishing,
EPUB (it's basically HTML!), marketing, and what it means to be dilligent and stick to a strict schedule.

Would I do it again? Possibly, but not in 2020 :-).

Please head over to the [book's page](/cloud-native-web-development) and get yourself a copy!

👋
