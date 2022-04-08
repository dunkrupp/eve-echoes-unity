'use strict'

const AbstractModel = require('./AbstractModel')

class Offender extends AbstractModel {
  constructor () {
    super()
    this.name = null
    this.alliance = null
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get alliance () {
    return this._alliance
  }

  set alliance (value) {
    this._alliance = value
  }
}

module.exports = Offender
