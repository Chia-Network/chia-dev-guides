---
slug: /crash-course/smart-coins
title: Smart Coins
---

Everything on the Chia blockchain is a **coin**. They are often referred to as **smart coins** because every coin has a Chialisp program associated with it. That program, known as a **puzzle**, decides how and when the coin can be spent, and what happens when it is. NFTs, CATs, and standard transactions are all defined using puzzles.

Now that you have learned how to write basic Chialisp programs, you can apply that to puzzles. There's a bit more involved in creating a puzzle and using it for a coin, but we'll get into that more later.

In this lesson, we will be writing a puzzle that requires a simple password to unlock coins that use it.

:::danger
While this is great for learning the fundamentals, it is an inherently insecure way to protect funds on a blockchain. We will explore the reason and better methods later on.
:::

## Writing the Puzzle

This is a slightly more complicated Chialisp program than what we've explored before. As such, we've provided comments to explain each part.

Write the following in a file named `password.clsp`:

```chialisp title="password.clsp"
;;; This puzzle locks coins with a password.
;;; It should not be used for production purposes.
;;; Use a password that has no meaning to you, preferably random.

(mod (
        PASSWORD_HASH ; This is the sha256 hash of the password.

        password ; This is the original password used in the password hash.
        conditions ; An arbitrary list of conditions to output.
    )

    ; If the hash of the password matches,
    (if (= (sha256 password) PASSWORD_HASH)
        ; Output the conditions list.
        conditions

        ; Otherwise, throw an error.
        (x)
    )
)
```

What this puzzle essentially does is check a provided password against the pre-defined hash that the coin was locked up with. If it matches, the conditions the spender provided are output to the blockchain. However, if the password was invalid, the program fails and the coin remains unspent.

:::info
You may have noticed that `PASSWORD_HASH` is capitalized. This is because that value is meant to be **curried** into the puzzle. You can check out the [Currying page](/guides/chialisp-currying) to learn more about what currying is and how it works.

The short answer is that you can keep a puzzle general purpose, but insert pre-defined values beforehand that make it specific to a single use. For example, there may be many coins locked with a password, but you only want your specific password to unlock the coins you create with it.
:::

## Calculating the Hash

The first step to creating the coin is to calculate the `PASSWORD_HASH` for the password you are going to use.

:::note
Pick a password that you would never use for anything real. It is for the purposes of this lesson only.

For simplicity, you can use the password `hello`. If you don't, replace any instance of `hello` throughout this lesson with the one you chose.
:::

Run the following command to calculate the value for `PASSWORD_HASH`:

```bash
cdv hash "hello"
```

Which, with this password, outputs the following hash:

```
2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

## Currying the Puzzle

We now need to curry the value for `PASSWORD_HASH` into the password puzzle. This will produce a new puzzle unique to this password.

:::caution
Replace the hash in this command with the one you calculated before. It is important to not forget the `0x` prefix in front of the hash, since you are representing it as a Chialisp value.
:::

Run the following command:

```chialisp
cdv clsp curry password.clsp -a "0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
```

Which, with this hash, outputs the following compiled CLVM program:

:::note
The output of this command is specific to the hash you used.
:::

```chialisp
(a (q 2 (i (= (sha256 5) 2) (q . 11) (q 8)) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))
```

### Puzzle Hash

A coin id consists of the following things hashed together:

- The id of its parent (`parent_coin_id`)
- The hash of its puzzle (`puzzle_hash`)
- The amount of mojos locked with it (`amount`)

In other words, you can calculate the coin id in Chialisp like this:

```chialisp
(sha256 parent_coin_id puzzle_hash amount)
```

We need to calculate the puzzle hash before we can create the coin.

Paste the compiled CLVM into this command to calculate the hash:

```bash
opc -H "<Compiled CLVM>"
```

:::note
If this command outputs two values, copy the first one.
:::

Write this value down somewhere you can refer to later.

### Puzzle Reveal

The puzzle reveal is just a serialized form of the puzzle, written in hex. It is what you must reveal on-chain when spending a coin, and is compared against the puzzle hash to validate it.

We need to calculate the puzzle reveal to spend the coin.

Paste the compiled CLVM into this command to calculate the hash:

```bash
opc "<Compiled CLVM>"
```

Write this value down somewhere you can refer to later.

## Creating the Coin

Now that you have the puzzle hash and reveal, you can easily create the coin using the Chia wallet.

:::tip
A wallet address is just an encoded form of a puzzle hash.
:::

You can calculate the address used for your password puzzle with this command:

```bash
cdv encode -p txch "0xPuzzleHash"
```

## Spending the Coin

## Security
