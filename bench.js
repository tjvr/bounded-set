
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


suite('insertion', () => {
  benchmarks(1000, (factory, bench) => bench(() => {
    const s = factory()
    for (var i=50; i--; ) {
      s.add((Math.random() * 1000)|0)
    }
  }))
})

suite('insert & delete', () => {
  benchmarks(1000, (factory, bench) => bench(() => {
    let s = factory()
    for (var i=50; i--; ) {
      s.add((Math.random() * 1000)|0)
      s.delete((Math.random() * 1000)|0)
    }
  }))
})

/*
// This is a bad benchmark. It's trivial for the Array-based variant, since the
// set is empty!
suite('re-delete', () => {
  benchmarks(1000, (factory, bench) => bench(() => {
    const s = factory()
    for (var i=50; i--; ) {
      s.delete((Math.random() * 1000)|0)
    }
  }))
})
*/

suite('lookups', () => {
  benchmarks(1000, (factory, bench) => {
    let s = factory()
    for (var i=50; i--; ) {
      s.add((Math.random() * 1000)|0)
    }

    bench(() => {
      var count = 0
      for (var i=50; i--; ) {
        s.has((Math.random() * 1000)|0)
      }
    })
  })
})

suite('iteration', () => {
  benchmarks(1000, (factory, bench) => {
    let s = factory()
    for (var i=50; i--; ) {
      s.add((Math.random() * 1000)|0)
    }

    bench(() => {
      var count = 0
      s.forEach(x => count++)
      //expect(count).toBe(s.size)
    })
  })
})

suite('count', () => {
  benchmarks(1000, (factory, bench) => {
    let s = factory()
    for (var i=50; i--; ) {
      s.add((Math.random() * 1000)|0)
    }

    bench(() => {
      var x = s.size|0
    })
  })
})

