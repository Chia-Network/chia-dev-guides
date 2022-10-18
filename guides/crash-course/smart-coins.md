---
slug: /crash-course/smart-coins
title: Smart Coins
---

Everything on the Chia blockchain is a **coin**. They are often referred to as **smart coins** because every coin has a Chialisp program associated with it. That program, known as a **puzzle**, decides how and when the coin can be spent, and what happens when it is. NFTs, CATs, and standard transactions are all defined using puzzles.

Now that you have learned how to write basic Chialisp programs, you can apply that to puzzles. There's a bit more involved in creating a puzzle and using it for a coin, but we'll get into that more later.

In this lesson, we will be writing a puzzle that requires a simple password to unlock coins that use it.

:::note
If you are using PowerShell, make sure to install the PowerShell 7.3 preview version:

```bash
winget install --id Microsoft.Powershell.Preview --source winget
```

This version fixes nested quoting, which is required for many of the commands on this page.
:::

:::danger
While this is great for learning the fundamentals, it is an insecure way to protect funds on a blockchain. We will explore the reason and better methods later on.
:::

## Basic Example

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

This is cool, but we want to avoid hardcoded values when possible. This introduces our next concept called _currying_. Currying allows us to write a generalized program that can be used for many different password options. This way, we're not stuck with just a single password of `hello`. Let's see how this works in the next section.

## Currying Example

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

Now that we've introduced currying, we can create a different program using a different `CORRECT_PASSWORD` without modifying any of the source code.

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

## Hashing Example

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

Now replace the contents of `password.clsp` with this:

```chialisp title="password.clsp"
(mod (PASSWORD_HASH password)
    (if (= (sha256 password) PASSWORD_HASH)
        "Correct!"
        "Incorrect :("
    )
)
```

### Hash the Password

The first step to using this program is to find the hash of our desired password.

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

Write this value down somewhere you can refer to later.

### Curry the Hash

We now need to curry the value for `PASSWORD_HASH` into this program. This will produce a new program unique to this password.

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

We now have the same functioning password check, but the expected password is not revealed until spent with the correct password. We can try it out with:

```bash
brun '(a (q 2 (i (= (sha256 5) 2) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))' "(hello)"
```

:::warning
This is not a suitable security check for anything more than good fun!
While great as an exercise and a good building block for what is to come, there are some serious problems with this approach.

When we create our coin in the next section, we will be submitting our code to the blockchain for the world to see. And to spend this coin, you must provide a solution.

The provided solution is also visible, so when we provide a solution, we are revealing our password. You may get lucky and have your coin go through as you'd expect (assuming no tampering from a full node who sees your solution), but you will now never be able to use the same password again safely. And any other coins using this hash are now also tainted.

Once the association is made between an input and a hash value, all security is lost. This is exactly how hash lookup tables work. They are a giant record of common inputs and their associated sha256 hashes.

The solution to this problem is to instead use signatures, which we will get to in the future.
:::

## Final Puzzle

While we know the use of hashes is not perfect, we will still use them to get some practice creating coins. This will allow us to see the security problems as well.

This is a slightly more complicated Chialisp program than what we've explored before.

Write the following in `password.clsp`:

```chialisp title="password.clsp"
(mod (PASSWORD_HASH password conditions)
    (if (= (sha256 password) PASSWORD_HASH)
        conditions
        (x)
    )
)
```

The key differences are the introduction of `conditions` in the parameter list and `(x)` at the bottom of the code. Let's explain both of these.

- First off, the `(x)` operator raises an error. If the password is invalid, the `if` evaluates to `false` and the program terminates (the coin remains unspent).

- Conditions is a list that will be provided by the spender to control what happens with the coin. Instead of only being able to output a value like `Correct!`, the user can customize the functionality by providing specific requests in their provided solution. We'll see this in action and learn how to write the conditions later.

:::note
The blockchain doesn't understand anything other than a list of conditions as an output. Anything else will be ignored and cause the spend to be thrown out.

Everything up to this point has just been a readable example that can be run on the CLI.
:::

### Curry the Hash

We need to curry the value for `PASSWORD_HASH` into the new password puzzle. This will produce a new puzzle unique to this password.

:::caution
If you decided to use a different password, you will need to issue these commands with a different hash. Replace the hash in this command with the one you calculated. **It is important to not forget the `0x` prefix in front of the hash**, since you are representing it as a Chialisp value.
:::

Run the following command:

```chialisp
cdv clsp curry password.clsp -a "0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
```

Which, with this hash, outputs the following compiled CLVM program:

```chialisp
(a (q 2 (i (= (sha256 5) 2) (q . 11) (q 8)) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))
```

:::note
Friendly reminder, the output here is specific to the hash you used.
:::

### Puzzle Hash

