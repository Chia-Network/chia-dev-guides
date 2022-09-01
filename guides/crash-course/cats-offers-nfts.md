---
slug: /crash-course/cats-offers-nfts
title: CATs, Offers and NFTs
---

For this lesson you will want Chia installed and synced on testnet.

## What is a CAT?

Put simply, a CAT (Chia asset token) is a token built on top of the Chia blockchain. This will allow you to create a cryptocurrency on the Chia blockchain with its own set of issuance rules.

Token issuance is controlled by a CAT's TAIL (Token Asset and Issuance Limitations). The TAIL is a Chialisp program describing the rules for creation and destruction of a CAT.

For example, the TAIL may limit the creation to **one-time minting**. Any tokens created using this specific TAIL program will only be minted once during creation. When spent, any new coins created will share the same TAIL.

## CAT Creation Tool and Setup

Up next we will clone the CAT creation tool which will simplify creating a cat by providing all of the necessary TAIL Chialisp files.

```
sudo apt-get install -y build-essential python3-dev
git clone https://github.com/Chia-Network/CAT-admin-tool.git -b main --recurse-submodules
cd CAT-admin-tool
python3 -m venv venv
. ./venv/bin/activate
py -m pip install --upgrade pip setuptools wheel
pip install .
pip install chia-dev-tools --no-deps
pip install pytest
```

At this point you should be able to execute `cats --help` and `cdv --help`.

Verify your node is synced:

`chia show -s`

And you can confirm you have TXCH (or XCH on mainnet) with:

`chia wallet show`

## Creating a Single-Issuance CAT

We will only be worrying about creating a single-issuance CAT in this lesson. If you want more experience, you can move on to create a multi-issuance CAT. **For every 1 CAT created you will need to spend 1,000 Mojo**. This means spending 0.1 Chia (100,000,000,000 Mojo) will produce a CAT with a max supply of 100 million.

```
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to <your receive address> --amount <XCH mojos> -m <fee in XCH mojos> --as-bytes --select-coin
```

For the fee we recommend 100 million Mojo (`-m 100000000`).

The final line of the output will be `Name: <Coin ID>`. You’ll use the coin ID value in the next step.

Run the same command again, this time removing the --select-coin flag and adding a new flag, `--curry <Coin ID>`. It’s very important to preface the coin ID with 0x here to make CLVM interpret the value as bytes and not a string. Here’s the full command to run:

```
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to <your receive address> --amount <XCH mojos> -m <fee in XCH mojos> --as-bytes --curry 0x<Coin ID>
```

This command will give the following output:

The transaction has been created, would you like to push it to the network? (Y/N)

Enter `Y`.

The output will be `Asset ID: <Asset ID>`. Copy the asset ID to import the CAT in to the client.

This token can be displayed in your wallet using the GUI or with the CLI:

```
chia wallet add_token -id <Asset ID> -n <custom coin name> -f <fingerprint>
```

Creating a CAT on mainnet works the exact same way, you'll just be spending real XCH instead of TXCH!

<details>
<summary>Example</summary>
Here are the exact commands I issued to create a custom CAT.

```
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch14t42glxxe93hy29nevq56j4mdupfgazkmkgxzt38p5achh3vmu0qwsqdnt --amount 100000000000 -m 100000000 --as-bytes --select-coin
```

Response:

```
{
    "amount": 999889999998,
    "parent_coin_info": "0x4d847cddc91a294b82f01c17e09bfdffb1ddadf0e41b6765a127ef1312b6ebf1",
    "puzzle_hash": "0xaaeaa47cc6c9637228b3cb014d4abb6f02947456dd90612e270d3b8bde2cdf1e"
}
Name: fa514c961ad13b154708da36750f28f905b45e0e5dd53e856b49e55886a18a20

```

```
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch14t42glxxe93hy29nevq56j4mdupfgazkmkgxzt38p5achh3vmu0qwsqdnt --amount 100000000000 -m 100000000 --as-bytes --curry 0xfa514c961ad13b154708da36750f28f905b45e0e5dd53e856b49e55886a18a20
```

Response:

```
The transaction has been created, would you like to push it to the network? (Y/N)

Successfully pushed the transaction to the network
Asset ID: 2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844
Eve Coin ID: a16bcc6fbc1a21c6855f3e6f24bb9e16959932e79bd29662ab08690f50e723bf
```

I then added this token to the wallet:

```
chia wallet add_token -id 2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844 -n ccoin
```

Response:

```
Successfully added ccoin with wallet id 2 on key 1660000549
```

I could then check my balance:

```
chia wallet show
```

Response:

```
...
ccoin:
   -Total Balance:         100000000.0  (100000000000 mojo)
   -Pending Total Balance: 100000000.0  (100000000000 mojo)
   -Spendable:             100000000.0  (100000000000 mojo)
   -Type:                  CAT
   -Asset ID:              2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844
   -Wallet ID:             2

...
```

</details>

