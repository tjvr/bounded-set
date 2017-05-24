
class BoundedSet {
  constructor(bound, values) {
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

  has(value) {
    value = value|0
    if (value < 0 || value > this.bound) {
      throw new Error('out of bounds: ' + value)
    }
    let offset = (value % 16)|0
    let word = (value >> 4)|0
    let mask = (1 << offset)|0
    return !!(this.words[word] & mask)
  }

  add(value) {
    value = value|0
    if (value < 0 || value > this.bound) {
      throw new Error('out of bounds: ' + value)
    }
    let offset = (value % 16)|0
    let word = (value >> 4)|0
    let mask = (1 << offset)|0
    this.words[word] |= mask
  }

  forEach(cb) {
    let words = this.words
    let length = words.length
    for (var i=0; i<length; i++) {
      let word = words[i]|0
      for (var offset=0; offset<16; offset++) {
        let mask = (1 << offset)|0
        if (word & mask) {
          cb((16 * i + offset)|0)
        }
      }
    }
  }

  values() {
    let result = []
    this.forEach(value => {
      result.push(value)
    })
    return result
  }
}

