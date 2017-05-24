Bounded Set
===========

This is an implementation of a Set for storing integers bounded by a maximum value.

The API is similar to the native `Set`, except it takes the bound as the first argument:

```js
const BoundedSet = require('bounded-set')
let s = new BoundedSet(1000)
s.add(42)
s.has(42) // true
```

Accessing an integer over the bound is not allowed.

```js
b.has(1001) // Error: out of bounds: 1001
b.has(-1)   // Error: out of bounds: -1
```


Performance
-----------

The whole point of this is to try and get better performance than using a native `Set` (or an `Object`-based set, for platforms, by exploiting the fact that the integers are bounded.

This is implemented using a bitmask of 16-bit unsigned integer words. A `1` bit indicates the number is in the set.

- Insertion is **~2x faster** than a native Set or an Object-based set.
- Deletion of non-existent values is **the same** as a native `set` (2x faster than an Object-based set).
- Iteration is **2x faster** than a native Set --about as fast as iterating an Array.
- The size of the set is stored, so it is cheap to retrieve.

In general, use `BoundedSet` if you need fast insert/lookup/delete/iteration for a set of integers bounded by a maximum.

