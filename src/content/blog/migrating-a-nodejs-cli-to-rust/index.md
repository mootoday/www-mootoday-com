---
title: "Migrating a Node.js CLI to Rust"
summary: How to minimize the impact, yet receive feedback early and often.
createdAt: 2025-01-07T10:45:12.067Z
featured: false
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

**Key takeaways**

- Ship the new Rust CLI on day 1, even if it doesn't have any commands yet
- Migrate the three most used commands, then pause
- Experiment with various crates to see what works, what doesn't
- Develop the bells & whistles
- Gather feedback, feedback, and more feedback
- Continue with command migrations

> While this article focuses specifically on a Node.js CLI built with `yargs` to a Rust CLI with `clap` migration, much applies to any X to Y CLI migration.

## Why migrate at all?

Well let's not sugarcoat this: There is a high chance the right thing to do is not to migrate your CLI to Rust. Rust may be unfamiliar to the team, people on the team push back for all sorts of reasons, your CLI only has a handful of commands, it has fewer than twenty users, you have a dev team of one, you name it.

If any of the above applies to you, this is not goodbye, but see you next time 😊.

Should you still be here, it is time to look at why I think migrating a CLI to Rust does make sense.

For me, migrating a `yargs` Node.js CLI to Rust is based on a few reasons:

* Distributing a Node.js CLI is a nightmare. `pkg` from Vercel is unmaintained, yet still the only solution I have explored that kind of works
   * This means the CLI binary includes Node.js, resulting in a ~50mb binary 😰
   * Building CLI binaries for various target operating systems and architectures *probably* works if you invest enough time
* With every command that gets added to the CLI, startup time increases ever so slightly
* `yargs`' last release was 616 days ago on April 28, 2023. I would not start a new project with a library so outdated.
* Speed. I come across more Rust CLIs more frequently and without exception, it is a delight to use them. Type command, press Enter, see result. Barely a need for spinners to indicate how slowly things run.
* I wanted to learn Rust. A CLI was a great opportunity to dip my feet in this space.

Let's dive in and discuss what a migration may look like, shall we?

### Pros and cons of the existing Node.js CLI

The older, bigger, and more widely used your existing CLI is, the more likely it is you already have a list of pros and cons. Ideally, this list includes feedback from various stakeholders, including but certainly not limited to:
* people who work with the CLI daily
* developers who build the CLI
* the product management, sales, and support teams
* leadership (good leaders have opinions on many topics)

Clean up the feedback you receive, group similar items, and create pros and cons themes.

**Everything in the "pros" section needs to be included in the Rust CLI** and is ideally a bit better than in the Node.js CLI. Let me show you an example of two `--help` outputs that document the use of a `--status` flag for a given command:

```bash
# Node.js `yargs` --help output
--status                     The status of the job
     [string] [choices: "STARTED", "PAUSED"] [default: "STARTED"]

# Rust `clap` --help output
--status <STATUS>
        The status of the job

        [default: STARTED]

        Possible values:
        - STARTED: Set the job status to STARTED
        - PAUSED:  Set the job status to PAUSED
```

Both outputs convey the same information<sup>[1]</sup>, yet I prefer the second, verbose output. *Of course, if that article ends up on Hackernews, I'll get ripped apart for saying that 😅.*

The reason I prefer the second output is because it is easier to parse for humans. Imagine there were a handful of other flags displayed above/below the `--status` output. A quick scan of the help output shows me the available flags and their defaults. In the Node.js CLI, the output is a lot more dense and finding the default value quickly turns into an eye exam 🧐.

<sup>[1]</sup> The <code>yargs</code> Node.js CLI also shows the status has to be a <code>string</code> – unnecessary information given there are only two choices for this flag.

### The perfect CLI

*... does not exist*. Sure sure, but what if it did? Forget technical limitations. Forget effort. What would it take for your customers to say "Holy parent of your holiness, this CLI is almighty!" when they use your CLI?

Ask around, create a list of these blow-my-mind features, and make it available to everyone on your team.

The reason this is important is because one or two features on that list is what it takes for your CLI to stand out from competitors. Not in terms of "oh that's nice", but to the extent where people who use your CLI tell their friends to give your CLI a go rather than competitor XYZ where the CLI experience is meh 🐑.

Here are a few things I consider for a perfect CLI:

