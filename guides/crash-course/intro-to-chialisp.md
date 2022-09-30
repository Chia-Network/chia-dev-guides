---
slug: /crash-course/intro-to-chialisp
title: Chialisp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To get started with Chialisp you will first want to install the Chia Dev Tools. You can refer to the [Chia Dev Tools repository](https://github.com/Chia-Network/chia-dev-tools) for more information, but the summary of the installation is here:

<Tabs groupId="OS"
defaultValue="windows"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux/MacOS', value: 'linux-macos'},
]}>
<TabItem value="windows">

```
mkdir learning
cd learning
py -m venv venv
./venv/Scripts/activate
pip install chia-dev-tools
cdv --version
```

  </TabItem>
  <TabItem value="linux-macos">

```
mkdir learning
cd learning
python3 -m venv venv
. ./venv/bin/activate
pip install chia-dev-tools
cdv --version
```

  </TabItem>
</Tabs>

This will install the Chia Dev Tools within your activated virtual environment. You'll want to make sure this virtual environment is activated before working on Chialisp. You'll see a `(venv)` on the left of your terminal prompt.

:::info
Virtual environments allow you to install specific Python packages that will only be usable with the environment is active. This allows you to switch between different environments for different projects or if you just want to use different software versions.
:::

You should now get a usage response when using `cdv`:

```
cdv
```

Response:

```
Usage: cdv [OPTIONS] COMMAND [ARGS]...

  Dev tooling for Chia development

Options:
  --version   Show the version and exit.
  -h, --help  Show this message and exit.

Commands:
  clsp     Commands to use when developing with chialisp
  decode   Decode a bech32m address to a puzzle hash
  encode   Encode a puzzle hash to a bech32m address
  hash     SHA256 hash UTF-8 strings or bytes (use 0x prefix for bytes)
  inspect  Inspect various data structures
  rpc      Make RPC requests to a Chia full node
  sim      Configure and make requests to a Chia Simulator Full Node
  test     Run the local test suite (located in ./tests)
```

You will also now have a `run` command that can be issued directly.

```
run
```

By itself, `run` will only return `()`, but you can also pass a valid Chialisp program to execute it. Here is an example:

```
run '(+ 2 3)'
```

Response:

```
5
```

:::info

The syntax (+ 2 3) may look confusing. In Chialisp, we place the operator first, followed by the operands. This is known as **prefix notation**. Think of this as the equivalent to `2 + 3` in most other programming languages. or regular math :).

It is set up this way as every program in Chialisp is written as a list, where the first item is an operator. `(+ 2 3)` is a list of three elements with the first being the `+` operator, thus it's a valid Chialisp program.

:::

## Writing a Chialisp Program (Puzzle)

First off, in Chialisp a program is called a **puzzle**. To create larger puzzles we will use the `mod` operator. The `mod` operator will allow us to take arguments passed in to customize the functionality / result of executing the puzzle. These passed in arguments in Chialisp are known as the **solution**.

A very basic example would be:

```
run '(mod (arg1 arg2) (+ arg1 arg2))'
```

Response:

```
(+ 2 5)
```

:::info

What in the world is `(+ 2 5)` that `run` returned? This is an example of compiled Chialisp (bytecode) that is then executed by the Chialisp Virtual Machine (CLVM). It is not very human-readable, but don't worry about that as you are not required to understand CLVM bytecode.

Our first command, `run`, will take Chialisp code and compile it. Next, `brun` will take chialisp bytecode and execute it.
:::

We will then run this puzzle with the `brun` command, followed by a solution of your choice:

```
brun '(+ 2 5)' '(10 5)'
```

Response:

```
15
```

:::tip
We are now using `mod` to demand a solution for our puzzle. Whenever this is the case, you will be required to use the `brun` command after `run`.
:::

Pay close attention to the location of quotes and parenthesis. It's easy to get lost! With `brun`, the solution is passed in as a distinct value surrounded by quotes. `(10, 5)` is the solution in this example and translates to `arg1 = 10` and `arg2 = 5`.

You can run it again with a different solution:

```
brun '(+ 2 5)' '(20 7)'
```

Response:

```
27
```

At this point you have a working Chialisp puzzle that will take inputs and give back an output! Congrats!

## Comparisons and If Statements

Going with a contrived example, let's say we wanted to add two numbers and return `large` if they were `> 100`, or `small` if they were `<= 100`.

You can compare two values like so:

```
(> arg1 arg2)
```

If `arg1` is larger than `arg2`, this returns `true`.

You can then use an if statement to return one of two different things depending on the result.

```
(if <comparison> <result if true> <result if false>)
```

A concrete example of an `if` would be:

```
run '(if 0 "its true" "its false")'
```

Response:

```
"its false"
```

Now, we will add `arg1` and `arg2` with the code `(+ arg1 arg2)` and compare it to the literal value `100`. This comparison will determine whether the `if` is `true` or `false`. We end up with:

```
run '(mod (arg1 arg2) (if (> (+ arg1 arg2) 100) 'large' 'small'))'
```

Response:

```
(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)
```

Next, let's put this bytecode through `brun`, giving it a solution:

```
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(10 90)'
```

Response:

```
small
```

Now, again with a different solution:

```
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(10 91)'
```

Response:

```
large
```

The difference here being the new solution of `(10 91)`. When added together, `10` and `91` are greater than `100`.

## Moving to a Text Editor

At this point our Chialisp program can be written on a single line, but it's started to get difficult to keep things organized.

Moving forward, let's write Chialisp in a file.

What text editor you choose is up to you. For Visual Studio Code, you can issue this command to open a new file:

```
code first.clsp
```

This allows us to format our code nicely.

```
(mod (arg1 arg2)
    (if (> (+ arg1 arg2) 100) 'large' 'small')
)

```

Now, we can execute the file by name:

```
run first.clsp
```

This output will be exactly the same as before, but our code is a bit easier to manage.

We will still execute the output like so:

```
brun "(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)" "(50 51)"

```

And, using nesting, `$()` will execute anything within `()` first. We can simplify further with:

```
brun "$(run first.clsp)" "(50 51)"
```

## Defining Functions

A function will give a name to some lines of code, often taking an input and returning a result. Let's create a new file to practice functions inside of Chialisp.

```
code sum.clsp
```