---
title: "SvelteKit & Prisma - A match made in digital heaven"
slug: "svelte-kit-prisma-a-match-made-in-digital-heaven"
summary: "At some point,  your SvelteKit app needs to persist data. Learn how to use Prisma to achieve exactly that."
createdAt: 2021-08-03T03:06:14.591Z
tags: [""]
layout: blog
---

<script>
  const assetsBasePath = `blog-posts/${slug}`;
</script>

**Key Takeaways**
* Most production applications need to persist & retrieve data. Prisma is a pretty genius way to achieve that.
* With SvelteKit, you get client & server-side data fetching - the best of both worlds.
* This all even works if JavaScript is disabled in the browser.
* Template GitHub repo: https://github.com/mikenikles/sveltekit-prisma

## What are you going to learn?

We are going to start with a default SvelteKit application. Once initialized, we will learn how to install and configure Prisma before we will use the PrismaClient to perform create, read, update & delete (CRUD) actions against a local SQLite database.

## Things you need to know

In order to get the most out of this post, I expect you are aware of the following technologies:
* [Svelte](https://svelte.dev/)
* [SvelteKit](https://kit.svelte.dev/)
* [Prisma](https://www.prisma.io/)

## The foundation

Let's start with the basics: A [SvelteKit](https://kit.svelte.dev/) demo app.

I recommend you first create a GitHub, GitLab or Bitbucket project and start a development environment with [Gitpod](https://www.gitpod.io/). Alternatively, you can follow along on your local computer.

```bash
npm init svelte@next svelte-with-prisma
```

When prompted, select the following options:
* "Which Svelte app template?" `SvelteKit demo app`
* "Use TypeScript?" `Yes`
* "Add ESLint for code linting?" `No`
* "Add Prettier for code formatting?" `Yes`

When complete, please follow the "Next steps" listed in the terminal to install dependencies and start the SvelteKit demo app.

If you've followed along so far, you can copy & paste the following commands:

```bash
cd svelte-with-prisma
npm install
npm run dev -- --open
```

That's how quickly you get started with SvelteKit. In your browser, you notice the "TODOS" navigation item. If you play with this list, items are persisted on svelte.dev and deleted after a while.

Next, we are going to add Prisma to persist todo items in a local SQLite database.

## Add Prisma

[Prisma.io](https://www.prisma.io/) states "Prisma helps app developers build faster and make fewer errors with an open source ORM for PostgreSQL, MySQL and SQLite."

From my personal experience, this statement is certainly true. Let's go and experience it for yourself.

### Install & initialize Prisma

First things first: `npm i -D prisma` because, well... without dependencies we won't get very far 😉.

Next, we are going to initialize Prisma. For that, we use [`npx`](https://www.npmjs.com/package/npx) to execute commands.

```bash
npx prisma init
```

> ⚠️ This currently overwrites an existing `.gitignore` file. Keep an eye on [8496](https://github.com/prisma/prisma/issues/8496).

This creates a `prisma` directory at the root of the project. In it, you find the `schema.prisma` file.

At this point, I recommend you install the `prisma.prisma` VS Code extension. It adds syntax highlighting, formatting, auto-completion, jump-to-definition and linting for `.prisma` files.

### Define the `Todo` model

Open the `prisma/schema.prisma` file and add the following model definition to the end of the file:

```toml
model Todo {
  uid        String  @id @default(cuid())
  created_at DateTime
  text       String
  done       Boolean
}
```

Psst... How do we know what fields to define? Well, we take a peek at the `Todo` type definition in `src/routes/todos/index.svelte` 😉.

### Configure a SQLite database

Open the `.env` file (that file was created by the `npx prisma init` command earlier). In it, set the `DATABASE_URL` to `"file:./dev.db"`

We also have to open the `prisma/schema.prisma` file to update the `datasource.db.provider` to `sqlite`.

> Check [the reference docs](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#datasourc) for more details on the above two values and what other databases are supported.

### Create the database and tables

We're making great progress! Let's now use the Prisma CLI to create our SQLite database and create a schema based on the `Todo` model we defined earlier.

It's easy:

```bash
npx prisma db push
```

Give that five seconds ⏳.

I recommend you read through the console output, I find it highly interesting. For one, it gives us a good deal of detail about what's going on. However, it also contains the following output which is one of the reasons I'm mind-blown by Prisma:

```
✔ Generated Prisma Client (2.28.0) to ./node_modules/@prisma/client
```

So much goodness! Basically, they use the `Todo` model to auto-generate a bunch of TypeScript definitions and Javascript code which we are going to import in just a second. In other words, the "Prisma helps app developers build faster and make fewer errors" sentence on the Prisma website is not just some marketing speech, it is truly genius!

Ok, I'm done being a fanboy about it, let's move on and thanks for your patience there with me 😅.

One last thing, please add `prisma/dev.db` to your `.gitignore` file since we don't want to commit the dev database to version control.

### Use the `PrismaClient` to interact with the database

The SvelteKit demo app nicely encapsulates all API features in the `src/routes/todos/_api.ts` file. To be more precise, the actual CRUD logic happens at https://api.svelte.dev/todos. We are going to modify the `_api.ts` file slightly to deal with CRUD right there and use the `PrismaClient` instead of delegating to a backend API.

**Move the `Todo` type so we can reuse it**

First and foremost, let's move the `Todo` Typescript type. By default, it's defined and used in the `src/routes/todos/index.svelte` file. However, with the changes we're going to make to the API, we are also going to need that type in the `src/routes/todos/_api.ts` file.

1. Cut the `Todo` type from `src/routes/todos/index.svelte`
1. Paste it below the `import` statements in `src/routes/todos/_api.ts`, and prefix it with `export`
1. Use the following import in the `src/routes/todos/index.svelte` file: `import type { Todo } from "./_api";`

**Update the API to use Prisma**

Open the `src/routes/todos/_api.ts` file and add the following import:

```typescript
import { PrismaClient } from '@prisma/client';
```

Remember? That's the generated code I was so excited about earlier 😀.

Next, we need a new instance of the `PrismaClient` (add this below the `import` statements):

```typescript
const prisma = new PrismaClient();
```

Moving right along, it's time to update the `api` method signature to tell Typescript that the `data` parameter is of type `Todo`.

```typescript
export async function api(request: Request<Locals>, resource: string, data?: Todo) {
```

The following code:

```typescript
const res = await fetch(`${base}/${resource}`, {
  method: request.method,
  headers: {
    'content-type': 'application/json'
  },
  body: data && JSON.stringify(data)
});
```

needs to be replaced with this:

```typescript
let body = {};
let status = 500;
switch (request.method.toUpperCase()) {
  case "DELETE":
    await prisma.todo.delete({
      where: {
        uid: resource.split("/").pop()
      }
    });
    status = 200;
    break;
  case "GET":
    body = await prisma.todo.findMany();
    status = 200;
    break;
  case "PATCH":
    body = await prisma.todo.update({
      data: {
        done: data.done,
        text: data.text
      },
      where: {
        uid: resource.split("/").pop()
      }
    });
    status = 200;
    break;
  case "POST":
    body = await prisma.todo.create({
      data: {
        created_at: new Date(),
        done: false,
        text: data.text,
      }
    });
    status = 201;
    break;
}
```

We're getting there 💪. In the `if` statement right below the code we've just added, remove the `res.ok &&` since we no longer have a `res` variable.

Lastly, change the `return` statement to the following:

```typescript
return {
  status,
  body
};
```

## Let's test

Start your SvelteKit demo app with `npm run dev` and navigate to [http://localhost:3000](http://localhost:3000) in your browser. If you use Gitpod, hold CTRL / CMD pressed and click on the [http://localhost:3000](http://localhost:3000) URL in the terminal, it'll open a new browser window with the SvelteKit demo app.

Click on the "TODOS" navigation link and add a few todos, rename some, mark others as done.

In a new terminal, open the Prisma Studio with `npx prisma studio`. The studio opens in a new browser tab. Click on the `Todo` model and validate that the data matches what you see in the SvelteKit demo app.

Congratulations 🎉!

**Bonus - definitely read this**

Disable JavaScript in your browser and test the todo list again. This is how the web is supposed to work - without JavaScript!

We used to develop websites like that, then we spent a decade thinking it's a great idea to move everything into JavaScript and thanks to Svelte & SvelteKit, we now once again develop web applications that work the way the web was intended to work.

JavaScript's purpose is to enhance the web experience, not break everything if JavaScript is disabled.

## Conclusion

With a few modifications to a default SvelteKit demo app, we managed to configure Prisma to persist todo items. There is of course a lot more you can do with Prisma, and with SvelteKit for that matter. The source code at https://github.com/mikenikles/sveltekit-prisma should get you a long way towards your own web app.

If you found this interesting, you may also like (wow... is this an e-commerce website 😂?!) my current project called [Webstone](https://github.com/webstonehq/webstone). Webstone is a full-stack web application boilerplate with a CLI to automate tedious tasks like adding new pages, updating the database (of course it uses Prisma 😉). It's in early development, but do hit that star button on GitHub which helps me get motivated to spend more time on the project 🙏.

👋
