'use strict'

const AbstractCommand = require('./AbstractCommand')

class HelpCommand extends AbstractCommand {
  constructor () {
    super()
    this.title = 'Help | Commands'
    this.description = 'Any references to a \'name\' should be replaced with the target player name. ' +
      '\'id\' with the appopriate identifier.'
  }

  /**
   * @returns {module:"discord.js".RichEmbed}
   */
  get message () {
    this.headers()
    this.embed.addField(
      '```.help```',
      '- Invokes Help Command'
    )
    this.embed.addField(
      '```.roe```',
      '- Invokes ROE Command'
    )
    this.embed.addField(
      '```.citation search \'name\'```',
      '- Displays all citation related information for a player if they exist.'
    )
    this.embed.addField(
      '```.citation total \'name\'```',
      '- Displays total number of citations.'
    )
    this.embed.addField(
      '```.citation current \'name\'```',
      '- Displays most recent citation.'
    )
    this.embed.addField(
      '```.citation add \'name\' \'note\'```',
      '- Add citation to a player.'
    )
    this.embed.addField(
      '```.citation clear \'name\'```',
      '- Clears all citations from a player.'
    )
    this.embed.addField(
      '```.citation resolve \'name\' \'id\'```',
      '- Remove a citation from a player \'name\' with citation \'id\'.'
    )
    this.embed.addField(
      '```.offender top \'#\'```',
      '- Prints a list of the top offenders.'
    )

    return this.embed
  }

  /**
   * @param command
   * @returns {module:"discord.js".RichEmbed}
   */
  run (command) {
    return this.message
  }
}

module.exports = HelpCommand
