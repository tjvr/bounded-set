
const expect = require('expect')
const BoundedSet = require('../set')
const {ArraySet, DictSet} = require('./alt')


describe('BoundedSet', () => {

  function checkHas(boundedSet, set) {
    expect(boundedSet.size).toBe(set.size)

    let setValues = Array.from(set.values())
    setValues.sort((a, b) => a - b)
    expect(boundedSet.values()).toEqual(setValues)

    for (var i=0; i<=boundedSet.bound; i++) {
      expect(boundedSet.has(i)).toBe(set.has(i))
    }
  }

  it('initially empty', () => {
    checkHas(new BoundedSet(15), new Set())
    checkHas(new BoundedSet(16), new Set())
    checkHas(new BoundedSet(17), new Set())
    checkHas(new BoundedSet(32), new Set())
    checkHas(new BoundedSet(100), new Set())
    checkHas(new BoundedSet(1024), new Set())
  })

  it('can add values', () => {
    let b = new BoundedSet(33), s = new Set()
    checkHas(b, s)
    for (let x of [4, 1, 0, 16, 15, 17, 32, 33]) {
      b.add(x); s.add(x)
      checkHas(b, s)
    }
  })

  it('can remove values', () => {
    let initial = [0, 1, 2, 5, 8, 12, 15, 16, 17, 32]
    let b = new BoundedSet(33, initial), s = new Set(initial)
    checkHas(b, s)
    for (let x of [4, 1, 0, 16, 15, 17, 32, 33]) {
      b.delete(x); s.delete(x)
      checkHas(b, s)
    }
  })

  it('supports values()', () => {
    let numbers = [1, 5, 8, 15]
    expect(new BoundedSet(16, numbers).values()).toEqual(numbers)
  })

  it('throws out-of-bounds errors', () => {
    expect(() => new BoundedSet(12).has(-1)).toThrow('out of bounds: -1')
    expect(() => new BoundedSet(0).has(1)).toThrow('out of bounds: 1')
    expect(() => new BoundedSet(100).has(101)).toThrow('out of bounds: 101')
    expect(() => new BoundedSet(100).has(65536)).toThrow('out of bounds: 65536')
  })

})

describe('ArraySet', () => {
  checkSet(v => new ArraySet(v))
})

describe('DictSet', () => {
  checkSet(v => new DictSet(v))
})


function checkSet(factory) {
  
  function checkHas(fakeSet, set) {
    let setValues = Array.from(set.values())
    setValues.sort((a, b) => a - b)
    expect(fakeSet.values()).toEqual(setValues)

    expect(fakeSet.size).toBe(set.size)

    for (let x of set) {
      expect(fakeSet.has(x)).toBe(true)
    }
  }

  it('starts empty', () => {
    checkHas(factory(), new Set())
  })

  it('can add values', () => {
    let b = factory(), s = new Set()
    checkHas(b, s)
    for (let x of [4, 1, 0, 16, 15, 17, 32, 33]) {
      b.add(x); s.add(x)
      checkHas(b, s)
    }
  })

  it('can remove values', () => {
    let initial = [0, 1, 2, 5, 8, 12, 15, 16, 17, 32]
    let b = factory(initial), s = new Set(initial)
    checkHas(b, s)
    for (let x of [4, 1, 0, 16, 15, 17, 32, 33]) {
      b.delete(x); s.delete(x)
      checkHas(b, s)
    }
  })

  it('supports values()', () => {
    let numbers = [1, 5, 8, 15]
    expect(factory(numbers).values()).toEqual(numbers)
  })

}
