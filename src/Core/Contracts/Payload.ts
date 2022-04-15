import {MessageActionRow, MessageEmbed} from "discord.js";

interface Payload {
  content: string
  embed: Array<MessageEmbed>
  ephemeral: boolean
  components: Array<MessageActionRow>
}

export default Payload
