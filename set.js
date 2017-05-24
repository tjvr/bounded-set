
class BoundedSet {
  constructor(bound) {
    this.bound = bound = bound|0
    var words = 1
    while ((words * 16)|0 < bound) {
      words++
    }
    this.array = new Uint16Array(new ArrayBuffer((2 * words)|0))
  }

  has(value) {
    value = value|0
    if (value < 0 || value > this.bound) {
      throw new Error('out of bounds: ' + value)
    }
    let offset = (value % 16)|0
    let word = (offset >> 4)|0
    let mask = (1 << offset)|0
    return this.words[word] & mask
  }

  add(value) {
    value = value|0
    if (value < 0 || value > this.bound) {
      throw new Error('out of bounds: ' + value)
    }
    let offset = (value % 16)|0
    let word = (offset >> 4)|0
    let mask = (1 << offset)|0
    this.words[word] &= mask
  }
}

