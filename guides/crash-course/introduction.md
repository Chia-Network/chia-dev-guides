---
slug: /crash-course/introduction
title: Introduction
---

The course is designed to give you an end-to-end introduction to Chia.
We'll start off with the foundations of the Chia blockchain. This includes an having a foundational understanding of blockchain and what makes Chia different.
Once you understand the basics, we'll learn about plotting and farming. Next, we'll cover many of the DeFi possibilities including tokens (CATs), NFTs, and writing custom coins with Chialisp.

:::info
Chialisp is Chia's on-chain programming language for writing custom coins. If you want to skip ahead to development, see [this course's intro to Chialisp](#).
:::

## Intro to Chia

The goal of cryptocurrency is to transfer value peer-to-peer. This means that there is no centralized intermediary to facilitate the transaction. Instead, blockchain relies on a network of nodes to confirm transactions according to some rules. Additionally, cryptocurrency makes the exchange of value extremely fast and easy, even if the transaction is cross-border.

Cryptocurrency is more than digital currency. We are seeing many projects pop up that are designed as decentralized applications, or **dApps**. The value of a cryptocurrency is not only in its ability to be used for buying and selling goods, but that it can be used as a tool to secure a blockchain that designed to avoid centralized authority.

Each person who runs a chia blockchain node runs a full copy of the software and is required to adhere to the consensus algorithm. This allows for peer-to-peer transactions confirmed against an entire network of nodes as opposed to a centralized authority.

### Consensus

As new transactions are added to the network, full nodes must confirm these transactions. For a decentralized network to work, every node must be in agreement with every other node. This means they must follow the same rules.

The rules are known as the **consensus** and are rules defined in the software every node must adhere to.

Chia follows a consensus mechanism (algorithm, protocol) known as **Proof of Space and Time**. The way it works is by utilizing hard drive space as your contribution to the network.

Chia is intentionally different than networks that use proof-of-stake, which many argue has a centralizing effect of the network as the number of decision-making nodes can be few. Chia, on the other hand, has over 350,000 full nodes all following the PoST consensus mechanism, a protocol that is similar to that of Bitcoin (but with less electricity use).

### Decentralization

For a network to be decentralized we want the creation of a full node to be possible for many. Ideally running a full node would be as permissionless as possible.

Anyone can become a full node in Chia. The majority of computers can handle the technical requirements with many people even running off of a Raspberry Pi. A full node can be ran with less storage requirements and computing power. These smaller requirements for a full node allow for stronger decentralization.

Farmers in the network are those who designate hard drive storage to support the network. The more space you reserve, the higher chances you have of confirming a block and getting rewarded Chia (XCH). As you'll learn, the network has grown so much that solo farming can be quite unrewarding with massive times to win. Pooling was introduced as a solution to more evenly distribute farming rewards based on your space contribution.

Pooling is possible with other major cryptocurrencies but a major difference is that the Chia network designed an official protocol for pooling where the individual farmers confirm a block rather than the pool. This completely removes the problem of centralization introduced by current PoW mining. Centralized mining power puts the integrity of the network in question as the possibility of 51% attacks exist. This specific centralization problem is not a problem with the pooling protocol even if a single farming pool maintained a majority of the network.

Essentially, Chia is a blockchain that is decentralized, uses significantly less electricity, and offers dApp capabilities with the Chialisp programming language.

## Getting Started with the CLI

You can refer to the [download instructions](#) for complete instructions as the instructions vary for different operating systems. For this course we suggest **installing from source**.

Once you can issue the `chia` command, the differences between operating systems are minimal.

To gain more experience in Chia and to be more comfortable with troubleshooting you should become comfortable with the command line interface (this will allow you to interact with Chia through the terminal). A lot of other tools like madMAx plotter also are commonly used through the terminal.

:::info
madMAx is a software created as an alternative way of creating plots for Chia. The software performed great and was ultimately brought in to the official software. This is the easiest way to get started created plots with Chia.
:::

The instructions to use the CLI depends on the operating system, you can get the exact instructions in [this document](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

So the goal is to be able to use the `chia` command from the terminal. On mac, you can issue `/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia`.

Add this to your path with `PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH`. This will allow you to just type `chia` in the terminal without everything else.

An example of how you can use the CLI is getting information about your farm.

```
chia show --state
```

```
chia farm summary
```
