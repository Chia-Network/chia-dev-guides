---
slug: /crash-course/singletons
title: Singletons
---

```chialisp title="outer-puzzle.md"
(mod (PUBLIC_KEY INNER_PUZZLE inner_solution)
    (include condition_codes.clib)

    ; Assert the signature matches and append the conditions.
    (defun calculate_output (PUBLIC_KEY conditions)
        (c
            (list AGG_SIG_ME PUBLIC_KEY (sha256 conditions))
            conditions
        )
    )

    ; Pass the output of the inner puzzle to `calculate_output`.
    (calculate_output PUBLIC_KEY (a INNER_PUZZLE inner_solution))
)
```

```chialisp title="inner-puzzle.md"
(mod (REQUIRED_BLOCKS conditions)
    (include condition_codes.clib)

    (c
        (list ASSERT_HEIGHT_RELATIVE REQUIRED_BLOCKS)
        conditions
    )
)
```

```chialisp title="inner-puzzle.md"
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

```chialisp title="state.md"
(mod (MOD_HASH MESSAGE new_message)
    (include curry_and_treehash.clib)
    (include condition_codes.clib)

    (defun recreate_self (MOD_HASH new_message)
        (list
            (list CREATE_COIN (puzzle-hash-of-curried-function MOD_HASH
                (sha256 new_message)
                (sha256 MOD_HASH)
            ))
        )
    )

    (recreate_self new_message)
)
```
