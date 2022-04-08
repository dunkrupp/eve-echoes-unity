'use strict'

const AbstractCommand = require('./AbstractCommand')
const CitationRepository = require('../repositories/CitationRepository')
const OffenderRepository = require('../repositories/OffenderRepository')

class CitationCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = ''
    this.description = ''
    this._command = null
    this._repository = new CitationRepository()
    this._offenderRepository = new OffenderRepository()
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get message () {
    this.headers()
    return this.embed
  }

  /**
   * @returns {null}
   */
  get command () {
    return this._command
  }

  /**
   * @param value
   */
  set command (value) {
    this._command = value
  }

  /**
   * @returns {CitationRepository}
   */
  get repository () {
    return this._repository
  }

  /**
   * @returns {OffenderRepository}
   */
  get offenderRepository () {
    return this._offenderRepository
  }

  /**
   * @param offender
   * @returns {module:"discord.js".RichEmbed}
   */
  search (offender) {
    const citations = this.repository.search(offender.id, 'offender_id')

    this.title = 'Citations | List'
    this.description = `${offender.name}`

    citations.slice(0, 5).map(citation => {
      this.embed.addField(`ID #${citation.id}`, `${citation.note}`)
    })

    if (citations.length > 5) {
      this.embed.addField('...', `Total Citations: ${citations.length}`)
    }

    if (citations.length === 0) {
      this.embed.addField('...', 'Total Citations: 0')
    }

    return this.message
  }

  /**
   * @param offender
   * @returns {module:"discord.js".RichEmbed}
   */
  total (offender) {
    const count = this.repository.count(offender.id, 'offender_id')

    this.title = 'Citations | Count'
    this.description = `${offender.name}`
    this.embed.addField('...', `Total Citations: ${count}`)

    return this.message
  }

  /**
   * @param offender
   * @returns {module:"discord.js".RichEmbed}
   */
  current (offender) {
    const citations = this.repository.search(offender.id, 'offender_id')

    const newest = [...citations].pop()

    this.title = 'Citations | Latest'
    this.description = `${offender.name}`
    this.embed.addField(`ID #${newest.id}`, `${newest.note}`)
    this.embed.addField('Created', `${newest.created_at}`)

    return this.message
  }

  /**
   * @param offender
   * @param command
   */
  add (offender, command) {
    const row = this.repository.create(
      { offender_id: offender.id, note: command.details }
    )

    const count = this.repository.count(offender.id, 'offender_id')

    this.title = `Citations | #${count} Issued`
    this.description = `${offender.name}`
    this.embed.addField('Player ID', `${offender.id}`, true)
    this.embed.addField('Citation ID', `${row.id}`, true)

    return this.message
  }

  /**
   * @param offender
   * @returns {module:"discord.js".RichEmbed}
   */
  clear (offender) {
    /* @todo Handle Logic */
    const result = this.repository.delete(offender.id, 'offender_id')

    this.title = 'Citations | Cleared'
    this.description = `${offender.name}`
    this.embed.addField('Success', 'All citations have been cleared for player.')

    return this.message
  }

  /**
   * @param offender
   * @param command
   * @returns {module:"discord.js".RichEmbed}
   */
  resolve (offender, command) {
    const result = this.repository.delete(command.details)
    const response = { name: '', value: '' }

    if (result.changes === 1) {
      response.name = 'Citation ID'
      response.value = `${command.details} has been resolved.`
    } else {
      response.name = 'Error'
      response.value = `There was an error deleting Citation #${command.details}.\nPlease check the ID is correct.`
    }

    this.title = 'Citations | Resolved'
    this.description = `${offender.name}`
    this.embed.addField(response.name, response.value)

    return this.message
  }

  /**
   * @param command
   * @returns {*}
   */
  run (command) {
    this.command = command

    let offender = this.offenderRepository.search(
      this.command.target
    )

    if (!offender && command.action === 'add') {
      offender = this.offenderRepository.create({
        name: command.target
        /* @todo: regex alliances  */
      })
    }

    if (offender && offender.has('id')) {
      return this[command.action](offender, command)
    } else {
      return 'No Offender Found'
    }
  }
}

module.exports = CitationCommand
