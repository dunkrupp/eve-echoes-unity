import {AnyChannel, Client} from "discord.js";

//  Inspect channel
// channelService.inspect('bot')

// @note: Search for channel by name and if it's text, send a message to it.
// const boot = client.channels.cache.find(channel => channel.id === '648920940767608862')
// if (boot && boot.isText()) {
//   boot.send(hello).then(r => r).catch(e => console.error(e))
// }

// @note: Search for channel by ID
// channelService.find('648920940767608862')
//   .then(r => console.log(r))
//   .catch(e => console.error(e))
class ChannelService {
  private client: Client;

  constructor(client: Client) {
    this.client = client
  }

  /**
   * Finds a channel by ID.
   * @param id
   */
  public async find(id: string): Promise<Promise<AnyChannel> | null> {
      return this.client.channels.fetch(id)
  }

  /**
   * Find a channel by string, and inspects a channel. Outputting to the console.
   * @param name
   */
  public inspect(name: string) {
    // @ts-ignore
    this.client.channels.cache.find(channel => {
      // @ts-ignore
      if ( channel.name === name) {
        console.log(channel)
      }
    })
  }
}

export default ChannelService
