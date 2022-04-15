import {MessageActionRow, MessageEmbed} from "discord.js";

interface Payload {
  content?: string | undefined
  embed?: Array<MessageEmbed> | undefined
  ephemeral?: boolean | undefined
  components?: Array<MessageActionRow> | undefined
}

export default Payload
