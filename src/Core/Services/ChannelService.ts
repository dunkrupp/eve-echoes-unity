import {AnyChannel, Client} from "discord.js";

class ChannelService {
  private client: Client;

  constructor(client: Client) {
    this.client = client
  }

  // Promise<AnyChannel>
  public async find(id: string): Promise<Promise<AnyChannel> | null> {
      return this.client.channels.fetch(id)
  }

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
