---
slug: /crash-course/signatures
title: Signatures
---

In the previous lesson we created our first coin and spent it. This was fun and a good exercise, but had some security problems. Specifically, we used a hashed password. This is very limited because once you spend that coin, your provided solution is revealed and your password can no longer be used securely for anything in the future.

Additionally, when you submit your spend to the network, a full node can view the solution (including the password), allowing a bad player to spend the coin themselves.

The solution to this is to use signatures.

## AGG_SIG_ME

One of the available conditions is `AGG_SIG_ME`, which takes a public key and a message to sign.

The general syntax for this is `(50 public_key message)`
