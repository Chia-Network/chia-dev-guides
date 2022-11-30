---
slug: /crash-course/state
title: State
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

## What's Next?

We will be building a simple example of a coin to store some message that anyone can spend. This will be built off of the previous lesson's code, but you can find all of `index.ts` here:

<details>
<summary>index.ts</summary>

```ts
import { mnemonicToSeedSync } from 'bip39';
import { fromHex, PrivateKey, toHex } from 'chia-bls';
import { Coin, formatHex, FullNode, sanitizeHex, toCoinId } from 'chia-rpc';
import { KeyStore, StandardWallet } from 'chia-wallet-lib';
import { Program } from 'clvm-lib';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';

dotenv.config();

const mnemonic = process.env.MNEMONIC!;
const privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));

const dir = path.join(__dirname, '..');

const messagePuzzle = Program.deserializeHex(
  fs.readFileSync(path.join(dir, 'message.clsp.hex'), 'utf-8')
);

const node = new FullNode(os.homedir() + '/.chia/mainnet');
const keyStore = new KeyStore(privateKey);

const wallet = new StandardWallet(node, keyStore);
const genesis = fromHex(process.env.GENESIS!);

const amount = 1;
const fee = 0.00005e12;

async function newInstance(initialMessage: Program) {
  await wallet.sync();

  const spend = wallet.createSpend();

  // Curry the puzzle
  const puzzle = messagePuzzle.curry([
    // Mod hash
    Program.fromBytes(messagePuzzle.hash()),

    // Message is empty until the eve is spent
    Program.nil,
  ]);

  // Create the eve coin
  const send = await wallet.send(puzzle.hash(), amount, fee);
  spend.coin_spends.push(...send);

  // Calculate the root coin id
  const eveCoin: Coin = {
    parent_coin_info: formatHex(toHex(toCoinId(send[0].coin))),
    puzzle_hash: formatHex(puzzle.hashHex()),
    amount,
  };

  // Create the eve solution
  const solution = Program.fromList([
    // Message
    initialMessage,

    // Amount
    Program.fromInt(amount),
  ]);

  // Spend the eve coin
  spend.coin_spends.push({
    coin: eveCoin,
    puzzle_reveal: puzzle.serializeHex(),
    solution: solution.serializeHex(),
  });

  // Sign the wallet spend
  wallet.signSpend(spend, genesis);

  // Complete the transaction
  console.log('Eve coin id:', toHex(toCoinId(eveCoin)));
  console.log(await node.pushTx(spend));
}

interface SyncInfo {
  parent: string;
  current: string;
}

async function sync(): Promise<SyncInfo> {
  const eveCoinId = process.env.EVE_COIN_ID!;

  let current = eveCoinId;
  let parent = current;

  while (true) {
    // Fetch coins created by the current coin
    const coinRecords = await node.getCoinRecordsByParentIds(
      [current],
      undefined,
      undefined,
      true
    );
    if (!coinRecords.success) throw new Error(coinRecords.error);

    // If there are none, we are already synced
    if (!coinRecords.coin_records.length) break;

    // Update the parent
    parent = current;

    // Continue with the child coin as the new singleton
    const coinRecord = coinRecords.coin_records[0];
    current = toHex(toCoinId(coinRecord.coin));
  }

  return {
    parent,
    current,
  };
}

async function getMessage(syncInfo: SyncInfo): Promise<Program> {
  const coinRecord = await node.getCoinRecordByName(syncInfo.parent);
  if (!coinRecord.success) throw new Error(coinRecord.error);

  const puzzleAndSolution = await node.getPuzzleAndSolution(
    syncInfo.parent,
    coinRecord.coin_record.spent_block_index
  );
  if (!puzzleAndSolution.success) throw new Error(puzzleAndSolution.error);

  const spend = puzzleAndSolution.coin_solution;

  const solution = Program.deserializeHex(sanitizeHex(spend.solution)).toList();

  return solution[0];
}

async function printMessage() {
  const syncInfo = await sync();
  const message = await getMessage(syncInfo);
  console.log('Message:', message.toString());
}

async function setMessage(newMessage: Program) {
  await wallet.sync();

  const syncInfo = await sync();
  const message = await getMessage(syncInfo);

  // Fetch the coin record
  const coinRecord = await node.getCoinRecordByName(syncInfo.current);
  if (!coinRecord.success) throw new Error(coinRecord.error);

  const coin = coinRecord.coin_record.coin;

  const spend = wallet.createSpend();

  // Create the current puzzle
  const puzzle = messagePuzzle.curry([
    Program.fromBytes(messagePuzzle.hash()),
    message,
  ]);

  // Create the solution
  const solution = Program.fromList([newMessage, Program.fromInt(coin.amount)]);

  spend.coin_spends.push({
    // Spend the current singleton
    coin,

    // The puzzle reveal contains the old message
    puzzle_reveal: puzzle.serializeHex(),

    // Spend it with the new message
    solution: solution.serializeHex(),
  });

  const send = await wallet.sendFee(fee);

  spend.coin_spends.push(...send);

  wallet.signSpend(spend, genesis);

  console.log(await node.pushTx(spend));
}

// newInstance(Program.fromText('Hello, world!'));
// printMessage();
// setMessage(Program.fromText('Goodbye, world!'));
```