* Lightning fast (*that's obviously why I'm migrating a Node.js CLI to Rust and why I'm writing this article*)
* Guessable (aka consistent) command names & flags
* Fuzzy command matching (type "svae", the CLI understands you meant "save" and runs the "save" command)
* Automatic error recovery suggestions
* Verbose output for humans, machine-parseable output for automation (json/yaml/toml/etc formats)

We will get back to your list of features for a perfect CLI a bit later.

## Sprint from zero to release on day 1

You read that right, **on day 1**!

To show you that it is not only possible, but possible to achieve that even before lunch, let's look at how to do it:

### Project setup

1. `cargo new my_cli`
1. `cd $_`
1. `cargo add clap --features derive`
1. Edit `./src/main.rs`
    ```rust
    use clap::{Parser, Subcommand};
    
    #[derive(Parser)]
    #[command(version, about, long_about = None)]
    struct Cli {
        #[command(subcommand)]
        command: Option<Commands>,
    }
    
    #[derive(Subcommand)]
    enum Commands {
        /// Greets people
        Greet {
            /// The name of the person to greet
            #[arg(short, long)]
            name: String,
        },
    }
    
    fn main() {
        let cli = Cli::parse();
    
        match &cli.command {
            Some(Commands::Greet { name }) => {
                println!("Hello {name}!");
            }
            None => {}
        }
    }
    ```
1. `cargo run greet --name "Alice"`

Five minutes into your day, you have a scaffold for your Rust CLI. The best part of your day so far is that by now, your morning hot beverage of choice is still warm!

### Fallback to the Node.js CLI

Next, before we pause work for a quick morning walk, we want to make sure we can **ship our new CLI alongside our existing CLI**. For the sake of this article, let's say we want to write a Rust CLI for `git`, without making any modifications to the `git` binary itself.

To achieve this, we release our Rust CLI as `ggit`, yes with two `g`. That way, it can be placed in the `$PATH` just like the regular `git` CLI and called by simply typing a second `g`.

<div class="w-1/2">
    <table>
      <tr>
        <th>Old CLI</th>
        <th>New CLI</th>
      </tr>
      <tr>
        <td><code>git</code></td>
        <td><code>ggit</code></td>
      </tr>
    </table>
</div>

We want alpha testers to use `ggit` only. That way, we can capture telemetry data to see which commands they run and prioritize our efforts based on that. Ideally, your old Node.js CLI already has that built-in, but if not, the Rust CLI is a great place for it.

> **But wait, `ggit` does not do anything other than the `Greet` command, how can people use it?**
>
> It will take time for `ggit` to be on par with `git`. The way I deal with that is simple: If a command has not been implemented in `ggit`, I fall back to `git`.

![A flow diagram that shows how ggit commands are executed as-is if they exist or alternatively how git is invoked]({assetsBasePath}/1.webp)

Let's update our CLI accordingly. Add a `fallback_to_old_cli()` function to `./src/main.rs`:

```rust
use std::{error::Error, process::Command};

// Existing code from above

fn fallback_to_old_cli() -> Result<(), Box<dyn Error>> {
    let old_cli_binary = "git"; // TODO: Replace with your Node.js CLI binary
    println!("⚠️ Falling back to original {old_cli_binary} CLI...");

    let original_args: Vec<String> = std::env::args().skip(1).collect();
    let status = Command::new(&old_cli_binary)
        .args(original_args)
        .status()
        .map_err(|e| {
            if e.kind() == std::io::ErrorKind::NotFound {
                format!("Original {old_cli_binary} CLI not found in PATH. Please install it first.").into()
            } else {
                format!("Failed to execute original {old_cli_binary} CLI: {}", e)
            }
        })?;

    // Exit with the same status code as the original CLI
    std::process::exit(status.code().unwrap_or(1));
}
```

Apply the following changes in `./src/main.rs` to use the newly created `fallback_to_old_cli` function:

```diff
-fn main() {
-    let cli = Cli::parse();
+fn main() -> Result<(), Box<dyn Error>> {
+    let cli = match Cli::try_parse() {
+        Ok(cli) => cli,
+        Err(err) => {
+            if err.to_string().contains("unrecognized subcommand") {
+                return fallback_to_old_cli();
+            }
+            err.exit();
+        }
+    };
+   ... // Remaining code from above
```

Let's test!

```bash
cargo run greet --name "Alice"
# Hello Alice!

cargo run status # Not a command we have implemented yet
⚠️ Falling back to original git CLI...
# `git status` output
```

### Release

One more thing before we wrap up for a quick break. We need to build a binary that includes our new Rust CLI. We cannot expect our alpha testers to install Rust and use the CLI with `cargo run` – just like you should never build a CLI in Node.js and ask your customers to install Node.js to use it!

```bash
cargo build --release
```

This builds a binary for your default target, the operating system and architecture of the computer you run the command on. See <a href="https://doc.rust-lang.org/cargo/reference/config.html#target" target="_blank">doc.rust-lang.org/cargo/reference/config.html#target</a> for details on how to configure additional targets.

The built binary is located in `./target/release/my_cli`. Send this binary to your alpha testers, ask them to make it executable with `chmod u+x ./my_cli` and place it in their `$PATH`.

Congratulations! That is excellent progress so far today. Reward yourself with a final sip of tea, coffee, water, milk, whatever it is you drink and go for a walk to get some fresh air.

## Proof of concept

Next, you want to migrate the three most used commands in your Node.js CLI to your new Rust CLI. Follow the pattern of the `Greet` command we developed earlier. To reduce boilerplate code as you add more commands, I developed the `clap-nested-commands` crate (<a href="https://crates.io/crates/clap-nested-commands" target="_blank">website</a>, <a href="https://www.mootoday.com/blog/my-first-rust-crate" target="_blank">blog post</a>).

My approach for this phase of the migration was to implement the three commands as quickly and dirty as possible. As I was still learning Rust, I freely used `.unwrap()`, barely handled errors, and `.clone()`d data way too often. The goal is to ship the commands to your alpha testers as quickly as possible.

Remember, ship often and collect feedback!

If your CLI displays data in tables for example, explore various crates to help with that. Figure out which one suits you best. Now the cost to change anything is still cheap, so do not be afraid to refactor and throw things out.

## Make it shine, like really shine with bells and whistles

With the three most used commands migrated to Rust, you are in great shape already! By now, you should also have received valuable feedback from alpha testers. Does the new CLI feel more/less intuitive? Do people notice a difference in command execution time? If so, how do they feel about it?

> **It is very important to slow down development at this point, before we speed up again!**

You might think, "Excellent, three commands down, only x more to go and I will be done with the migration." Well, not so fast, Skippy.

From now on, each command you migrate will multiply every bad practice, every limiting architectural decision, everything you have done poorly so far. When you have two dozen commands that have a flaw, the cost of fixing that will be worse than fixing it with the currently implemented three commands.

Now is the time to make sure the existing three commands are the best they can possibly be:

* Document everything to make sure the generated `--help` usage contains valuable information
* Write tests
* Refactor bad habits (e.g. remove all `.unwrap()`, handle errors, avoid unnecessary `.clone()`, ...)
* Establish best practices & patterns you want to apply to all commands
* Build abstractions for API integrations, UI (spinners, tables, inputs, ...), error messages, telemetry, ...
* Centralize error handling, intro/outro messaging, telemetry, anything you want to happen in a consistent manner for all commands

This is also the time to experiment and spend a day or two to see if you can implement one of the features that you consider to be part of a perfect CLI ([see above](#the-perfect-cli)).

Lastly, automate the release process with CI/CD pipelines. Run tests, then build the CLI binary for various platforms you want to support. For me, a GitHub workflow runs tests, builds the CLI and deploys it to Cloudflare R2 storage. People install it with the following command:

```bash
curl https://your-domain.com | sh
```

> To learn how you can make the above command work for your own CLI, see <a href="https://www.mootoday.com/blog/curl-your-landing-page" target="_blank">this blog post</a> I wrote.

## Feedback, feedback, and more feedback

With every command you add, collect feedback. Remember, migrating your CLI to Rust is not only about the migration itself, it is also an opportunity to make it better. Traditionally, you solicited customers for feedback or asked your alpha testers via email or instant messaging. That works, but we can do better.

### Provide a `feedback` command

Do not over-engineer this 😅. A prompt to ask for feedback, a HTTP POST request to a Discord or Slack webhook URL, done.

The implementation varies depending on your CLI style. I use <a href="https://crates.io/crates/cliclack" target="_blank">crates.io/crates/cliclack</a> for inputs.

```bash
my_cli feedback
┌  Feedback
│
◇  Thank you ─────────────────────────────────────────────────────────╮
│                                                                     │
│  We appreciate your feedback.                                       │
│  This helps us provide you with the best CLI experience possible.   │
├─────────────────────────────────────────────────────────────────────╯
│
│  What works? What doesn't? What do you wish the CLI did?
└
```

### Ask for feedback when errors happen

A `feedback` command is great for people who A) know it exists and B) want to actively provide feedback. The most valuable feedback though likely comes from situations when the CLI does not live up to people's expectations. In other words, when CLI commands fail.

There are two aspects to capturing what went wrong:

1) Automatically via telemetry. Which command was used? What flags were provided? What was the error?

