import {ColorResolvable} from "discord.js";

class Bot {
  public image: string;
  public color: ColorResolvable;
  public name: string;

  constructor () {
    this.name = 'Unity'
    this.color = '#a5000e' // Neutral 82a1a1
    this.image = 'https://cdn.discordapp.com/avatars/953713248430071848/a9d231c6cee081db1206255596a5dffa.png'
  }
}

export default Bot
