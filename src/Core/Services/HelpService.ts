import Payload from "../Contracts/Payload";
import {MessageEmbed} from "discord.js";
import Bot from "../Bot";

class HelpService {
  private bot: Bot;

  constructor() {
    this.bot = new Bot()
  }

  public display(): Payload {
    const embed = new MessageEmbed()
      .setColor(this.bot.color)
      .setTitle('Help')
      .setDescription('Commands available for Eve Echoes: Unity')
      .addFields(
        { name: '\u200b', value: '\u200b' },
        { name: 'Ping', value: 'Bot reactivity test' },
        { name: 'Donate', value: 'Ore, Minerals, or Planetary Materials' },
        { name: 'Ship Orders', value: 'Place an order for a ship' }
      )
      .setTimestamp()
      .setFooter({ text: '', iconURL: this.bot.image });

    return { embeds: [embed] }
  }
}

export default HelpService
