import {MessageActionRow, MessageEmbed} from "discord.js";

interface Payload {
  content?: string | undefined
  embeds?: Array<MessageEmbed> | undefined
  ephemeral?: boolean | undefined
  components?: Array<MessageActionRow> | undefined
}

export default Payload
