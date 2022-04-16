import Payload from "../Contracts/Payload";
import {MessageEmbed} from "discord.js";

class HelpService {
  public display(): Payload {
    const embed = new MessageEmbed()
      .setColor('#1aff00')
      .setTitle('Help')
      .setDescription('Commands available for Eve Echoes: Unity')
      .addFields(
        { name: '\u200b', value: '\u200b' },
        { name: 'Ping', value: 'Bot reactivity test' },
        { name: 'Donate', value: 'Raw, Reprocessed, or Planetary Materials' },
        { name: 'Ship Orders', value: 'Place an order for a ship' }
      )
      .setTimestamp()
      .setFooter({ text: '', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return { embeds: [embed] }
  }
}

export default HelpService
