---
slug: /crash-course/smart-coins
title: Smart Coins
---

Everything on the Chia blockchain is a **coin**. They are often referred to as **smart coins** because every coin has a Chialisp program associated with it. That program, known as a **puzzle**, decides how and when the coin can be spent, and what happens when it is. NFTs, CATs, and standard transactions are all defined using puzzles.

Now that you have learned how to write basic Chialisp programs, you can apply that to puzzles. There's a bit more involved in creating a puzzle and using it for a coin, but we'll get into that more later.

In this lesson, we will be writing a puzzle that requires a simple password to unlock coins that use it.

:::danger
While this is great for learning the fundamentals, it is an insecure way to protect funds on a blockchain. We will explore the reason and better methods later on.
:::

## The Basics

Let's create a little program to have the user guess a password. We are going to build up to a more advanced password-protected coin, but let's start with the basics. We will hardcode the correct password to be `hello`. If the user provides `hello` as the solution, they got the correct password.

Write the following in a file named `password.clsp`:

```chialisp title="password.clsp"
(mod (password)
    (if (= password "hello")
        "Correct!"
        "Incorrect :("
    )
)
```

Run the following command to check the password against it:

```bash
brun "$(run password.clsp)" "(hello)"
```

Which should produce the following output:

```
Correct!
```

However, if you provide a different solution, you'll get a different result:

```bash
brun "$(run password.clsp)" "(goodbye)"
```

Which should produce the following output:

```
Incorrect :(
```

This is cool, but we want to avoid hardcoded values when possible. This introduces our next concept called _currying_. Currying allows us to write a general puzzle that can be used for many different password options. This way, we're not stuck with just a single password of `hello`. Let's see how this works in the next section.

## Intro to Currying

Our goal is to allow more than just the hardcoded password of `hello`. In addition to this, we want to hide the password to the best of our ability with hashing (which we will explore in more detail later).

Replace the contents of `passwords.clsp` with the following:

```chialisp title="password.clsp"
(mod (CORRECT_PASSWORD provided_password)
    (if (= CORRECT_PASSWORD provided_password)
        "Correct!"
        "Incorrect :("
    )
)
```

:::tip
Values that are expected to be curried in are often written in ALL_CAPS. While we explain currying here, you can also check out the [Currying Guide](/guides/chialisp-currying) to learn more about what currying is and how it works.
:::

Run the following command to curry in the password:

```bash
cdv clsp curry password.clsp -a "hello"
```

Which should produce the following result:

```chialisp
(a (q 2 (i (= 2 5) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . "hello") 1))
```

Which we can now execute with a provided solution:

```bash
brun '(a (q 2 (i (= 2 5) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . "hello") 1))' "(hello)"
```

Now that we've introduced currying, we can create a different puzzle using a different `CORRECT_PASSWORD` without modifying any of the source code.

:::note
Because currying outputs CLVM, we can nest it as input to the compiler to make the process of testing this out easier.

An important thing to note here is that the nesting will not work properly if surrounded with single quotes, thus, we would use `"$()"` and not `'$()'`. This requires us to flip all nested quotes (specifically `'hello'` in this case) so that we have single quotes inside of the double quote.
:::

You can try it with a new password:

```bash
brun "$(cdv clsp curry password.clsp -a 'goodbye')" "(goodbye)"
```

Which should output the following result:

```
Correct!
```

This time, try using the wrong password:

```bash
brun "$(cdv clsp curry password.clsp -a 'goodbye')" "(hello)"
```

Which should output the following result:

```
Incorrect :(
```

We're making progress, but there's still some issues with this program. The password is directly visible in the Chialisp bytecode. When we get to spending coins this information will be revealed to the world, allowing _anyone_ to know the password. Let's see what we can do about this.

## Hashing

Although this won't make the password more secure, it's important to understand hashing and how it can be used to keep values hidden until it is necessary to reveal them.

A hash function will take an input and return a hash value. One of the most popular hashing algorithms is **sha256** which is directly supported within Chialisp. A few important notes about hash functions:

1. Given a value, calculating the hash is extremely easy,
1. Given a hash, calculating the original input is extremely difficult or impossible,
1. Passing the same value through a hashing function multiple times will always result in the same output.

We can use these principles to our advantage by currying a hash of the expected password instead of the password value itself. This prevents us from revealing the expected password while still allowing us to check if the provided password is correct. This is done by hashing the provided password. You can think of this operation as:

```chialisp
(if (= (sha256 password) PASSWORD_HASH)
```

:::tip
This is the exact process websites use to check if your login credentials are correct without storing your actual password in a database.
:::

Our new code will look like this:

```chialisp
(mod (PASSWORD_HASH password)
    (if (= (sha256 password) PASSWORD_HASH)
        "Correct!"
        "Incorrect :("
    )
)
```

## Calculating the Hash

The first step is to find the hash of our desired password. Let's say we still want the password "hello".

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

The hash value we will use is going to be `0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` (we just added `0x` to the beginning).

## Currying the Puzzle

