import Payload from "../Contracts/Payload";
import {
  ApplicationCommandOptionChoice,
  AutocompleteInteraction, ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu
} from "discord.js";
import choices from "../../Data/Shipyard/ship-autocomplete.json";
import Bot from "../Bot";
import {MessageButtonStyles} from "discord.js/typings/enums";

class ShipyardService {
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
          .addOptions()
      );

    return {content: '** **', components: [row]}
  }

  public shipAutoComplete(interaction: AutocompleteInteraction): ApplicationCommandOptionChoice[] {
    const input = interaction.options.get('ship')


    if (input
      && input.value
      && typeof input.value === 'string'
      && input.value.length >= 3
    ) {
      console.log(input.value.length)
      return choices.filter(elem => {
        // @ts-ignore
        return elem.name.indexOf(input.value.toString()) !== -1
      }).slice(0, 25)
    }

    return []
  }

  public shipVerification(interaction: CommandInteraction): Payload {
    const ship = interaction.options.get('ship')
    const quantity = interaction.options.get('quantity')

    if (! ship || ! quantity || !ship.value || !quantity.value) {
      throw new Error('There was an error processing the ship and quantity for the purchase order.')
    }

    const embed = new MessageEmbed()
      .setColor(this.bot.color)
      .setTitle(`Shipyard Purchase Order`)
      .setAuthor({ name: this.bot.name, iconURL: this.bot.image })
      .setFields([
        { name: '** **', value: `${ship.value.toString()} x${quantity.value.toString()}`, inline: false }
      ])

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('shipyard-order-verify-yes')
          .setLabel('Yes')
          .setStyle(MessageButtonStyles.SUCCESS),
        new MessageButton()
          .setCustomId('shipyard-order-verify-no')
          .setLabel('No')
          .setStyle(MessageButtonStyles.DANGER)
      );

    return { content: '** **', embeds: [embed], components: [row] }
  }

  public purchaseOrderAccept(interaction: ButtonInteraction): Payload {
    return { content: '** **', embeds: [] }
  }

  public purchaseOrderReject(interaction: ButtonInteraction): Payload {
    return {content: '** **', embeds: [] }
  }
}

export default ShipyardService