## Offers

With an offer you can trade assets with others directly in a decentralized manner. For example, we can put an offer up for someone to trade their Chia for your new token. Anyone could then accept this offer.

For this command you will need your wallet IDs, which you can get from `chia wallet show`.

To create an offer to sell 1,000 of your new CAT for some Chia, issue the `make_offer` command:

```
chia wallet make_offer -o <wallet_id:amount> -r <wallet_id:amount> <path>
```

Where `wallet_id:amount` could look like `1:1000`.

<details>
<summary>Example</summary>

This is the command I issued to create an offer to trade 1,000 of my custom CAT for .01 Chia.

```
chia wallet make_offer -o 2:1000 -r 1:.01 -p ~/Desktop/offer1
```

Response:

```
Creating Offer
--------------

OFFERING:

- 1000 ccoin (1000000 mojos)
  REQUESTING:
- .01 XCH (10000000000 mojos)
  Confirm (y/n): y
  Created offer with ID b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd
  Use chia wallet get_offers --id b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd -f 1660000549 to view status
```

```
chia wallet get_offers --id b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd -f 1660000549
```

Response:

```

Record with id: b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd
---------------
Created at: 2022-09-01 11:30:49
Confirmed at: Not confirmed
Accepted at: N/A
Status: PENDING_ACCEPT
---------------
```

</details>

This creates a file on your computer and nothing is sent to the blockchain. Because of this, it is not a transaction and no fees are required. This file can be shared or uploaded to the web and anyone can use it to finalize the trade.

<details>
<summary>What is in an Offer File?</summary>

It'll look something like:

`offer1qqz83wcsltt6wcmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpafs8tkhg2qa9qmzp08ydjpg006k9ju0r3x57a2gt5x9u7j0fn7gllxjau2udha0mvnqkm6uqf23vazn6cua3vt4mzmhwjahp50v807ma2fxwhd2kn2njcmytt2emzsln0u44xz8hzvrtqd2t9vz0alaa9m992xy5k9fhkjepaur0hlm088p2vandlnm747hmyl9dxafx44c83lfa0llef54rulm04tg0t7lmxth646y0289h36rexueuq4lq8c68mj37cpfujfr9k8ar4k8ar4k8dr4k8d84sx0fu3jmra6xkl2qptmstehm8cnmc6mdxn0rvdejdfpway2ccm6srenn6urvdmgvand96gat25z4tf4dlxa2yayde2t4h320uwtvf3z0wxta54n797slkhzka3wsnufzputks4vptnqsme69v3sgxdevw7mv507rlpluh89uy54njg6kfl8slkr383kw49j5ka73rre7dnut0v9v6xn9366zu7uaq0fz3yng7rsfcgrzqsgxx3qf5e0lzugx4c0adln8wuhcfavpmjzs5pcm0ya8xkzpcthp90t0n5fgtan0x4hjl28ecrh035ju0h90mp5xctxklh0j4m53hm6qq593ehls26aklf0mn7lvehj5xm26nywsvn389h87h2n2t36dhu68drpg0fp8e4z5q40klut3cvdu7a2vug0mnvwdh5g78wfu2kck6n8hq5vk08llzck4t46e0mtks2gtflmlc8pwcvle0wjpfra4cmd7t2lvncnnvadx68ean9axykk7dj8ypau2a08ll7p9ttuk6swrhx2u5jcljd9r4lt7ul9x9yjkzae8yn42nu66wl0a8wf0qaepevya6nc8ls0rmwhedawwerv0ja00un2md43mfs39dfqx4ucpfrn0p288p0eytsa3x6qa59tdnlc9sndx2u8t3qcjeh8vw6sv88hf7l8m0peahx24h5944y3dk247utstljgvf0lw67mslv0dcvzsdqk95vv02yetz7h06dmnj3ehayrtekh4kwnla285hg9avj0xq70lfndalp345pmt0wd446wtu7j3klxlzhhxgu8xuhc07tykcsjmlunqvt9jejg4903wwa9v39fxpkp0za4hg48t7jg7pjv8t0lhlkxr26hx4a5mk8hjqqr8hvtgyf3fnt4`

</details>

If this is your first transaction using your new CAT, it'll lock up the entire coin. This is how the UTXO model works. Everything is defined as a coin, so coins can be combined and split in to new coins to reach exact values. For example, when sending someone 1.5XCH, you may actually send 2.0XCH, which will send a new coin worth 1.5XCH to the destination and a new coin of 0.5XCH back to an address you own as **change**.

When you create your CAT, it exists as a single coin for the entire CAT balance. By creating an offer you lock up that coin resulting in a reduced spendable balance. You can see this with `chia wallet show`.

```
ccoin:
   -Total Balance:         100000000.0  (100000000000 mojo)
   -Pending Total Balance: 100000000.0  (100000000000 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844
   -Wallet ID:             2

```

If someone accepts the offer and the transaction is completed, you will receive the difference as change.
