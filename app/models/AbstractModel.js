'use strict'

class AbstractModel {
  /**
   * @param property
   * @returns {boolean}
   */
  has (property) {
    return Object.prototype.hasOwnProperty.call(this, property)
  }

  /**
   * @param property
   * @returns {*}
   */
  get (property) {
    return this.property
  }
}

module.exports = AbstractModel
