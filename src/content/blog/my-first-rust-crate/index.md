---
title: "My first Rust crate"
summary: I released `clap-nested-commands` to reduce boilerplate code for Rust CLIs built with `clap`.
createdAt: 2024-12-29T03:12:65.067Z
featured: false
---

**Key takeaways**

- `clap-nested-commands` reduces boilerplate code for multi-command CLIs
- The more commands your CLI has, the more code `clap-nested-commands` saves you from writing and maintaining
- I developed it while learning Rust by migrating a large Node.js CLI to Rust

> You can find the crate at <a href="https://crates.io/crates/clap-nested-commands" target="_blank">crates.io/crates/clap-nested-commands</a>.

## Who benefits from this?

`clap-nested-commands` is for anyone who matches the following criteria:
* Builds a Rust CLI with `clap` (<a href="https://crates.io/crates/clap" target="_blank">crates.io/crates/clap</a>)
* Uses `clap`'s `derive` feature
* Has nested commands, e.g. `aws s3 sync <local-dir> s3://bucket-name` or `kubectl describe pod <pod-name>`

If you don't have nested commands, you can still use my crate, it's just that the benefits will only be apparent once your CLI expands to multiple, nested commands.

## Example with `clap-nested-commands`

Imagine a CLI command like `my-cli projects users add --email name@domain.com`.

With `clap-nested-commands`, you structure this CLI as follows:

```
examples/sync_commands
├── Cargo.toml
├── cli_context.rs
├── src
│   └── commands
│       ├── mod.rs
│       └── projects
│           ├── mod.rs
│           └── users
│               ├── add.rs
│               ├── mod.rs
│               └── remove.rs
└── main.rs
```

You use `clap-nested-commands` in the `src/commands/**/mod.rs` files as follows:

```rust
// src/commands/projects/users/mod.rs
use clap::{Args, Subcommand};
use clap_nested_commands::generate_sync_commands;
use crate::cli_context::CliContext;

// A list of sub-command modules
mod add;
mod remove;

/// User commands
#[derive(Debug, Args)]
pub struct Command {
    #[command(subcommand)]
    pub command: Commands,
}

generate_sync_commands!(add, remove); // Provided by `clap-nested-commands`
```

## Example without `clap-nested-commands`

The above example of `src/commands/projects/users/mod.rs` without using `clap-nested-commands` would look as follows:

```rust
// src/commands/projects/users/mod.rs
use clap::{Args, Subcommand};
use crate::cli_context::CliContext;

// A list of sub-command modules
mod add;
mod remove;

/// User commands
#[derive(Debug, Args)]
pub struct Command {
    #[command(subcommand)]
    pub command: Commands,
}

// Anything below needs to be updated for every new command that is added
#[derive(Debug, Subcommand)]
pub enum Commands {
    Add(add::Command),
    Remove(remove::Command)
}

pub fn execute(cli_context: &CliContext, cmd: Command) -> () {
    match cmd.command {
        Commands::Add(cmd) => add::execute(cli_context, cmd),
        Commands::Remove(cmd) => remove::execute(cli_context, cmd),
    }
}
```

## If you prefer a `diff`

Below is what a diff with `clap-nested-commands` vs without the crate looks like. You can see how much code is required for each new command without using the crate.

```diff
use clap::{Args, Subcommand};
+ use clap_nested_commands::generate_sync_commands;
use crate::cli_context::CliContext;

mod add;
mod remove;

/// User commands
#[derive(Debug, Args)]
pub struct Command {
    #[command(subcommand)]
    pub command: Commands,
}

+ generate_sync_commands!(add, remove);

- #[derive(Debug, Subcommand)]
- pub enum Commands {
-     Add(add::Command),
-     Remove(remove::Command)
- }
- 
- pub fn execute(cli_context: &CliContext, cmd: Command) -> () {
-     match cmd.command {
-         Commands::Add(cmd) => add::execute(cli_context, cmd),
-         Commands::Remove(cmd) => remove::execute(cli_context, cmd),
-     }
- }
```

## Wishlist

As I dive deeper into Rust, I hope to find solutions to two improvements that are on my wishlist for `clap-nested-commands`:

1. Avoid manually updating `generate_sync_commands!(add, remove);` when I add a new command. Instead, let the crate determine the list on its own based on the file system hierarchy.
2. When commands return a value, the crate usage currently looks like this: `generate_sync_commands!(return_type = String; add, remove);`. I want the crate to determine the return type based on what the command's `execute` function returns.

If you read this and have any ideas on how to achieve the above, please let me know 😊.

## Conclusion

I'm about a year into my Rust journey. It's been on/off studying during that time as I converted a Node.js CLI to a Rust CLI. That's a blog post on its own at some point, but seeing the results and how many runtime errors Rust takes care of for me during compile time, I know Rust is the way to go for CLIs and also high throughput services.

Releasing `clap-nested-commands` was a great experience and a first look into the Rust ecosystem.

Let the learning continue!

👋