2) Manually via prompting for feedback.

The first one is seamless and happens behind the scenes. For the second one, since we already have the feedback command implemented, we execute that feedback command in case of any errors.

In my case, the user experience is:

1. Error happens and is displayed in the terminal
1. A confirmation prompt asks for feedback: "Our apologies, we're looking into what went wrong. Would you like to provide additional feedback as to what you were doing?"
1. If the user selects "yes", the feedback command discussed above is executed. Ideally your errors have unique IDs so you can attach that error ID to the feedback to have more context.
  
## Implement the remaining commands

By now, you have the three most used CLI commands migrated to Rust. You have tests, docs, and abstractions for common patterns. You have error handling and feedback collection. You hopefully even implemented a feature or two from your "perfect CLI" items.

You have also collected valuable feedback from people who started to use your Rust CLI. All it takes going forward is migrate (and slightly improve) every other command from your Node.js CLI to Rust.

At some point you will reach feature parity with your old Node.js CLI. All that's needed at that point is change the CLI binary name in the `Cargo.toml` file (it's the `name` property in the `[package]` section) to the same binary name your Node.js CLI had. In the case of `ggit` and `git` used earlier, you would start to build your Rust CLI binary as `git`.

Then, instead of releasing your Node.js `git` CLI, you replace it with your new Rust `git` CLI. The next time your existing users get a prompt that a new CLI version is available, they will download the new Rust CLI and voilà, migration complete 🎉!

