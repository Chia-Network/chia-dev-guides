---
id: chialisp-concepts-currying
slug: /chialisp-currying
title: Currying
---

When you are writing puzzles in Chialisp you may want to have certain parameters decided before the coins are created. This is called **currying**. It allows puzzles to be reused but have different content and produce a different hash.

An example of this is the standard transaction puzzle. One of its parameters is the `SYNTHETIC_PUBLIC_KEY`, which is unique for each address in your wallet. It represents a synthetic child key of your root public key. As such, the puzzle has to be changed for every address. This would be tedious to do without currying, since it allows the original puzzle (also known as the mod) to be used as a template.

## Example

We're going to write a simple example to try currying on the command-line.

Write this in a file named `multiply.clsp`:

```chialisp title="multiply.clsp"
(mod (first second)
    (* first second)
)
```

Now, we are going to make an instance of this program that will set the value of the parameter `first` to `2`. This will effectively turn this program from a multiplier to a doubler.

You can curry it like this:

```bash
cdv clsp curry multiply.clsp -a 2
```

Which should produce the following curried result:

```chialisp
(a (q 18 2 5) (c (q . 2) 1))
```

This is no longer in Chialisp form, but rather CLVM. You don't need to understand how this works or be able to read it, just that it does what was mentioned before.

You can now run this curried CLVM with the value to double like so:

```bash
brun "(a (q 18 2 5) (c (q . 2) 1))" "(5)"
```

It should output twice the value of `5`:

```chialisp
10
```

## Conclusion

This is very useful for writing reusable and composable puzzles in Chialisp. It is also commonly used in tandem with [inner puzzles](/guides/chialisp-inner-puzzles). However, currying can be a pretty confusing topic, so if you have any further questions, feel free to ask them on our [Keybase](https://keybase.io/team/chia_network.public).
