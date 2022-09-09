---
slug: /crash-course/introduction
title: Introduction
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

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

## Getting Started with Chia

You'll want to download Chia. You can refer to the [download instructions](#) for complete instructions as the instructions vary for different operating systems. The installer is usually the simplest and we will go through how to set up the `chia` command for CLI use.

To make the commands as close as possible across operating systems I recommend Windows users [download Git](https://git-scm.com/download/win), which comes with Git bash. You can of course use Windows Command Prompt or PowerShell, but commands may be slightly different.

Before we get started using the CLI, we need to be able to issue the `chia` command.

Use this line in Git Bash / terminal:

```mdx-code-block
<Tabs groupId="OS"
  defaultValue="windows (Git Bash)"
  values={[
    {label: 'Windows (Git Bash)', value: 'windows (Git Bash)'},
    {label: 'Linux/MacOS', value: 'nix'},
  ]}>
  <TabItem value="windows (Git Bash)">
```

```
~/AppData/Local/chia-blockchain/app-1.5.1/resources/app.asar.unpacked/daemon/chia.exe
```

```mdx-code-block
  </TabItem>
  <TabItem value="nix">
```

```
/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Response:

```
Usage: chia.exe [OPTIONS] COMMAND [ARGS]...

  Manage chia blockchain infrastructure (1.5.1)

Options:
  --root-path PATH                Config file root  [default:
                                  C:\Users\calebcurry\.chia\mainnet]

  --keys-root-path PATH           Keyring file root  [default:
                                  C:\Users\calebcurry\.chia_keys]

  --passphrase-file FILENAME      File or descriptor to read the keyring
                                  passphrase from

  --force-legacy-keyring-migration / --no-force-legacy-keyring-migration
                                  Force legacy keyring migration. Legacy
                                  keyring support will be removed in an
                                  upcoming version!

  -h, --help                      Show this message and exit.

Commands:
  configure   Modify configuration
  db          Manage the blockchain database
  farm        Manage your farm
  init        Create or migrate the configuration
  keys        Manage your keys
  netspace    Estimate total farmed space on the network
  passphrase  Manage your keyring passphrase
  plotnft     Manage your plot NFTs
  plots       Manage your plots
  plotters    Advanced plotting options
  rpc         RPC Client
  run_daemon  Runs chia daemon
  show        Show node information
  start       Start service groups
  stop        Stop services
  version     Show chia version
  wallet      Manage your wallet

  Try 'chia start node', 'chia netspace -d 192', or 'chia show -s'

```

Using this path each time can get old, so you have the option of creating an alias or environment variable.

```mdx-code-block
<Tabs groupId="OS"
  defaultValue="windows (Git Bash)"
  values={[
    {label: 'Windows (Git Bash)', value: 'windows (Git Bash)'},
    {label: 'Linux/MacOS', value: 'nix'},
  ]}>
  <TabItem value="windows (Git Bash)">
```

```
alias chia=~/AppData/Local/chia-blockchain/app-1.5.1/resources/app.asar.unpacked/daemon/chia.exe
```

```mdx-code-block
  </TabItem>
  <TabItem value="nix">
```

```
alias chia=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Now, you can just say:

```
chia
```

## Getting Started with the CLI

Once you can issue the `chia` command, the differences between operating systems are minimal.

To gain more experience in Chia and to be more comfortable with troubleshooting you should become comfortable with the command line interface (this will allow you to interact with Chia through the terminal). A lot of other tools like madMAx plotter also are commonly used through the terminal.

:::info
madMAx is a software created as an alternative way of creating plots for Chia. The software performed great and was ultimately brought in to the official software. This is the easiest way to get started created plots with Chia.
:::

The instructions to use the CLI depends on the operating system, you can get the exact instructions in [this document](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

So the goal is to be able to use the `chia` command from the terminal. On mac, you can issue `/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia`.

Add this to your path with `PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH`. This will allow you to just type `chia` in the terminal without everything else.

Now that you have the CLI running you can initialize Chia.

```
chia init
```

```
chia keys generate
```

## Getting on Testnet

If you are already on a testnet, skip to [instructions for the CLI](#cli).

For most dev work on Chia, you'll want to be on the testnet. That way, you're learning with fake Chia and don't put any funds at risk.

```
chia stop all -d
```

```
chia configure --testnet true
```

```
chia start farmer
```

Response:

```
chia_harvester: started
chia_farmer: started
chia_full_node: started
chia_wallet: started
```

## CLI

At this point you should be able to use the CLI to get information about your farm and confirm you are on testnet.

```
chia show --state
```

Response:

```
Network: testnet10    Port: 58444   RPC Port: 8555
Node ID: 67095d445d879556da95feeee70174c66b131d4f29bd447df5fbc56789a01f24
Genesis Challenge: ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2
Current Blockchain Status: Not Synced. Peak height: 1462514
      Time: Wed Aug 31 2022 13:49:51 EDT                  Height:    1462514

Estimated network space: 1.181 TiB
Current difficulty: 708
Current VDF sub_slot_iters: 70778880
Total iterations since the start of the blockchain: 3364480016373

  Height: |   Hash:
  1462514 | d799fedae1ef226669f61ad843c5ae7947b42e596664f39fd68fcd299e076916
  1462513 | 0764f546d9186da788485ce69ebe91969e8cf9495722d9567d67e54e3e3e6ed3
  1462512 | d6132b015365b7609d0b5179b9daf9e4fd2ad7a9040ec1d13e15df65660cf69e
  1462511 | 8ae2273b4a86fd9af85837c538faa75b572014ac281c6c51ad1eb4ce2a7f8072
  1462510 | fb392a40b7e3bf38c8628311224b5aaa4a32ecdea403c16ae5d3c48d16b57f47
  1462509 | 012b1f9213bf823e6b73408019f18ff8330e46b911ba78c1d64fd5019d6cc6d9
  1462508 | e0f66ca2e00566eee9a3ce4028b6aa11771aa42c9bce34f296d89f42d1a909ce
  1462507 | c900e2fb449db0def030a3c0e6a8bff5d23f6470730236120bcac442b2f1ab0f
  1462506 | 39db9fe7658b545dcf45e8e99797c937b7b93a041485ef28bf9cda2b3529ac0a
  1462505 | ca343b0e985fe9dafb7cba7cee0c1515c6bddd732e2542b8fbd49ac8d90c13f3

```

Ideally, you'll see within this response a value like `Current Blockchain Status: Syncing 1462514/1462514 (0 behind)` showing that you are syncing.

<details>
<summary>Testnet Database</summary>

For many things you will need a synced full node. Fortunately, an official [testnet database](https://downloads.chia.net/testnet10/) download is available, which can be a much faster option than syncing from scratch.

Once this file is downloaded, stop your node:

```
chia stop all -d
```

Now, **unzip the file** and replace the `blockchain_v2_mainnet.sqlite` database file in `/Users/<username>/.chia/mainnet/db` directory.

Once this is complete, you can restart chia.

```
chia start farmer
```

Now, you can confirm your sync height. It should be much closer to the peak height of the blockchain.

```
chia show --state
```

</details>

## Getting TXCH

For the rest of this workshop you will need some TXCH (Testnet Chia). You can get some for free from the [official Chia faucet](https://testnet10-faucet.chia.net/).

For this you will need a receive address.

```
chia wallet get_address
```

Example response:

```
txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre
```

Once this transaction has been added to the blockchain and your wallet sees it, you will have a TXCH balance.

```
chia wallet show
```

Example response:

```
Chia Wallet:
   -Total Balance:         0.899259999996 txch (899259999996 mojo)
   -Pending Total Balance: 0.899259999996 txch (899259999996 mojo)
   -Spendable:             0.899259999996 txch (899259999996 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

<details>
<summary>Sending Chia</summary>
You can send Chia through the CLI as well. This requires a little more information, but isn't too bad.

The command looks like this:

```
chia wallet send -i 1 -a <amount in XCH> -m <amount in fee in XCH> -t <target address>
```

The `-i 1` is the wallet ID. Later on we will have multiple wallet IDs to store different types of assets (tokens). For now, `-i 1` refers to the default Chia wallet as seen in the `-Wallet ID` response from the `chia wallet show` command.

Any Chia keys will have multiple receive addresses. You can test sending Chia by sending some to yourself (or a friend). Take a note of the response from `chia wallet get_address` command.

```
chia wallet send -i 1 -a .01 -m 0 -t txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre
```

Response:

```
Submitting transaction...
Transaction submitted to nodes: ...
Run 'chia wallet get_transaction -f 1660000549 -tx 0x468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7' to get status
```

```
chia wallet get_transaction -f 1660000549 -tx 0x468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7
```

Response:

```
Transaction 468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7
Status: In mempool
Amount sent: 0.01 TXCH
To address: txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre
Created at: 2022-09-08 10:52:15
```

You can see `Status: In mempool`, which means a full node has not yet confirmed the transaction. This can take some time if the network is busy or if you did not include a fee. Ultimately we want this command to return `Status: Confirmed`.

You can see all your transactions as well:

```
chia wallet get_transactions
```

Response:

```
...

Transaction 2aa603c52e4b56b8af41a489081056de40421a6398caf4fbdc8be861eb210b2e
Status: Confirmed
Amount received in trade: 0.01 TXCH
To address: txch1ttx32j6lg9c6d4jhf9rdpugk7ulmuxsz4u42jdmy5xr94t933q5skfv0av
Created at: 2022-09-01 13:40:07

Transaction 29dd86e548957ff90bebd83aaa11f5e5f0fa4978f9c207252137dcbed40b2222
Status: Confirmed
Amount sent in trade: 0.01 TXCH
To address: txch1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszf0rpn
Created at: 2022-09-01 13:40:07

...
```

</details>
At this point you have a Chia wallet and a basic understanding of the CLI. You should now be able to move on to the next section which will introduce many of the Chia primitives including CATs, offers, and NFTs.