</details>

## State

We are now going to be discussing the idea of state. State is used to maintain some value on-chain. This can be done with a coin that recreates itself currying in a new value.

First, we will install the needed dependencies:

```
npm install bip39 chia-bls chia-rpc chia-wallet-lib clvm-lib dotenv
```

Here is an example coin that has a value curried in and is passed a new value as a solution.

```chialisp title=message.clsp
(mod (MOD_HASH MESSAGE new_message amount)
    (include condition_codes.clib)
    (include curry_and_treehash.clib)

    (defun-inline new_puzzle_hash (MOD_HASH new_message)
        (puzzle-hash-of-curried-function MOD_HASH
            (sha256 1 new_message)
            (sha256 1 MOD_HASH)
        )
    )

    (list
        (list CREATE_COIN (new_puzzle_hash MOD_HASH new_message) amount)
    )
)
```

Specifically, this will create a new coin using `CREATE_COIN` passing `MOD_HASH` and `new_message` to the `new_puzzle_hash` function which will calculate the puzzle hash to be used for the `create_coin` condition.

We will build this chialisp code with:

```
cdv clsp build message.clsp
```

in TypeScript we can create the initial coin with:

```ts
import { mnemonicToSeedSync } from 'bip39';
import { fromHex, PrivateKey, toHex } from 'chia-bls';
import { Coin, formatHex, FullNode, sanitizeHex, toCoinId } from 'chia-rpc';
import { KeyStore, StandardWallet } from 'chia-wallet-lib';
import { Program } from 'clvm-lib';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';

dotenv.config();

const mnemonic = process.env.MNEMONIC!;
const privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));

const dir = path.join(__dirname, '..');

const messagePuzzle = Program.deserializeHex(
  fs.readFileSync(path.join(dir, 'message.clsp.hex'), 'utf-8')
);

const node = new FullNode(os.homedir() + '/.chia/mainnet');
const keyStore = new KeyStore(privateKey);

const wallet = new StandardWallet(node, keyStore);
const genesis = fromHex(process.env.GENESIS!);

const amount = 1;
const fee = 0.00005e12;

async function newInstance(initialMessage: Program) {
  await wallet.sync();

  const spend = wallet.createSpend();

  // Curry the puzzle
  const puzzle = messagePuzzle.curry([
    // Mod hash
    Program.fromBytes(messagePuzzle.hash()),

    // Message is empty until the eve is spent
    Program.nil,
  ]);

  // Create the eve coin
  const send = await wallet.send(puzzle.hash(), amount, fee);
  spend.coin_spends.push(...send);

  // Calculate the root coin id
  const eveCoin: Coin = {
    parent_coin_info: formatHex(toHex(toCoinId(send[0].coin))),
    puzzle_hash: formatHex(puzzle.hashHex()),
    amount,
  };

  // Create the eve solution
  const solution = Program.fromList([
    // Message
    initialMessage,

    // Amount
    Program.fromInt(amount),
  ]);

  // Spend the eve coin
  spend.coin_spends.push({
    coin: eveCoin,
    puzzle_reveal: puzzle.serializeHex(),
    solution: solution.serializeHex(),
  });

  // Sign the wallet spend
  wallet.signSpend(spend, genesis);

  // Complete the transaction
  console.log('Eve coin id:', toHex(toCoinId(eveCoin)));
  console.log(await node.pushTx(spend));
}

newInstance(Program.fromText('Hello, world!'));
```

Running this, you will get a response similar to:

```
Eve coin id: a6c5a4d12456ae6dee553b1b17544799f561a62f678d7948df12f28d17bfa96e
{ status: 'SUCCESS', success: true }
```

Where the eve coin ID is the ID of the first coin.

## Retrieving the Message

We can retrieve the message by getting the eve coin and following its children to the latest, and the coin prior to the latest. The most recent message is provided in the solution of the spend of the previous coin.

For this to work, we read the `EVE_COIN_ID` from the `.env` file, which should now look something like:

```env title=.env
MNEMONIC=nasty sunny kingdom popular turn core rifle river twenty edit sort pill rice claw hollow please wash inform cannon empower emotion caught salt close
GENESIS=d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15
EVE_COIN_ID=5fe284bfa91c32fd274179769f5b808c916e5135e603cb292a90e04e5867bd1a
```

