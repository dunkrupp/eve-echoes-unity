import {MessageActionRow, MessageSelectMenu} from 'discord.js'
import Payload from "../Contracts/Payload";

// @todo: Should prompt user for what type of donation and then after the user selects.
// @todo: We will ask them how much of each resource they are donating 1 by 1?
// @todo: Also need to add a bulk to dump numbers maybe
class DonationService {
  constructor() {
    // @todo: implement
  }

  public prompt(): Payload {
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