We now need to curry the value for `PASSWORD_HASH` into the password puzzle. This will produce a new puzzle unique to this password.

:::caution
If you decided to use a different password, you will need to issue these commands with a different hash. Replace the hash in this command with the one you calculated. **It is important to not forget the `0x` prefix in front of the hash**, since you are representing it as a Chialisp value.
:::

Run the following command:

```chialisp
cdv clsp curry password.clsp -a "0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
```

Which, with this hash, outputs the following compiled CLVM program:

```chialisp
(a (q 2 (i (= (sha256 5) 2) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))
```

:::note
Friendly reminder, the output here is specific to the hash you used.
:::

We now have the same functioning password check, but the expected password is not revealed in the bytecode. We can try it out with:

```bash
brun '(a (q 2 (i (= (sha256 5) 2) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))' "(hello)"
```

:::warning
This is not a suitable security check for anything more than good fun!
While great as an exercise and a good building block for what is to come, there are some serious problems with this approach.

When we create our coin in the next section, we will be submitting our code to the blockchain for the world to see. And to spend this coin, you must provide a solution.

The provided solution is also visible, so when we provide a solution, we are revealing our password. You may get lucky and have your coin go through as you'd expect (assuming no tampering from a full node who sees your solution), but you will now never be able to use the same password again safely. And any other coins using this hash are now also tainted.

Once the association is made between an input and a hash value, all security is lost. This is exactly how hash lookup tables work. They are a giant record of common inputs and their associated sha256 hashes.

The solution to this problem is to instead use signatures, which we will get to.
:::

## Writing the Puzzle

While we know the use of hashes is not perfect, we will still use them to get some practice creating coins. This will allow us to see the security problems as well.

This is a slightly more complicated Chialisp program than what we've explored before. As such, we've provided comments to explain each part.

Write the following in `password.clsp`:

```chialisp title="password.clsp"
;;; This puzzle locks coins with a password.
;;; It should not be used for production purposes.
;;; Use a password that has no meaning to you.

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

The key differences are the introduction of `conditions` in the parameter list and `(x)` at the bottom of the code. Let's explain both of these.

- First off, the `(x)` is easy. If the password is invalid, the `if` evaluates to `false` and the program fails. The coin remains unspent.

- Conditions is a list that will be provided by the spender to control what happens with the coin. Instead of only being able to output a value like `Correct!`, the user can customize the functionality by providing specific requests in their provided solution. We'll see this in action and learn how to write the conditions later.

:::note
The blockchain doesn't understand anything other than a list of conditions as an output. Anything else will be ignored and cause the spend to be thrown out.

Everything up to this point has just been a readable example that can be run on the CLI.
:::

## Puzzle Hash

A coin id consists of the following things hashed together:

- The id of its parent (`parent_coin_id`)
- The hash of its puzzle (`puzzle_hash`)
- The amount of mojos locked with it (`amount`)

In other words, you can calculate the coin id in Chialisp like this:

```chialisp
(sha256 parent_coin_id puzzle_hash amount)
```

We need to calculate the puzzle hash before we can create the coin.

:::note
If this command outputs two values, copy the first one.
:::

Paste the compiled CLVM into this command to calculate the hash:

```bash
opc -H "<Compiled CLVM>"
```

Write this value down somewhere you can refer to later.

:::note
Whenever you see `PuzzleHash`, replace it with this value.
:::

## Puzzle Reveal

The puzzle reveal is just a serialized form of the puzzle, written in hex. It is what you must reveal on-chain when spending a coin, and is compared against the puzzle hash to validate it.

We need to calculate the puzzle reveal to spend the coin.

Paste the compiled CLVM into this command to calculate the hash:

```bash
opc "<Compiled CLVM>"
```

Write this value down somewhere you can refer to later.

:::note
Whenever you see `PuzzleReveal`, replace it with this value.
:::

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

## Create Coin Condition

There are many conditions that can enable advanced functionality, but one of the most important ones is `CREATE_COIN`. It is identified by the opcode `51` and is used to create a new coin if the spend is successful. Each condition is defined as a list (beginning with the opcode, followed by each parameter). In the case of `CREATE_COIN`, we will give it a `puzzle_hash` (an alternative, unencoded format for an _address_) and an `amount`.

### Get the Address

:::caution
Your address will be different than the one shown below. Do not copy this value.
:::

Run the following command to get your address:

```bash
chia wallet get_address
```

Which should produce an output similar to this:

```
txch1u6rk0w3tgv0t3m7ehrwsmdng6hqvqrr6qn5r767x2pxq7f3xlhmq2gva00
```

### Convert to Puzzle Hash

:::caution
The decoded puzzle hash will also be different than the one shown below.
:::

Now that you have one of your addresses, you can convert it to a puzzle hash with this command:

```bash
cdv decode "Your Address"
```

Which should produce an output similar to this:

```
e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6
```

### Build the Condition

:::important
For the `CREATE_COIN` condition we will use this puzzle hash prefixed with `0x`.
:::

The condition will end up looking something like this:

```
(51 0xe68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6 9900000000)
```

## Security
