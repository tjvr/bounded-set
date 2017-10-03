(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory()
    } else {
        root.BoundedSet = factory()
    }
}(this, function() {

  var BoundedSet = function(bound, values) {
    this.count = 0
    this.bound = bound = bound|0
    var words = 1
    while (((words * 32)|0) < bound) {
      words++
    }
    this.words = new Uint32Array(new ArrayBuffer((4 * words)|0))

    if (!values) return
    for (var i=values.length; i--; ) {
      this.add(values[i])
    }
  }

  BoundedSet.prototype._validIndex = function(value) {
    value = value|0
    if (value < 0 || value > this.bound) {
      throw new Error('out of bounds: ' + value)
    }
    return value
  }

  BoundedSet.prototype.has = function(value) {
    value = this._validIndex(value)|0
    var offset = (value % 32)|0
    var word = (value >> 5)|0
    var mask = (1 << offset)|0
    return !!(this.words[word] & mask)
  }

  BoundedSet.prototype.add = function(value) {
    value = this._validIndex(value)|0
    var offset = (value % 32)|0
    var word = (value >> 5)|0
    var mask = (1 << offset)|0
    if (!(this.words[word] & mask)) this.count++
    this.words[word] |= mask
  }

  BoundedSet.prototype.delete = function(value) {
    value = this._validIndex(value)|0
    var offset = (value % 32)|0
    var word = (value >> 5)|0
    var mask = (1 << offset)|0
    if (this.words[word] & mask) this.count--
    this.words[word] &= ~mask
  }

  BoundedSet.prototype.forEach = function(cb) {
    var words = this.words
    var length = words.length
    for (var i=0; i<length; i++) {
      var word = words[i]|0
      var value = i * 32
      if (word &        0x1) cb(value)
      if (word &        0x2) cb(value + 1)
      if (word &        0x4) cb(value + 2)
      if (word &        0x8) cb(value + 3)
      if (word &       0x10) cb(value + 4)
      if (word &       0x20) cb(value + 5)
      if (word &       0x40) cb(value + 6)
      if (word &       0x80) cb(value + 7)
      if (word &      0x100) cb(value + 8)
      if (word &      0x200) cb(value + 9)
      if (word &      0x400) cb(value + 10)
      if (word &      0x800) cb(value + 11)
      if (word &     0x1000) cb(value + 12)
      if (word &     0x2000) cb(value + 13)
      if (word &     0x4000) cb(value + 14)
      if (word &     0x8000) cb(value + 15)
      if (word &    0x10000) cb(value + 16)
      if (word &    0x20000) cb(value + 17)
      if (word &    0x40000) cb(value + 18)
      if (word &    0x80000) cb(value + 19)
      if (word &   0x100000) cb(value + 20)
      if (word &   0x200000) cb(value + 21)
      if (word &   0x400000) cb(value + 22)
      if (word &   0x800000) cb(value + 23)
      if (word &  0x1000000) cb(value + 24)
      if (word &  0x2000000) cb(value + 25)
      if (word &  0x4000000) cb(value + 26)
      if (word &  0x8000000) cb(value + 27)
      if (word & 0x10000000) cb(value + 28)
      if (word & 0x20000000) cb(value + 29)
      if (word & 0x40000000) cb(value + 30)
      if (word & 0x80000000) cb(value + 31)
    }
  }

  BoundedSet.prototype.values = function() {
    var result = []
    this.forEach(function(value) {
      result.push(value|0)
    })
    return result
  }

  Object.defineProperty(BoundedSet.prototype, 'size', {
    get: function() { return this.count|0 },
  })

  return BoundedSet
}))

