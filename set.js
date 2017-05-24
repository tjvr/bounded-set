
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
      for (var offset=0; offset<16; offset++) {
        let mask = (1 << offset)|0
        if (word & mask) {
          let value = (16 * i + offset)|0
          cb(value)
        }
      }
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

