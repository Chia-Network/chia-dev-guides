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
<summary>Concrete Example</summary>
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
