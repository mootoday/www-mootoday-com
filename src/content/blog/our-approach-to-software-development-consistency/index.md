---
title: "Our approach to software development consistency"
slug: "our-approach-to-software-development-consistency"
summary: "Don't document what you can automate."
createdAt: 2018-01-03T00:00:00.000Z
tags: ["series-monorepo"]
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

<!-- Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/solid?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) -->

### Don’t document what you can automate

_This blog post is part of a series where I share our migration from monolithical applications (each with their own source repository) deployed on AWS to a distributed services architecture (with all source code hosted in a monorepo) deployed on Google Cloud Platform._

* _Part 1 (this post): “A monorepo, GitHub Flow and automation FTW”_
* _Part 2: “One vs. many — Why we moved from multiple git repos to a monorepo and how we set it up”_
* _Part 3: “A (mostly) automated release process”_
* _Part 4: “Our approach to software development consistency”_

## What is consistency in software development?

I see consistency as an integral part of successfully delivering software. Too often have I joined or worked with software teams that had little to no consistency.

It applies to all aspects of development: Code style, comments, tools, onboarding, creation of new services. It also extends to product management, defining and tracking tasks, and generally company processes.

Let’s take the “creation of new packages and services” case of my current project where we migrate from monolithical applications to smaller, independent and distributed services. Here’s how we created the first 3 services:

* **Service 1**: 100% hand-crafted, trial & error, many dead ends.
* **Service 2**: Copy & paste service 1, tweak where necessary, replace old business logic with new one relevant to service 2. Repeat until hopefully everything somehow works.
* **Service 3**: Copy & paste … __what on earth are we doing?__

Can you spot the consistency? Correct, __Copy & paste__ looks pretty consistent. What happens when people who spent a week building service 1 move on? Who knows what needs to be tweaked to create service 8? Imagine the nightmare when a fundamental bug occurs and impacts all services… 👻.

Now the question is, how do we make this more consistent? I asked a few friends and many replied: ****Document the process****.

* **Service 1**: 100% hand-crafted, trial & error, a few swear words here and there.
* **__Document the process__**
* **Service 2**: Copy & paste service 1, follow the documentation checklist to update the new service.
* **Service 3**: Follow the steps above, as long as nothing has changed and the documentation is still up-to-date 🤞.

## Don’t document what you can automate

As someone who’s spent more than half of his life in the software industry, I realized the simplest way to stay sane in this fast-moving environment is to write scripts that do the work for me.

Documentation is great, as long as it is accurate. There are situations where documentation is necessary, but for the use case we discuss in this blog post (creating new packages and services), documentation is the wrong approach.

Every new package or service has a certain shape that’s fairly similar among all others, like every house has some sort of foundation, some walls and windows and a roof.

Imagine the following procedure to create 3 services:

* **Service 1**: Run service generator, provide service-specific values, hit Enter.
* **Service 2**: Run service generator, provide service-specific values, hit Enter.
* **Service 4**: Run service generator, provide service-specific values, hit Enter.

## Automate the process

Now let’s not only imagine the above procedure, let’s see how we achieved exactly that in our project.

To be transparent, we obviously had something like service 0 where we hand-crafted everything, tested the service, deployed, tweaked etc. However, we knew we want to automate this process so we paid close attention to that from the very beginning.

Our tool of choice is [Plop](https://plopjs.com/). A popular alternative is [Yeoman](http://yeoman.io/). We picked Plop for its simplicity and now that it supports [AddMany](https://plopjs.com/documentation/#addmany), it provides all we need.

We currently have two generators:

* Package
* Service

All template files live in a `_templates` folder. The directory structure is:

```
.
├── _templates
│   ├── packages
│   │   ├── README.md
│   │   ├── iso
│   │   ├── svr
│   │   └── web
│   └── services
│       ├── README.md
│       ├── svr
│       └── web
└── scripts
   └── generators
       ├── helpers.js
       ├── index.js
       ├── packages
       │   └── index.js
       └── services
           └── index.js
```

The `README.md` template files exist once for packages and once for services. This ensures each package (and each service) follow the same structure. A `README.md` file contains the necessary information for anyone to contribute to a package or service.

Further down, the `generators` are defined. The generator entrypoint and the package generator look something like this:

```javascript
const {doSomething} = require('./helpers')

module.exports = plop => {
  plop.setGenerator('package', require('./packages/'))
  plop.setGenerator('service', require('./services/'))
  
  // Helpers
  plop.setHelper('myHelper', aParameter => doSomething(aParameter))
ava
```

```javascript
const {PKG_TYPES, getFullPkgName, getPkgRoot, getType} = require('../helpers')

const validatePkgName = (newName, data) => {
  try {
    // validatePkgNamePattern(newName)
    // validatePkgNameDoesNotExist(newName, data)
  } catch (error) {
    return error.message
  }
  return true
}

module.exports = {
  description: 'Generate a new package (`iso-*`, `web-*`, etc.)',
  prompts: [
    {
      type: 'list',
      name: 'pkgTypeLabel',
      message: 'What type of package would you like to create?',
      choices: PKG_TYPES
    },
    {
      type: 'input',
      name: 'pkgName',
      message:
        'What is the name of your package? (E.g. "logging" or "components-buttons", etc.',
      validate: validatePkgName
    },
    {
      type: 'input',
      name: 'pkgDescription',
      message: 'What is the description of your package?'
    }
  ],
  actions: data => {
    const {pkgName, pkgTypeLabel} = data
    const pkgType = getType(pkgTypeLabel)
    const fullPkgName = getFullPkgName(pkgTypeLabel, pkgName)

    return [
      {
        // Add the package template
        type: 'addMany',
        abortOnFail: true,
        base: `../../_templates/packages/${pkgType}`,
        destination: `../../${getPkgRoot(pkgType)}/${fullPkgName}/`,
        templateFiles: `../../_templates/packages/${pkgType}/**/**`
      },
      {
        // Add the README.md
        type: 'add',
        abortOnFail: true,
        path: `../../${getPkgRoot(pkgType)}/${fullPkgName}/README.md`,
        templateFile: `../../_templates/packages/README.md`
      }
    ]
  }
}
```

The service generators are a bit more complex since they also take care of some additional service setup, such as [creating a RuntimeConfig resource in GCP](https://cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources#creating_a_config), [creating a channel in Slack](https://api.slack.com/methods/channels.create), [adding a new component in Jira](https://developer.atlassian.com/cloud/jira/platform/rest/#api-api-2-component-post), etc.

## Conclusion

The generator can be nicely bundled into a NPM script in the repository’s root `package.json` like so:

```json
{
  "scripts": {
    "generate": "plop --plopfile ./scripts/generators/index.js"
  },
  "devDependencies": {
    "plop": "^1.9.1"
  }
}
```

All it takes now to generate a new package is `yarn generate`. An interactive CLI then guides the developers through a few questions. A nice-to-have feature is the fact that you can pass the generator name as an argument, e.g. `yarn generate service` brings you right to the service-related questions.