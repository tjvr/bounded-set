# bounded-set

Implements `BoundedSet`, a reimplementation of `Set` specialised for storing integers bounded by a maximum value.

Why?
----

Let's say you want to keep track of some numbers, and efficiently answer questions like "have I seen this number?".
You could use:

* an array--but then lookups are linear time
* an Object--lookups are now constant time, but it's not super-fast, and the keys have to be strings
* or a native `Set` (best).

If you know the maximum possible number up front, you can use **bounded-set**. `BoundedSet` works like JavaScript's native `Set`, except it's a few times faster. If you need a high-performance data structure, use this!

Usage
-----

The API is similar to the `Set` class, except you must give the bound as the first argument:

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

The bound is inclusive.


Performance
-----------

`BoundedSet` is more than **twice as fast** as a native Set.

- Inserts and deletes are about ~3x faster than a native Set. Deletes are about ~2x faster than an Object-based set.
- Lookups are about ~4x faster than a native Set.
- Iteration is ~3-5x faster than a native Set (depending on bound); about twice as fast as array iteration using `forEach` (!); and 20x faster than using `Object.keys()`... :-)


Full API
--------

The following subset of the `Set` API is supported:

* `add(item)`
* `delete(item)`
* `has(item)` -> Boolean
* `values()` -> Array of values, instead of the native `SetIterator`
* `size` -> Number

Not supported:

* Iterators (feel free to send a PR!)


Downsides
---------

The implementation uses a bitmask of 16-bit unsigned integer words. A `1` bit indicates the number is in the set.

This leads to an obvious downside: **memory use**. Since we allocate one bit for each number up to the bound; allocating a BoundedSet with a bound of 2^30 (the largest sensible bound in JavaScript; remember JS only has Doubles)--will allocate a buffer 134MB in size.

It's also not actually faster for sufficiently large bounds. You should be safe up to at least 2^16 (65536). Somewhere above 2^14, iteration starts to get slow. But this probably depends on your hardware!

