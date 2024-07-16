---
title: "A re-imagined development environment"
summary: A Rust-ification of everything from my terminal workspace, to my editor, to the Javascript tooling I use.
createdAt: 2024-07-15T08:23:13.067Z
featured: false
---

**Key takeaways**

- We thought Javascript tooling efficiency was fine, but now Rust (and Go) teaches us otherwise
- Editors, linters, formatters – nothing is left untouched
- I removed tmux, tmuxp, Neovim, husky, lint-staged, and ESLint
- I migrated to Zellij (*Rust*), Helix (*Rust*), lefthook (*Go*), and Oxc (*Rust*)

> 🙏 Thank you to <a href="https://x.com/omfg_09" target="_blank">@omfg_09</a> for the conversations and brainstorming about Helix!


## My previous development environment

I shared "<a href="/blog/an-opinionated-dev-setup" target="_blank">An opinionated dev setup</a>" with a video walkthrough of how I used to work up until a bit over a month ago.

**tl;dr**:

* `devbox` (I still use it) to standardize project development environments including dependencies, database seeding scripts, build steps, server startups, etc.
* `tmux` and `tmuxp` to create a consistent terminal layout where I ran individual applications and tools such as LazyVim, gh-dash, and `devbox services up` to orchestrate all required dev env setup & startup steps
* `husky` & `lint-staged` to run various scripts in a pre-commit hook
* `eslint` to avoid code smells and bad practices

It's worth noting prior to using LazyVim, I used VS Code. This is important to remember in the next chapter.

It worked. It had worked for a decade at least, and there was nothing wrong at first glance. I knew my way around and was efficient at getting stuff done.

## My new development environment

As is alwasy the case, nothing lasts forever. On the day I saw the following pop up in my VS Code, I instantly knew it was time to move on from VS Code.

![A popup in VS Code that reads Supercharge your Prisma ORM usage with global database caching, serverless connection pooling and real-time database events. Source: Prisma](/blog/a-re-imagined-dev-environment/1.webp)

To be honest, though, I had known for much longer... When a team member of mine posted <a href="https://ghuntley.com/fracture/" target="_blank">this article</a> in 2022, I knew it was time. Then life happened, and here we are with Prisma invading developer environments with advertising.

### VS Code to LazyVim

The first thing that had to change was my editor, VS Code. This was the easiest decision as I used Vim from the early 2000s until I switched to Atom, then VS Code in ~2015.

I didn't want to deal with any configurations whatsoever though, so I found <a href="https://www.lazyvim.org/" target="_blank">LazyVim</a>. Install, start, enable desired plugins, done. Exactly what I was looking for.

### LazyVim to Helix

There was talk about this post-modern text editor called <a href="https://helix-editor.com/" target="_blank">Helix</a>. I decided to read <a href="https://docs.helix-editor.com/" target="_blank">the docs</a> cover to cover and familiarize myself with "<a href="https://github.com/helix-editor/helix/wiki/Migrating-from-Vim" target="_blank">Migrating from Vim</a>". That was before I even installed the editor!

<a href="https://twitter.com/mootoday/status/1811816082446946783" target="_blank">I was sold</a>. I was convinced it would be a better experience overall, but more importantly, Helix would provide me with a more intuitive developer experience in the long-term.

> ```
> devbox global add helix
> ```

Done. Helix installed on my system, ready to roll.

I had a great conversation with <a href="https://x.com/omfg_09" target="_blank">Wilovy09 | Emiliano M.</a> and he kindly shared his <a href="https://github.com/Wilovy09/dotfiles/blob/master/nixosModules/helix/helixConfig.nix" target="_blank">Helix config file</a>. I set up my own Helix config:

```toml
theme = "tokyonight"

[\editor]
bufferline = "always"
line-number = "relative"

[\editor.file-picker]
hidden = false

[\editor.lsp]
display-inlay-hints = true
display-messages = true

[\keys.insert]
C-space = "completion"

[\keys.normal]
"C-S-g" = [":new", ":insert-output lazygit", ":buffer-close!", ":redraw"]
"C-S-d" = [":new", ":insert-output lazydocker", ":buffer-close!", ":redraw"]
"C-S-f" = [":new", ":insert-output xplr", ":buffer-close!", ":redraw"]
```

Notice the last three lines where I add custom keybindings for three TUIs that are essential to my workflow.

Next, I started the editor, ran `:tutor` and worked my way through their tutorial. By the end of it, I was equipped with the knowledge I needed to get back to shipping.

> Anything from here on forward in this post happened on the weekend of July 13 and July 14, 2024. I had a few hours of downtime and decided to review my entire development environment.
> 
> As I found myself sitting on the deck, watching crows fly by on their return to their resting place, I wondered if I should do a thorough review of my development environment... 🤔
> 
> So, I did. I got my laptop, a glass of milk with an ice cube, and turned on some random "Programming music" playlist.

### tmux to zellij

I had used tmux for a long time. I knew Zellij existed, but I didn't care because tmux worked and I was productive with it.

On that Saturday night, though, I decided to question everything. I even questioned whether the answer to life was indeed 42 😮! (Turns out, yes it is)

