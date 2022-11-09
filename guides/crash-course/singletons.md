---
slug: /crash-course/singletons
title: Singletons
---

## Coin Set Refresher

Before we jump in to the bulk of this lesson I wanted to remind you of how the chia blockchain works. Chia uses a **coin set** model very similar to that of Bitcoin's UTXO model. This is very different than the account model used in other major chains. Instead of having an account with a _balance_, you just have a collection of unspent coins that you are able to spend.

For example:

- Coin 1: 0.25 XCH
- Coin 2: 1.75 XCH
- Coin 3: 0.25 XCH
- Coin 4: 1.75 XCH

Balance: 4 XCH

You will often hear "everything is a coin" being said. This is true!

This introduces some unique approaches to creating software on the Chia blockchain.

To use Chialisp on the Chia blockchain, we must create a coin. As part of the coin set model, spending a coin results in a collection of removals and additions. The removals are your existing coins used for the spend being destroyed, and the additions are new coins (including any change) being created.

Here is an example

1. Say you have 1.75 XCH
1. You send .75 XCH to some address (remember, an address is an encoded form of puzzle hash)
1. This results in all 1.75 of your XCH being spent
1. a new coin worth 1 XCH is created to be returned back to you (this is called change)
1. a new coin worth .75 XCH is created for the destination puzzle hash

Another example:

1. Say you have 2 XCH made up of multiple small coins
1. You send 1 XCH to some address
1. Coins of .1 XCH, .5 XCH, and .45 XCH are being spent to sum up to 1.05 XCH (greater than or equal to 1 XCH spend)
1. a new coin worth .05 XCH is created to be returned back to you
1. a new coin worth 1 XCH is created for the destination puzzle hash

## State and Singletons

We are now going to be discussing the idea of state. State is used to maintain some value on-chain. In the world of Chia, this is done with a singleton coin.

A singleton is something that can only have a single instance, but to update a singleton in Chia the existing is destryoed and a new is created. Because the singleton will be a series of spent coins and new coins created over time, we need a different way than the coin ID to identify a singleton. A singleton is instead identified by its **launcher ID**, which is the coin ID of the singletons parent coin. This parent coin is the coin used to create the initial coin of the singleton.

## Why are Singletons Important?

Anyone can create a coin with any puzzle. This means there is a good chance there will be multiple coins with the same puzzle hash. This can lead to confusion as to which coin is which, and may lead to confusion or mistakes. A singleton allows for something to exist on chain that is provably unique. This helps us be sure that we are working with the correct coin.

Additionally, following the chain of coins for a singleton, we can see the history of state and how it has changed.
