'use strict'

const config = require('../config/settings.json')

class Command {
  constructor () {
    this._commands = config.commands
    this._prefix = config.prefix
    this._name = ''
    this._action = ''
    this._target = ''
    this._details = ''
    this._errors = []
    this._accessible = false
  }

  /**
   * @returns {Object}
   */
  get commands () {
    return this._commands
  }

  /**
   * @returns {*}
   */
  get instance () {
    return this._commands[this.name]
  }

  /**
   * @returns {string}
   */
  get prefix () {
    return this._prefix
  }

  /**
   * @returns {[]}
   */
  get errors () {
    return this._errors
  }

  /**
   * @returns {string}
   */
  get name () {
    return this._name
  }

  /**
   * @returns {string}
   */
  get action () {
    return this._action
  }

  /**
   * @returns {string}
   */
  get target () {
    return this._target
  }

  /**
   * @returns {string}
   */
  get details () {
    return this._details
  }

  /**
   * @param  error
   */
  set errors (error) {
    this._errors.push(error)
  }

  /**
   * @returns {boolean}
   */
  get accessible () {
    return this._accessible
  }

  /**
   * @param   {boolean} value
   */
  set accessible (value) {
    this._accessible = value
  }

  /**
   * @param   {string}  string
   */
  set name (string) {
    this._name = string
  }

  /**
   * @param   {string}  string
   */
  set action (string) {
    this._action = string
  }

  /**
   * @param   {string}  string
   */
  set target (string) {
    this._target = string
  }

  /**
   * @param   {Array|string}   details
   */
  set details (details) {
    if (Array.isArray(details)) {
      this._details = details.join(' ')
    } else {
      this._details = details
    }
  }

  /**
   * @param   {object}  message
   * @returns {Command}
   */
  parse (message) {
    const [name, action, target, ...details] = this.split(message.content)

    this.name = name ? name.toLowerCase() : name
    this.action = action ? action.toLowerCase() : action
    this.target = target
    this.details = details

    this.accessibility(message)

    this.validate()

    return this
  }

  /*
  * @todo: add shorthands
  * @todo: de-noodle this spaghetti
  */
  validate () {
    if (this.exists()) {
      if (!this.accessible) {
        this.errors = {
          message: 'you are not authorized to use this command.'
        }
        return
      }

      /* Simple Command */
      if (this.is('simple')) {
        return
      }

      /* Complex Command */
      if (this.is('complex')) {
        if (!this.actionExists()) {
          this.errors = {
            message: `no action provided for command. Actions for ${this.prefix}${this.name}: ${this.suggestions()}`
          }
        } else {
          if (this.required('target') && !this.target) {
            this.errors = {
              message: `no target player provided for command ${this.prefix}${this.name} ${this.action} ${this.args()}`
            }
          }
        }
      }
    } else {
      this.errors = { message: 'I could not find a command that matches that syntax, use .help to see commands available' }
    }
  }

  /**
   * @param message
   * @returns {string[]}
   */
  split (message) {
    return message.slice(this._prefix.length).trim().split(/ +/g)
  }

  /**
   * @param message
   */
  accessibility (message) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      this.accessible = true
      return
    }

    if (this.exists()) {
      const whitelist = this.whitelist()
      const matched = message.member.roles.filter(
        role => whitelist.includes(role.name)
      )

      if (matched.size > 0 || whitelist.includes('All')) {
        this.accessible = true
      }
    }
  }

  /**
   * @returns {boolean}
   */
  exists () {
    return this.name in this.commands
  }

  /**
   * @returns {*|NotificationAction}
   */
  actionExists () {
    return this.instance.actions[this.action]
  }

  /**
   * Get Suggestions for commands if any.
   * @returns {string}
   */
  suggestions () {
    return Object.keys(this.instance.actions).length > 0
      ? Object.keys(this.instance.actions).join(', ')
      : ''
  }

  /**
   * @returns {string}
   */
  args () {
    return this.actionExists() && this.instance.actions[this.action].required.length > 0
      ? this.instance.actions[this.action].required.map(function (arg) {
        return '<' + arg + '>'
      }).join(' ')
      : ''
  }

  /**
   * Clean the command.
   */
  clean () {
    this.name = ''
    this.action = ''
    this.target = ''
    this.details = ''
    this.errors.length = 0
    this.accessible = false
  }

  /**
   * @param   {string}  type
   * @returns {boolean}
   */
  is (type) {
    return this.instance && this.instance.type === type
  }

  /**
   * Checks if a field is required for the command
   * @param   {string}  field
   */
  required (field) {
    if (this.is('simple')) {
      return this.instance
    } else {
      return this.instance.actions[this.action].required.includes(field)
    }
  }

  /**
   * @returns {Command.whitelist|*}
   */
  whitelist () {
    if (this.is('simple')) {
      return this.instance.whitelist
    } else {
      return this.actionExists()
        ? this.instance.actions[this.action].whitelist
        : []
    }
  }

  /**
   * @returns {boolean}
   */
  hasErrors () {
    return this.errors.length > 0
  }
}

module.exports = Command
