'use strict'

const AbstractCommand = require('./AbstractCommand')
const OffenderRepository = require('../repositories/OffenderRepository')

class OffenderCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = ''
    this.description = ''
    this._repository = new OffenderRepository()
  }

  /**
   * @returns {OffenderRepository}
   */
  get repository () {
    return this._repository
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get message () {
    this.headers()
    return this.embed
  }

  search (command) {
    return this.repository.search(command.target)
  }

  add (command) {
    return this.repository.create({ name: this.name, alliance: this.alliance })
  }

  /**
   * @param command
   * @returns {module:"discord.js".RichEmbed}
   */
  top (command) {
    let count = 1
    const take = command.target
    const offenders = this.repository.top(take)

    this.title = 'Offenders | Most Wanted'

    for (const offender of offenders) {
      this.embed.addField(
        `Position: ${count++} `,
        `Name: ${offender.name}\nAlliance: ${offender.alliance}`
      )
    }

    return this.message
  }

  run (command) {
    return this[command.action](command)
  }
}

module.exports = OffenderCommand