Make sure your Rust CLI leverages the same authentication credentials as your Node.js CLI to make the migration effortless for your customers.

## A few words on benchmarks

CLIs should be fast. People who use CLIs are power users and they expect CLIs to be helpful, not stand in their way. People who are ok with mediocre CLI performance may as well use a web interface to perform their tasks 😅.

Let's look at some comparisons between a Node.js CLI written with `yargs` and the equivalent CLI written in Rust. The CLI usage is the same as discussed in [Project setup](#project-setup) above. As a reminder, here is how we invoke the CLI:

```bash
my_cli greep --name Alice
Hello Alice!
```

The Node.js equivalent code looks as follows:

```js
#!/usr/bin/env node

require("yargs")
  .scriptName("my_cli")
  .usage("$0 <cmd> [args]")
  .command(
    "greet",
    "Greets people",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        describe: "The name of the person to greet",
        demandOption: true,
      });
    },
    function (argv) {
      console.log(`Hello ${argv.name}!`);
    },
  )
  .help().argv;
```

Paste that into a `yargs/index.js` file and run it with:

```bash
# In the `yargs` directory
node ./index.js greet --name Alice
```

To run the Rust CLI, we can build a release binary with this command (I recommend you do this in a separate `rust` directory):

```bash
# In the `rust` directory
cargo build --release
```

And run it like this:

```bash
# In the `rust` directory
./target/release/my_cli greet --name Alice
```

### Base performance comparison

To get an idea of what the base comparison between the two implementations looks like, we run the CLI commands 1,000 times for each implementation and store the `time` output in a `./benchmark.txt` file.

```bash
# In the `yargs` directory
for i in {1..1000}; do time node ./index.js greet --name Alice; done 2>&1 | grep "system" > ./benchmark.txt

# In the `rust` directory
for i in {1..1000}; do time ./target/release/my_cli greet --name Alice; done 2>&1 | grep "system" > ./benchmark.txt
```

On my Apple M2 laptop, the first 20 lines of each file look as follows:

