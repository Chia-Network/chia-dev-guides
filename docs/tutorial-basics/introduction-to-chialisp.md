---
sidebar_position: 1
---

# Introduction to Chialisp

[Chialisp](https://chialisp.com) is a language based on [Lisp](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>) that is used on the Chia blockchain to dictate how and when [coins](https://docs.chia.net/docs/01introduction/chia-system-overview#coins-and-transactions) can be spent. It's designed to be as simple and efficient as possible, but still provide broad functionality and [Turing Completeness](https://en.wikipedia.org/wiki/Turing_completeness).

Throughout this guide you will learn the basics of Chialisp, and by the end you should have the skills required to write working programs using it. No prior knowledge of Lisp is required.

## Installation

You can follow [this guide](https://github.com/Chia-Network/chia-dev-tools/#install) to install and use Chia Dev Tools. You will be using these tools and a simple text editor of your choice to write and run snippets of code.

Once you have it set up, run the following command:

```
run "hello_world"
```

If it is working correctly, it should output `"hello_world"`. You can now follow along with any of the code in the coming sections.

## Atoms

An **atom** can represent an integer, string, or hexadecimal number. However, the difference is only known before the code is compiled, and every atom is stored directly as bytes.

For example, these atoms all have the same value:

| Representation | Example | Description |
| - | - | - |
| Symbol | `A` | Names and operators |
| String | `"A"` | Used to represent text |
| Integer | `65` | Whole numbers, positive or negative |
| Hexadecimal | `0x41` | Raw byte representation |

If you are interested in learning more about how atoms are encoded, you can read up on [UTF-8](https://en.wikipedia.org/wiki/UTF-8) and [Big Endian](https://en.wikipedia.org/wiki/Endianness), but it will not be necessary for this guide.

## Lists

A **list** is a nested chain of [cons pairs](https://en.wikipedia.org/wiki/Cons) used to represent a set of values, which are also either atoms or lists. While you can manually create these pairs and it is a good thing to know how to do, we will focus on lists for now since they are easier to use and more practical.

The first item in an unquoted list is the operator, and the rest are its operands. The same goes for functions or macros and their arguments. If you want to express a list of values, you either have to use the `list` operator or quote the list.

Here is a list of values:

```
(list 1 2 3)
```

And here is an operator:

```
(+ 2 3)
```

As you can see, just about everything in this language is based on lists, hence the name Lisp (an abbreviation for List Processor). You can see a full list of built-in operators [here](https://chialisp.com/docs/ref/clvm#the-built-in-opcodes).

## Modules

The `mod` operator compiles a Chialisp module and its definitions into a single executable [CLVM](https://chialisp.com/docs/ref/clvm) program. It's how you use more complicated features such as functions and constants.

Note that any definitions inside of the module will not have access to the module's solution, and must be passed in directly. In other words, there is no concept of [scope](<https://en.wikipedia.org/wiki/Scope_(computer_science)>), although constants can be used anywhere.

This module will add two arbitrary values together:

```
(mod (first second)
	(+ first second)
)
```

And this is an example of a constant and function:

```
(mod (value)
	(defconstant ORDER_OF_MAGNITUDE 10)

	(defun raise_magnitude (value)
		(* value ORDER_OF_MAGNITUDE)
	)

	(raise_magnitude value)
)
```

## Putting it Together

By now you have seen how some aspects of the language work, and we can use these concepts to write and run a simple Chialisp program. We will write a module that calculates the factorial of a number using [recursion](https://en.wikipedia.org/wiki/Recursion).

Put this in a file named `factorial.clsp`:

```
;;; Calculates a factorial.
;;; f(n) = n * f(n - 1)
;;; f(n) = n if n <= 2

(mod (number)
	(defun factorial (number)
		(if (> number 2)
			(* number (factorial (- number 1)))
			number
		)
	)
	(factorial number)
)
```

If you run this example with `brun $(run factorial.clsp) "(5)"`, it will compile it and run the result with a solution where `number` is 5. The result of this should be the factorial of that number, which is 120. There were a few new operators used in this example. For more information, you should refer to the [operator reference](https://chialisp.com/docs/ref/clvm#the-built-in-opcodes). Below is a detailed explanation of how this works.

1. The module takes in a `number` value.
2. The `factorial` function also takes in a `number` value.
3. If the number is greater than 2, return the number times the previous factorial.
4. Otherwise, return the number itself.
5. Call the recursive function with the number passed in.

## Keep Going!

Hopefully this guide has been a good introduction into the world of Chialisp. We know it's a lot to take in, so feel free to take a break before continuing on with more guides or the documentation.

If you really want to get started with using it, the best way is to simply write code in the language and ask questions on our [Keybase](https://keybase.io/team/chia_network.public) that come up along the way. We are always happy to help you learn.