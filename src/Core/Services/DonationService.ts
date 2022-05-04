import {MessageActionRow, MessageEmbed, MessageSelectMenu, SelectMenuInteraction} from 'discord.js'
import Payload from "../Contracts/Payload";
import Bot from "../Bot"
import ores from "../../Data/Donation/ores.json"
import choices from "../../Data/Donation/dropdown.json"
import {capitalize} from "../Utility/Functions"

class DonationService {
  private bot: Bot;

  constructor() {
    this.bot = new Bot()
  }

  public prompt(): Payload {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('..')
          .addOptions(choices),
      )

    return { content: 'Would what you like to donate?', components: [row] }
  }

  public processSelect(interaction: SelectMenuInteraction): Payload {
    const choice = interaction.values.values().next()
    const embed = new MessageEmbed()
      .setColor(this.bot.color)
      .setTitle(`${capitalize('ores')} Donation Management`)
      .setAuthor({ name: this.bot.name, iconURL: this.bot.image })

    switch (choice.value) {
      case "ores":
        embed.setDescription(
          'List quantities as whole numbers or in decimal format with "k" representing thousands and "m" representing millions.\n' +
          'e.g. 12.3k represents 12,300 units\n' +
          'e.g. 0.35m represents 350,000 units'
        )
        ores.forEach( (ore) => {
          embed.addField(capitalize(ore.name), ore.found, true)
        })
        break
      case "minerals":
        break
      case "planetary-materials":
        break
    }


    return { content: "Welcome to interactive donation mode.", embeds: [embed] }
  }

  public response(interaction: SelectMenuInteraction): Payload {
    //

    ores.forEach( (ore) => {
      // @implement
    })

    return { content: "Welcome to interactive donation mode.", embeds: [] }
  }

  public search() {
    // @todo: implement
  }

  public create() {
    // @todo: implement
  }

  public update() {
    // @todo: implement
  }

  public store() {
    // @todo: implement
  }

  public delete() {
    // @todo: implement
  }
}

export default DonationService
