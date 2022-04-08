const config = require('../config/settings.json')

class Bot {
  constructor () {
    this.name = config.name
    this.color = config.color
    this.thumbnail = config.thumbnail
  }

  /**
   * @returns {string}
   */
  get name () {
    return this._name
  }

  /**
   * @param value
   */
  set name (value) {
    this._name = value
  }

  /**
   * @returns {int}
   */
  get color () {
    return this._color
  }

  /**
   * @param value
   */
  set color (value) {
    this._color = value
  }

  /**
   * @returns {*}
   */
  get thumbnail () {
    return this._thumbnail
  }

  /**
   * @param value
   */
  set thumbnail (value) {
    this._thumbnail = value
  }
}

module.exports = Bot