```
# yargs/benchmark.txt
node ./index.js greet --name Alice  0.05s user 0.04s system 42% cpu 0.204 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 95% cpu 0.045 total
node ./index.js greet --name Alice  0.04s user 0.01s system 87% cpu 0.055 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.042 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.040 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.040 total
node ./index.js greet --name Alice  0.04s user 0.01s system 103% cpu 0.040 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 102% cpu 0.041 total
node ./index.js greet --name Alice  0.04s user 0.01s system 103% cpu 0.041 total

# rust/benchmark.txt
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 63% cpu 0.010 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.004 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.003 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.003 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 77% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 72% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 73% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 75% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 76% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 73% cpu 0.002 total
./target/release/my_cli greet --name Alice  0.00s user 0.00s system 74% cpu 0.001 total
```

> Your results will vary, naturally. What will be similar is the difference in magnitude between the `cpu` and `total` numbers between Node.js and Rust.

A few observations from this:

* Rust is roughly 40x faster
* Rust requires less CPU
* Rust is consistent throughout the 1,000 test runs, while Node.js shows a number of spikes

The performance difference in this simple example is of course because Node.js has to start up the V8 engine and interpret the Javascript code.

The results based on this simple CLI with a single command is the baseline. If you build the most simple CLI, a Rust version is roughly 40x faster. In reality, it is likely you have more commands, sub-commands. Most certainly, you have more computational-heavy commands, only amplifying Rust's performance as a compiled language.

### CLI Binary

So far, we tested the Node.js CLI by invoking it through `node ./index.js greet --name Alice`. That is fine in a development environment where we expect people to have Node.js installed. It may even be fine if your CLI target audience are Node.js developers. The moment this assumption no longer holds true, you cannot ship a Javascript file and ask your customers to install Node.js to run the CLI. I mean... you can, but you really should not if you want to come across as professional.

Node.js has a very interesting project called <a href="https://nodejs.org/api/single-executable-applications.html" target="_blank">Single executable applications</a> that allows the distribution of a Node.js application conveniently to a system that does not have Node.js installed. At the time of this writing, only built-in modules are supported which means our `yargs` dependency makes this a no-go for now.

There is an archived project called `pkg` (<a href="https://github.com/vercel/pkg" target="_blank">GitHub repo</a>). At the time my client started to work on their CLI a few years ago, `pkg` was the way to create CLI binaries. Let's create a binary from our `yargs/index.js` CLI:

```bash
npx pkg -t node18 -o my_cli index.js
```

Now let's run the benchmark again with the newly created `my_cli` binary:

```bash
for i in {1..1000}; do time ./my_cli greet --name Alice; done 2>&1 | grep "system" > ./benchmark-binary.txt
```

```
# yargs/benchmark-binary.txt
./my_cli greet --name Alice  0.04s user 0.03s system 43% cpu 0.172 total
./my_cli greet --name Alice  0.04s user 0.01s system 90% cpu 0.047 total
./my_cli greet --name Alice  0.04s user 0.00s system 102% cpu 0.041 total
./my_cli greet --name Alice  0.04s user 0.00s system 102% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 102% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 102% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
./my_cli greet --name Alice  0.04s user 0.00s system 103% cpu 0.038 total
```

A teeny-tiny bit faster, but that's about it.

### CLI binary file size

Performance of the CLI is one aspect, but there is also the CLI binary size worth keeping an eye on. Not surprising, the `pkg`-based Node.js CLI binary weighs about 46mb while the Rust CLI binary comes in at 987kb. The Rust CLI binary is about 40x smaller and fits on a floppy disk for quick and easy distribution at a conference 😅.

## Conclusion

Rust is an incredibly powerful programming language. It comes with a bit of a learning curve, but so does any other language too. What makes Rust appealing to me is how strict the compiler is when it comes to dealing with edge cases. A missing `match` block? Error. An unhandled `Result`? Error. The compiler forces me to think about possible runtime edge cases and makes me deal with them before my customers experience them and either report bugs or churn.

Take the benchmarks in this article with a grain of salt as there are many factors that impact performance and binary file size. However, the trend is undeniable and the end user experience is without a doubt more positive with a Rust CLI that feels snappy with near zero warm up time.

Migrating my client's Node.js CLI to Rust as my personal learning project has been great. It has given me an opportunity to learn Rust with context – by far the easiest way to learn a new programming language. There is a follow up project on my mind where Rust would really make a difference. We are talking thousands of dollars per month in savings. Let's see if 2025 is the year I will write an article about that too.

👋
