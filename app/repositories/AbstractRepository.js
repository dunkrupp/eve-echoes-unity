'use strict'

class AbstractRepository {
  constructor () {
    this.table = null
  }

  search () {}

  create () {}

  delete () {}

  new () {}

  /**
   * Hydrate object with data
   * @param object
   * @param attributes
   * @returns {*}
   */
  hydrate (object, attributes) {
    return attributes !== undefined
      ? Object.assign(object, attributes)
      : null
  }
}

module.exports = AbstractRepository
