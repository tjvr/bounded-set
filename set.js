
class BoundedSet {
  constructor(bound, values) {
    this.count = 0
    this.bound = bound = bound|0
    var words = 1
    while (((words * 16)|0) < bound) {
      words++
    }
    this.words = new Uint16Array(new ArrayBuffer((2 * words)|0))

    if (!values) return
    for (var i=values.length; i--; ) {
      this.add(values[i])
    }
  }

  _validIndex(value) {
    value = value|0
    if (value < 0 || value > this.bound) {
      throw new Error('out of bounds: ' + value)
    }
    return value
  }

  has(value) {
    value = this._validIndex(value)|0
    let offset = (value % 16)|0
    let word = (value >> 4)|0
    let mask = (1 << offset)|0
    return !!(this.words[word] & mask)
  }

  add(value) {
    value = this._validIndex(value)|0
    let offset = (value % 16)|0
    let word = (value >> 4)|0
    let mask = (1 << offset)|0
    if (!(this.words[word] & mask)) this.count++
    this.words[word] |= mask
  }

  delete(value) {
    value = this._validIndex(value)|0
    let offset = (value % 16)|0
    let word = (value >> 4)|0
    let mask = (1 << offset)|0
    if (this.words[word] & mask) this.count--
    this.words[word] &= ~mask
  }

  forEach(cb) {
    let words = this.words
    let length = words.length
    for (var i=0; i<length; i++) {
      let word = words[i]|0
      let value = i * 16;
      if (word &    0x1) cb(value)
      if (word &    0x2) cb(value + 1)
      if (word &    0x4) cb(value + 2)
      if (word &    0x8) cb(value + 3)
      if (word &   0x10) cb(value + 4)
      if (word &   0x20) cb(value + 5)
      if (word &   0x40) cb(value + 6)
      if (word &   0x80) cb(value + 7)
      if (word &  0x100) cb(value + 8)
      if (word &  0x200) cb(value + 9)
      if (word &  0x400) cb(value + 10)
      if (word &  0x800) cb(value + 11)
      if (word & 0x1000) cb(value + 12)
      if (word & 0x2000) cb(value + 13)
      if (word & 0x4000) cb(value + 14)
      if (word & 0x8000) cb(value + 15)
    }
  }

  values() {
    let result = []
    this.forEach(value => {
      result.push(value|0)
    })
    return result
  }

  get size() {
    return this.count|0
  }
}

module.exports = BoundedSet

