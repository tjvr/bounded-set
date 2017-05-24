
const expect = require('expect')
const BoundedSet = require('./set')
const {ArraySet, DictSet} = require('./alt')


function benchmarks(bound, create) {
  create(
    values => new Set(values),
    body => benchmark('native Set', body)
  )

  create(
    values => new DictSet(values),
    body => benchmark('object-based set', body)
  )

  create(
    values => new ArraySet(values),
    body => benchmark('Array-based set', body)
  )

  create(
    values => new BoundedSet(bound, values),
    body => benchmark('bitmask-based BoundedSet', body)
  )
}


const bound = 1 << 14
const size = 1000

suite('insert', () => {
  benchmarks(bound, (factory, bench) => bench(() => {
    const s = factory()
    for (var i=size; i--; ) {
      s.add((Math.random() * bound)|0)
    }
  }))
})

suite('insert & delete', () => {
  benchmarks(bound, (factory, bench) => bench(() => {
    let s = factory()
    for (var i=size; i--; ) {
      s.add((Math.random() * bound)|0)
      s.delete((Math.random() * bound)|0)
    }
  }))
})

/*
// This is a bad benchmark. It's trivial for the Array-based variant, since the
// set is empty!
suite('re-delete', () => {
  benchmarks(bound, (factory, bench) => bench(() => {
    const s = factory()
    for (var i=size; i--; ) {
      s.delete((Math.random() * bound)|0)
    }
  }))
})
*/

suite('lookup', () => {
  benchmarks(bound, (factory, bench) => {
    let s = factory()
    for (var i=size; i--; ) {
      s.add((Math.random() * bound)|0)
    }

    bench(() => {
      var count = 0
      for (var i=size; i--; ) {
        s.has((Math.random() * bound)|0)
      }
    })
  })
})

suite('iteration', () => {
  benchmarks(bound, (factory, bench) => {
    let s = factory()
    for (var i=size; i--; ) {
      s.add((Math.random() * bound)|0)
    }

    bench(() => {
      var count = 0
      s.forEach(x => count++)
      //expect(count).toBe(s.size)
    })
  })
})

/*
This is only slow for DictSet.
suite('count', () => {
  benchmarks(bound, (factory, bench) => {
    let s = factory()
    for (var i=size; i--; ) {
      s.add((Math.random() * bound)|0)
    }

    bench(() => {
      var x = s.size|0
    })
  })
})
*/

