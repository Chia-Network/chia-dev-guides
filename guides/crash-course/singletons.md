---
slug: /crash-course/singletons
title: Singletons
---

Puzzles all have something in common, they output a list of conditions. This tells the blockchain what you want to do with the coin.
We did this exact thing in an earlier lesson:

```chialisp
(mod (PUBLIC_KEY conditions)
    (include condition_codes.clib)
    (include sha256tree.clib)

    (c
        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))
        conditions
    )
)
```

Here, we are outputting a custom `conditions` which is passed in as a solution.

## Nested Puzzles

We can create a coin within a coin where the inner coin returns a list of conditions to the outer coin. To do this, we will use `(a INNER_PUZZLE inner_solution)`. The operator `a` means `apply` and is how you execute some code. The inner puzzle will be executed with the inner solution.

What the inner puzzle and inner solution is exactly is up to the coin creator. Here is a more complex example for an outer coin:

```chialisp title="outer-puzzle.clsp"
(mod (PUBLIC_KEY INNER_PUZZLE inner_solution)
    (include condition_codes.clib)
    (include sha256tree.clib)

    ; Assert the signature matches and append the conditions.
    (defun calculate_output (PUBLIC_KEY inner_solution conditions)
        (c
            (list AGG_SIG_ME PUBLIC_KEY (sha256tree inner_solution))
            conditions
        )
    )

    ; Pass the output of the inner puzzle to `calculate_output`.
    (calculate_output PUBLIC_KEY inner_solution (a INNER_PUZZLE inner_solution))
)
```

This will first run `(a INNER_PUZZLE inner_solution)`, passing the result to our custom function `calculate_output`. This function will require a signature of the outputted conditions from the inner coin.

You can think of the outer coin as additional layer to control the inner coin. Almost like a template for your coins.

## Inner Puzzle Creation

Let's create an inner puzzle. This will use a new condition code ASSERT_HEIGHT_RELATIVE, which will make sure a certain number of blocks have passed since coin creation before the coin can be spent.

```chialisp title="inner-puzzle.clsp"
(mod (REQUIRED_BLOCKS conditions)
    (include condition_codes.clib)

    (c
        (list ASSERT_HEIGHT_RELATIVE REQUIRED_BLOCKS)
        conditions
    )
)
```

This will take conditions as a solution and combine those with the ASSERT_HEIGHT_RELATIVE condition.

## Splitting Funds

```chialisp title="inner-puzzle.clsp"
(mod (PARTY_ONE PARTY_TWO amount)
    (include condition_codes.clib)

    (list
        (list CREATE_COIN PARTY_ONE (/ amount 2))
        (list CREATE_COIN PARTY_TWO (/ amount 2))
        (list ASSERT_MY_AMOUNT amount)
    )
)
```

## Next

```chialisp title="state.clsp"
(mod (MOD_HASH MESSAGE new_message)
    (include curry_and_treehash.clib)
    (include condition_codes.clib)

    (defun recreate_self (MOD_HASH new_message)
        (list
            (list CREATE_COIN (puzzle-hash-of-curried-function MOD_HASH
                (sha256 1 new_message)
                (sha256 1 MOD_HASH)
            ))
        )
    )

    (recreate_self new_message)
)
```
