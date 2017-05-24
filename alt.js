
class DictSet {
  constructor(values) {
    this.dict = {}
    if (!values) return
    for (var i=values.length; i--; ) {
      this.add(values[i]|0)
    }
  }

  has(value) {
    return !!this.dict[value]
  }

  add(value) {
    this.dict[value|0] = true
  }

  delete(value) {
    delete this.dict[value]
  }

  forEach(cb) {
    this.values().forEach(cb)
  }

  values() {
    return Object.keys(this.dict).map(x => x|0)
  }

  get size() {
    return this.values().length
  }
}


class ArraySet {
  constructor(values) {
    this.items = values ? values.slice() : []
  }

  has(value) {
    let items = this.items
    for (var i=0; i<items.length; i++) {
      let item = items[i]
      if (item === value) return true
      if (item > value) return false
    }
    return false
  }

  add(value) {
    let items = this.items
    for (var i=0; i<items.length; i++) {
      let item = items[i]
      if (item === value) return
      if (item > value) {
        items.splice(i, 0, value)
        return
      }
    }
    this.items.push(value)
  }

  delete(value) {
    let items = this.items
    for (var i=0; i<items.length; i++) {
      let item = items[i]
      if (item === value) {
        items.splice(i, 1)
        return
      }
      if (item > value) return
    }
  }

  forEach(cb) { return this.items.forEach(cb) }

  get size() { return this.items.length }

  values() { return this.items.slice() }
}


module.exports = {
  DictSet,
  ArraySet,
}

