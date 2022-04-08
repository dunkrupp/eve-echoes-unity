'use strict'

const path = require('path')

module.exports = {
  root_path: path.join(__dirname, '../'),

  /** Export Classes */
  Bot: require('../app/Bot'),
  Command: require('../app/Command'),
  Citation: require('../app/commands/CitationCommand'),
  Offender: require('../app/commands/OffenderCommand'),
  Help: require('../app/commands/HelpCommand'),
  Discord: require('discord.js'),
  Database: require('../app/Database'),

  /** Export Methods */
  /**
   * Adds an item to the container.
   * @param key
   * @param path
   */
  add: function (key, path) {
    try {
      if (!this.exists(key)) {
        this[key] = require(path)
      }
    } catch (error) {
      console.error(`Error adding ${key} at ${path} to container.`)
    }
  },

  /**
   * Removes a key from the container.
   * @param key
   */
  remove: function (key) {
    delete this.key
  },

  /**
   * Retrieves an instance of the class from the container.
   * @param instance
   */
  resolve: function (instance) {
    try {
      return new this[instance]()
    } catch (error) {
      console.error(`Error accessing ${instance} from container.`)
    }
  },

  /**
   * Checks if an object exists in the container.
   * @param instance
   * @returns {boolean}
   */
  exists: function (instance) {
    return typeof this[instance] !== 'undefined'
  },

  /**
   * Capitalizes first character of string
   * @param string
   * @returns {string}
   */
  capitalize: function (string) {
    if (typeof string !== 'string') {
      return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
  },

  /**
   * Calls the classes run function to retrieve the formatted message for the user.
   * @param command
   * @return {string|void}
   */
  dispatch: function (command) {
    if (this.exists(this.capitalize(command.name))) {
      const resolved = this.resolve(
        this.capitalize(command.name)
      )

      return resolved.run(
        command
      )
    }
  }
}