```ts title=index.ts
async function sync(): Promise<SyncInfo> {
  const eveCoinId = process.env.EVE_COIN_ID!;

  let current = eveCoinId;
  let parent = current;

  while (true) {
    // Fetch coins created by the current coin
    const coinRecords = await node.getCoinRecordsByParentIds(
      [current],
      undefined,
      undefined,
      true
    );
    if (!coinRecords.success) throw new Error(coinRecords.error);

    // If there are none, we are already synced
    if (!coinRecords.coin_records.length) break;

    // Update the parent
    parent = current;

    // Continue with the child coin as the new singleton
    const coinRecord = coinRecords.coin_records[0];
    current = toHex(toCoinId(coinRecord.coin));
  }

  return {
    parent,
    current,
  };
}

async function getMessage(syncInfo: SyncInfo): Promise<Program> {
  const coinRecord = await node.getCoinRecordByName(syncInfo.parent);
  if (!coinRecord.success) throw new Error(coinRecord.error);

  const puzzleAndSolution = await node.getPuzzleAndSolution(
    syncInfo.parent,
    coinRecord.coin_record.spent_block_index
  );
  if (!puzzleAndSolution.success) throw new Error(puzzleAndSolution.error);

  const spend = puzzleAndSolution.coin_solution;

  const solution = Program.deserializeHex(sanitizeHex(spend.solution)).toList();

  return solution[0];
}

async function printMessage() {
  const syncInfo = await sync();
  const message = await getMessage(syncInfo);
  console.log('Message:', message.toString());
}

printMessage();
```

This should output the initial message:

```
Message: "Hello, world!"
```

## Updating the Message

Finally, we can create a new coin by spending the existing coin and providing a new message in the solution.

```ts
    await wallet.sync();

    const syncInfo = await sync();
    const message = await getMessage(syncInfo);

    // Fetch the coin record
    const coinRecord = await node.getCoinRecordByName(syncInfo.current);
    if (!coinRecord.success) throw new Error(coinRecord.error);

    const coin = coinRecord.coin_record.coin;

    const spend = wallet.createSpend();

    // Create the current puzzle
    const puzzle = messagePuzzle.curry([
        Program.fromBytes(messagePuzzle.hash()),
        message,
    ]);

    // Create the solution
    const solution = Program.fromList([
        newMessage,
        Program.fromInt(coin.amount),
    ]);

    spend.coin_spends.push({
        // Spend the current singleton
        coin,

        // The puzzle reveal contains the old message
        puzzle_reveal: puzzle.serializeHex(),

        // Spend it with the new message
        solution: solution.serializeHex(),
    });

    const send = await wallet.sendFee(fee);

    spend.coin_spends.push(...send);

    wallet.signSpend(spend, genesis);

    console.log(await node.pushTx(spend));
}

setMessage(Program.fromText('Goodbye, world!'));
```

This will first find the latest coin from the eve id:

```ts
await wallet.sync();

const syncInfo = await sync();
const message = await getMessage(syncInfo);

// Fetch the coin record
const coinRecord = await node.getCoinRecordByName(syncInfo.current);
if (!coinRecord.success) throw new Error(coinRecord.error);

const coin = coinRecord.coin_record.coin;
```

which is then spent using a solution with our new message:

```ts
// Create the solution
const solution = Program.fromList([newMessage, Program.fromInt(coin.amount)]);

spend.coin_spends.push({
  // Spend the current singleton
  coin,

  // The puzzle reveal contains the old message
  puzzle_reveal: puzzle.serializeHex(),

  // Spend it with the new message
  solution: solution.serializeHex(),
});
```

Now, we should be able to retrieve the new message with:

```
printMessage();
```

:::info
reminder, each step can take some time as the message is updatede on chain. Because of this, you'll want to issue each function call separately.
:::

## Shared Messages

Because this puzzle does not require a signature, anyone can spend the coin providing a new message.
Say your eve coin ID is `5fe284bfa91c32fd274179769f5b808c916e5135e603cb292a90e04e5867bd1a`, you can share this value with anyone to update this message.

## Conclusion

This has been your introduction to managing to state on the Chia blockchain.

<details>
<summary>A note on Singletons</summary>

In the world of Chia, this concept can also be achieved with a singleton. This is similar to the puzzle we've been using, but is more flexible and can wrap any other puzzle. A singleton is something that can only have a single instance, but to update a singleton in Chia the existing is destroyed and a new is created.

Creating and spending singletons is more complicated and not something we will be covering in this guide. However, it is good to understand the concept.

Because the singleton will be a series of spent coins and new coins created over time, we need a different way than the coin ID to identify a singleton. A singleton is instead identified by its **launcher ID**, which is the coin ID of the singleton's parent coin. This parent coin is the coin used to create the initial coin of the singleton.

Anyone can create a coin with any puzzle. This means there is a good chance there will be multiple coins with the same puzzle hash. This can lead to confusion as to which coin is which, and may lead to confusion or mistakes. A singleton allows for something to exist on chain that is provably unique. This helps us be sure that we are working with the correct coin.

Additionally, following the chain of coins for a singleton, we can see the history of state and how it has changed.

</details>
````