We need to calculate the puzzle hash before we can create the coin.

This is because a coin id consists of the following things hashed together:

- The id of its parent (`parent_coin_id`)
- The hash of its puzzle (`puzzle_hash`)
- The amount of mojos locked with it (`amount`)

In other words, you can calculate the coin id in Chialisp like this:

```chialisp
(sha256 parent_coin_id puzzle_hash amount)
```

Paste the compiled CLVM into this command to calculate the hash:

```bash
opc -H "<Compiled CLVM>"
```

:::note
If this command outputs two values, copy the first one.
:::

Write this value down somewhere you can refer to later.

### Puzzle Reveal

The puzzle reveal is just a serialized form of the puzzle, written in hex. It is what you must reveal on-chain when spending a coin.

Paste the compiled CLVM into this command to calculate the hash:

```bash
opc "<Compiled CLVM>"
```

Write this value down somewhere you can refer to later.

### Creating the Coin

Now that you have the puzzle hash and puzzle reveal, you can easily create the coin using the Chia wallet.

:::tip
A wallet address is just an encoded form of a puzzle hash.
:::

You can calculate the address used for your password puzzle with this command:

```bash
cdv encode -p txch "<Puzzle Hash>"
```

Which should produce an output similar to this:

```
txch1sazy7z6gj2wq7yw4ztj7p3meffcun23qu8psx92vekngulqurfzsn9uyqv
```

:::note
Remember that this address will change based on which password you used.
:::

Next, you can either create a coin with that address by using the Chia wallet GUI or on the command-line.

If you choose to do it via the command-line, run the following command with the address you just calculated:

```bash
chia wallet send --amount 0.01 --fee 0.00005 --address "txch1sazy7z6gj2wq7yw4ztj7p3meffcun23qu8psx92vekngulqurfzsn9uyqv"
```

### Spending the Coin

We will now spend the coin to release the value back to our wallet (minus fees).

:::note
There are many conditions that can enable advanced functionality, but one of the most important ones is `CREATE_COIN`. It is identified by the opcode `51` and is used to create a new coin if the spend is successful. Each condition is defined as a list (beginning with the opcode, followed by each parameter). In the case of `CREATE_COIN`, we will give it a `puzzle_hash` (an alternative, unencoded format for an _address_) and an `amount`.

We will be using the `CREATE_COIN` condition to create a new coin in our wallet with the value locked in the password coin.
:::

Run the following command to get your address:

```bash
chia wallet get_address
```

Which should produce an output similar to this:

```
txch1u6rk0w3tgv0t3m7ehrwsmdng6hqvqrr6qn5r767x2pxq7f3xlhmq2gva00
```

Now that you have one of your addresses, you can convert it to a puzzle hash with this command:

```bash
cdv decode "<Your Address>"
```

Which should produce an output similar to this:

```
e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6
```

:::important
For the `CREATE_COIN` condition, we will use this puzzle hash prefixed with `0x`.
:::

Use the puzzle hash to build the condition, which will end up looking something like this:

```chialisp
(51 0xe68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6 9950000000)
```

:::caution
It is especially important that you use **your wallet address** here, not the example.
:::

The solution is a list of arguments, consisting of a list of conditions containing the one above:

```
opc "(((51 0xe68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6 9950000000)))"
```

Which should produce an output similar to this:

```
ffffff33ffa0e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6ff85025110f380808080
```

Run the following command to get the coin record by the puzzle hash you used earlier:

```bash
cdv rpc coinrecords --by puzzlehash "<Puzzle Hash>"
```

This should produce an output similar to this:

```json
[
  {
    "coin": {
      "amount": 10000000000,
      "parent_coin_info": "0x88dae7d74a7b5edc8b4d46124e221a00d7b9f59042cd98be76472b663b2ce813",
      "puzzle_hash": "0x87444f0b48929c0f11d512e5e0c7794a71c9aa20e1c303154ccda68e7c1c1a45"
    },
    "coinbase": false,
    "confirmed_block_index": 1681937,
    "spent": false,
    "spent_block_index": 0,
    "timestamp": 1666117720
  }
]
```

Now, using that as a reference, write the following in a file named `spendbundle.json`:

```json
{
  "coin_spends": [
    {
      "coin": ...,
      "puzzle_reveal": "<Puzzle Reveal>",
      "solution": "<Solution>"
    }
  ]
}
```

:::note
For the `coin` field, copy and paste the coin found using the `coinrecords` command. This is the coin that you created before, and are now spending.
:::

Finally, submit the transaction to the mempool by running this final command:

```bash
cdv pushtx spendbundle.json
```

If everything was successful, this transaction should be successful, and you should see your wallet balance increase after some time passes. It won't be identical to when you started because of the total of `0.0001` network fees added throughout the process.

## Security
