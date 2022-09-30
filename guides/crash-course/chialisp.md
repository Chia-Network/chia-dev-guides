---
slug: /crash-course/chialisp
title: Chialisp
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

For this section of the course, you will learn how to set up your development environment, write Chialisp code, and execute it on the command-line.

## Development Environment

To get started with Chialisp, you will first want to [install Chia Dev Tools](https://github.com/Chia-Network/chia-dev-tools).

Here is a summary of the instructions:

```mdx-code-block
<Tabs groupId="OS"
defaultValue="windows"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux/MacOS', value: 'linux-macos'},
]}>
<TabItem value="windows">
```

```bash
mkdir learning
cd learning
py -m venv venv
./venv/Scripts/activate
pip install chia-dev-tools
cdv --version
```

  </TabItem>
  <TabItem value="linux-macos">

```bash
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
Virtual environments allow you to install specific Python packages that will only be usable with the environment that is currently active. This allows you to switch between different environments for different projects, or if you just want to use different software versions.
:::

### Chia Dev Tools

The `cdv` command provides a set of useful commands for building and running Chialisp programs, as well as some utilities for deploying smart coins on the Chia blockchain, which we will cover later on.

Run the following to see what commands it provides:

```bash
cdv
```

### Run

You also have access to the `run` command that can be used to compile Chialisp code directly.

:::note
If Chialisp code doesn't depend on any external parameters, the compiler will simplify it to the smallest form it can, which often means that this command will return the final output of the program.

If this is the case, you can skip the `brun` command.
:::

Run the following command:

```bash
run '(+ 2 3)'
```

Which should return the following result:

```chialisp
5
```

---

:::info
The syntax `(+ 2 3)` may look confusing. In Chialisp, we place the operator first, followed by the operands. This is known as **prefix notation**. Think of this as the equivalent to `2 + 3` in math and most other programming languages.

It is set up this way because every program in Chialisp is written as a list, where the first item is the operator. `(+ 2 3)` is a list of three elements with the first being the `+` operator, and thus it's a valid Chialisp program.
:::

### Brun

The `brun` command is different from the `run` command in that it doesn't compile code. Instead, it takes the result of the `run` command and executes it on the Chialisp Virtual Machine (CLVM) directly.

If you need to pass external parameters into the program, you will need to first compile it with `run`, then use the `brun` command with the parameters.

For example, let's say that the `run` command produced the following CLVM bytecode output:

```chialisp
(+ 2 5)
```

You could run it like so:

```bash
brun '(+ 2 5)' '(100 200)'
```

Which should produce the following output:

```chialisp
300
```

---

:::info
The program `(+ 2 5)` in this case does not mean to add the numbers 2 and 5, but rather to access the input parameters. This is an advanced concept that is covered in more detail on the [Chialisp website](https://chialisp.com), and will not be necessary to understand for this course.
:::

## Writing a Chialisp Program (Puzzle)

First off, in Chialisp a program is called a **puzzle**. To create larger puzzles we will use the `mod` operator. The `mod` operator will allow us to take arguments passed in to customize the functionality / result of executing the puzzle. These passed in arguments in Chialisp are known as the **solution**.

A very basic example would be:

```bash
run '(mod (arg1 arg2) (+ arg1 arg2))'
```

Which should return the following result:

```bash
(+ 2 5)
```

:::info
What in the world is `(+ 2 5)` that `run` returned? This is an example of compiled Chialisp (bytecode) that is then executed by the Chialisp Virtual Machine (CLVM). It is not very human-readable, but don't worry about that as you are not required to understand CLVM bytecode.

Our first command, `run`, will take Chialisp code and compile it. Next, `brun` will take chialisp bytecode and execute it.
:::

We will then run this puzzle with the `brun` command, followed by a solution of your choice:

```bash
brun '(+ 2 5)' '(10 5)'
```

Which should return the following result:

```chialisp
15
```

:::tip
We are now using `mod` to demand a solution for our puzzle. Whenever this is the case, you will be required to use the `brun` command after `run`.
:::

Pay close attention to the location of quotes and parenthesis. It's easy to get lost! With `brun`, the solution is passed in as a distinct value surrounded by quotes. `(10, 5)` is the solution in this example and translates to `arg1 = 10` and `arg2 = 5`.

You can run it again with a different solution:

```bash
brun '(+ 2 5)' '(20 7)'
```

Which should return the following result:

```chialisp
27
```

At this point you have a working Chialisp puzzle that will take inputs and give back an output! Congrats!

## Comparisons and If Statements

Going with a contrived example, let's say we wanted to add two numbers and return `large` if they were `> 100`, or `small` if they were `<= 100`.

You can compare two values like so:

```chialisp
(> arg1 arg2)
```

If `arg1` is larger than `arg2`, this returns `true`.

You can then use an if statement to return one of two different things depending on the result.

```chialisp
(if <comparison> <result if true> <result if false>)
```

A concrete example of an `if` would be:

```bash
run '(if 0 "its true" "its false")'
```

Which should return the following result:

```chialisp
"its false"
```

Now, we will add `arg1` and `arg2` with the code `(+ arg1 arg2)` and compare it to the literal value `100`. This comparison will determine whether the `if` is `true` or `false`. We end up with:

```bash
run '(mod (arg1 arg2) (if (> (+ arg1 arg2) 100) 'large' 'small'))'
```

Which should return the following result:

```chialisp
(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)
```

Next, let's put this bytecode through `brun`, giving it a solution:

```bash
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(10 90)'
```

Which should return the following result:

```chialisp
small
```

Now, again with a different solution:

```bash
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(10 91)'
```

Which should return the following result:

```chialisp
large
```

The difference here being the new solution of `(10 91)`. When added together, `10` and `91` are greater than `100`.