As always when I dive into a new tool, I read every chapter of <a href="https://zellij.dev/documentation/" target="_blank">the docs</a> except chapter "6. Plugins" to get a feel of whether it is capable of replacing my setup with tmux.

I felt fairly confident it would do a great job so here I was:

> ```
> devbox global add zellij
> ```

Onwards to configuring my monorepo setup for <a href="https://webstone.app/" target="_blank">webstone.app</a> development:

```kdl
layout {
    pane size=1 borderless=true {
        plugin location="tab-bar"
    }
    pane split_direction="vertical" {
        pane {
            pane split_direction="vertical" {
                pane {
                    command "lazygit"
                }
                pane {
                    command "gh"
                    args "dash" "--config" ".config/gh-dash/config.yml"
                }
            }
            pane {
                command "hx"
                args "."
            }
            pane {
                command "devbox"
                args "services" "up" "--process-compose-file" ".config/devbox/process-compose.yml"
            }
        }
        pane {
            pane {
                command "zsh"
            }
            pane {
                command "zsh"
            }
            pane {
                command "zsh"
            }
        }
    }
    pane size=2 borderless=true {
        plugin location="status-bar"
    }
}
```

With that, my terminal contains two columns, three rows.

```
| lazygit & gh dash | zsh |
| hx .              | zsh |
| devbox services   | zsh |
```

That was easy and took a few minutes to configure – that's why you read the docs.

> Editor & terminal layout done. Both tools are written in Rust and as you would expect, they are at least as fast as a ray of sunlight.
> 
> As I was scanning Wilovy09 | Emiliano M.'s dotfiles repo, I also learned about <a href="https://starship.rs/" target="_blank">Starship</a> and added that to my global Devbox list of packages as well. It's actually nice to have a bit of extra context right in the terminal prompt.
> 
> At that point, I shifted my focus to my actual project development environment. If you have read some of my previous blog posts, you know I have standardized, fully automated project setups, so what else is there to improve possibly? Turns out, a lot!

### `husky`, `lint-staged`, `eslint` to `lefthook`, `oxclint`

These tools have worked for me for years, all the way up to large monorepos with 25 contributors. If you use git hooks, I recommend you <a href="https://x.com/mootoday/status/1810680216206934294" target="_blank">do not post about it on 𝕏 😂</a>...

I tackled this migration in two steps:
1. Replace `husky` and `lint-staged` with `lefthook`
1. Replace `eslint` with `oxclint`

For the first one, the only tricky part was to find out that you need to run `pnpm dlx husky uninstall` to properly get rid of the `core.hooksPath` git config value Husky set. Other than that, the process to migrate is to follow the Lefthook docs.
Thanks to Lefthook's `{staged_files}` variable, `lint-staged` became unnecessary without a replacement needed.

To replace ESLint, the main task is to run `pnpm rm ...` with a dozen eslint-related dependencies (see <a href="https://twitter.com/mootoday/status/1812896820516847794" target="_blank">this post</a> for a full list).

Next, craft some fancy-looking `find` command to remove any eslint-related configuration files:

```
find . -name node_modules -prune -o -name "*eslint*" -delete
```

With that, the `lefthook.yml` configuration file ends up looking like this:

```yaml
#
#   Refer for explanation to following link:
#   https://github.com/evilmartians/lefthook/blob/master/docs/configuration.md
#
prepare-commit-msg:
  commands:
    commitizen:
      interactive: true
      run: pnpm cz
      env:
        LEFTHOOK: 0
pre-commit:
  commands:
    oxlint:
      glob: "*.{js,ts}"
      run: oxlint --fix {staged_files}
    prettier:
      glob: "*.{js,json,md,svelte,ts,yaml,yml}"
      run: pnpm prettier --write {staged_files}
```

## Devbox

It's a no-brainer IMHO and continues to be at the core of any of the projects I am involved in. To contribute to one of my projects, the following is all you have to do:

```
git clone <repo-url>
cd <repo>
devbox run env
```

You will get the 2x3 grid in the terminal, all dependencies installed, databases started and seeded, packages built, watch scripts running, dev servers started, you name it.

## Conclusion

There we have it: Rust is slowly, but inevitably making its way into the Javascript ecosystem. These Rust-based tools are fast, incredibly fast no matter the size of your project. This matters a lot more than people care to admit.

In order to stay competitive, developers need the quickest, most efficient feedback loop possible.

> The **best** place for feedback is in an editor; the **second best** place is a git pre-commit hook.

> The **worst** place for feedback is in production; the **second worst** place is a pull request status check.

By adopting development processes that take milliseconds to run, developers get instant feedback and deliver code that follows agreed upon best practices and team standards. Compare this to the more traditional approach of pull request status checks, which happen a few minutes after the code is written, at best.

If you are in a leadership position, multiply the inefficiencies by the number of developers on your team...

**Contact us via <a href="https://onboarding.webstone.app/" target="_blank">onboarding.webstone.app</a> to discuss how my team and I can help you improve your internal and external developer experience.**

👋
