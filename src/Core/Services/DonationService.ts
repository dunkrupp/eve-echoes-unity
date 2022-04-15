import {MessageActionRow, MessageSelectMenu} from 'discord.js'
import Payload from "../Contracts/Payload";

class DonationService {
  constructor() {
    // @todo: implement
  }

  public display(): Payload {
    const content = 'Would what you like to do?'
    const select = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('..')
          .addOptions([
            {
              label: 'Donate Ore',
              description: 'Donate raw ores',
              value: 'ore',
            },
            {
              label: 'Donate Reprocessed Ore',
              description: 'Donate reprocessed ores',
              value: 'ore',
            },
            {
              label: 'Donate PI',
              description: 'Donate planetary materials',
              value: 'planetary-materials',
            }
          ]),
      );

    return { content: content, embed: [], ephemeral: false, components: [select] }
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