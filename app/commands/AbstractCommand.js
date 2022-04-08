'use strict'

const discord = require('discord.js')
const Bot = require('../Bot')

class AbstractCommand {
  constructor () {
    this._embed = new discord.RichEmbed()
    this._bot = new Bot()
    this._title = ''
    this._description = ''
    this._fields = []
  }

  /**
   * Abstract Method
   */
  get message () {}

  /**
   * @returns {string}
   */
  get title () {
    return this._title
  }

  /**
   * @param string
   */
  set title (string) {
    this._title = string
  }

  /**
   * @returns {string}
   */
  get description () {
    return this._description
  }

  /**
   * @param value
   */
  set description (value) {
    this._description = value
  }

  /**
   * @returns {[]|*[]}
   */
  get fields () {
    return this._fields
  }

  /**
   * @param fields
   */
  set fields (fields) {
    // Add Fields as array or whatever
  }

  /**
   * @returns {Bot}
   */
  get bot () {
    return this._bot
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get embed () {
    return this._embed
  }

  /**
   * Set header for embed
   */
  headers () {
    this.embed.setAuthor(this.bot.name)
    this.embed.setTitle(this.title)
    this.embed.setDescription(this.description)
    this.embed.setColor(this.bot.color)
    this.embed.setTimestamp(Date.now())
    this.embed.setThumbnail(this.bot.thumbnail)
  }

  /**
   * Abstract Method
   */
  run () {}
}

module.exports = AbstractCommand
