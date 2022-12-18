---
title: "I am writing a book: Cloud Native Web Development"
slug: "i-am-writing-a-book-cloud-native-web-development"
summary: "I am writing a hands-on guidebook on how to develop cloud-native web applications."
createdAt: 2020-05-10T00:00:00.000Z
tags: ["webdev", "cloud", "book", "javascript"]
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

<!-- Photo by [Paul Hanaoka](https://unsplash.com/@plhnk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/book-cover?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) -->

On February 28, 2020 I decided to write a book - that was 10 weeks ago. Due to the COVID-19 lockdown, I did not have many opportunities to leave home and spent a good amount of my spare time writing a book and all the source code that comes with it.

One week from today, on **May 17, 2020, I am going to start pre-orders with the first 100 copies at a 50% discount**! If you would like to get notified, please follow me on Twitter ([@mikenikles](https://twitter.com/mikenikles)) or at [https://gumroad.com/mikenikles](https://gumroad.com/mikenikles).

## Why write a book?

I have developed, tested, deployed and maintained many web applications. With every line of code written, every reported bug fixed and every production outage resolved, I learned something new. I like to share what I have learned, make sure others can fast-track their projects and use my experience as a starting point for their own businesses.

The internet provides in-depth expert advice on pretty much any topic, but you need to know what to look for. The reason I write this book is because I see a lack of comprehensive end-to-end guides on how to develop a web application from scratch. From the initial `git init` to production support and anything in between.

## What is the book about?

Web applications once were static HTML with CSS and a backend that processed form submissions. Fast forward to today and web development is more complex than it has ever been. With new frameworks, technologies & reusable code packages appearing (what feels like) weekly, where do you begin?

In this book, we will walk through the end-to-end process of developing a cloud-native web application. You will learn technologies, processes, tips & tricks and gain hands-on experience. You will find out about mistakes made (so you can avoid them) by the author based on his two decades of experience in developing web applications.

Links to additional resources such as videos, blog posts and articles are provided where necessary to give you an opportunity to dive deeper into topics of interest. These are resources I found useful and wish I had found earlier.

The book starts with introductions to technologies used throughout the book and explains what alternatives are available.

* [Svelte](https://svelte.dev/) to develop the web application
* [Sapper](https://sapper.svelte.dev/) as a static site generator
* [Tailwind CSS](https://tailwindcss.com/) for styling
* [Firebase Hosting](https://firebase.google.com/docs/hosting) to host the web app
* [Cypress](https://www.cypress.io/) for component and end-to-end testing
* [Node.js](https://nodejs.org/en/) services deployed to [Cloud Run](https://cloud.run/) on [Google Cloud Platform](https://cloud.google.com/) to deal with asynchronous tasks (e.g. send a welcome email to new users)
* [Cloud Firestore](https://firebase.google.com/docs/firestore) for data persistence

The second part is hands-on, with pull requests that correspond to individual chapters in the book. All readers are part of a community and can collaborate among themselves and with the author.

We will start with a basic boilerplate, configure a CI / CD pipeline to test and deploy the web application and add feature toggles to ensure frequent deployments to production are fearless. For visibility, we will set up production monitoring & alerts and discuss how to perform rollbacks should that become necessary.

A big part is going to be how to test the web application. Component tests and end-to-end tests to make sure new features don't introduce regression bugs. To have the most impact, tests are going to be part of the continuous integration pipeline and deployments will not happen if a test fails.

We will configure Tailwind CSS to style the pages and components and wrap up the second part by learning about user authentication and how to interact with a database to persist and load data.

### Five evenings and two days to go

There is still some work to be done between now and Sunday! Complete and extend certain chapters, process the reviewer feedback, design a cover page (anyone wants to help?), read the book a few more times to make sure it reads smoothly and each step makes sense given its context.

## Table of contents

I'm leaving you with the entire table of contents as it stands at the time of this writing. If you have any feedback at all, please do let me know! (Apologies for the formatting...)

## About this book

### The author

### Why write a book?

#### What is this book not?

### What does this book cover?

#### Part 1: Technologies, Tools & Processes

#### Part 2: Develop a foundation

### Audience

### Source code

### Stay Informed

Part 1: Technologies, Tools & Processes
=======================================

Topics you will learn
---------------------

What is cloud-native?
---------------------

Guiding Principles
------------------

### 1\. User experience

#### User interface

#### Performance

#### Mobile

### 2\. Team Productivity

### 3\. Automation

#### Scripts

#### Tests

#### CI / CD

Development Environment
-----------------------

### gitpod.io

### GitHub

#### Why?

#### Alternatives

Frontend
--------

### Svelte

#### Why?

#### Alternatives

### Tailwind CSS

#### Why?

#### Alternatives

### Firebase SDK

#### Why?

#### Alternatives

Backend
-------

### Sapper

#### Why?

#### Alternatives

### Google Cloud Platform

#### Alternatives

Database
--------

### Cloud Firestore

#### Why?

#### Alternatives

CI / CD
-------

### GitHub Actions

#### Why?

#### Alternatives

Testing
-------

### Cypress

#### Why?

#### Alternatives

### Testing Library

#### Why?

#### Alternatives

Monorepo
--------

#### Why?

#### Alternatives

Part 2: Develop a foundation
============================

Introduction
------------

A monorepo template to start with
---------------------------------

### Monorepo directory structure

### Create a new Github project

### Summary

Add the Sapper template
-----------------------

### Clone the repository

### Create a new branch

### Add the web service

### Create a pull request

### Summary

Hosting on Firebase
-------------------

### Create a Firebase project

### Set a resource location

### Register your app with Firebase

### Add the Firebase SDK to the web application

### Install the Firebase CLI

### Log in to Firebase

### Initialize Firebase CLI

### Deploy to Firebase Hosting

### Deploy the web application

#### Server-side rendered web application vs static site generators

#### Manually deploy the Sapper web application

### Summary

Set up the continuous deployment pipeline
-----------------------------------------

### Why now? We haven't developed anything yet

### GitHub Actions

### Set up GitHub Actions

#### Create a FIREBASE\_TOKEN secret

#### Create an encrypted secret on GitHub

### Test the new workflow

#### Enable workflow optimization

### Summary

Local Development
-----------------

### Summary

Feature Toggles
---------------

### What are feature toggles?

### Feature toggles to release unfinished code

### Firebase Remote Config

#### Initialize Remote Config

### Set up our first feature toggle

#### Svelte stores

#### A feature toggle store

### Configure feature toggles

#### Manage groups in Remote Config

### Summary

Production monitoring
---------------------

### Create an uptime check

### Create an alert policy

### Summary

Rollbacks
---------

### Fix Forward

### Summary

Testing
-------

### End-to-end tests

#### Write new end-to-end tests

#### Organize your tests

#### Run tests in headless mode

#### Summary

### Component tests

#### Configure Cypress Svelte component tests

#### Write a Svelte component test

#### Run Cypress component tests

#### Summary

#### Use Testing Library

#### Summary

### Generate product videos

### Cypress Dashboard

#### Configure Cypress to record tests

#### Record the first successful test

#### Record the first failed test

#### Summary

### Enable tests in the continuous integration pipeline

#### Validate the CI pipeline

#### Summary

#### Enable pull request integration

#### Commit a failed test

### Summary

### Tailwind CSS

#### Initialize & configure

#### Create a Tailwind CSS component

#### Use Tailwind CSS in Svelte components

#### Use Svelte components to abstract utility classes

#### Summary

### Database

### User authentication

### Connect a custom domain

### Summary

### What's next?