'use strict'

const AbstractModel = require('./AbstractModel')

class Citation extends AbstractModel {
  constructor () {
    super()
    this.offenderId = null
    this.note = null
  }

  /**
   * @returns {*}
   */
  get offenderId () {
    return this._offender_id
  }

  /**
   * @param id
   */
  set offenderId (id) {
    this._offender_id = id
  }

  /**
   * @returns {*}
   */
  get note () {
    return this._note
  }

  /**
   * @param text
   */
  set note (text) {
    this._note = text
  }

  /**
   * @returns {*}
   */
  get created () {
    return this._created_at
  }

  /**
   * @param timestamp
   */
  set created (timestamp) {
    this._created_at = timestamp
  }
}

module.exports = Citation
