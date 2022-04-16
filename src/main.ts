import Config from './Core/Config'
import ChannelService from './Core/Services/ChannelService'
import {Client, Intents, Interaction} from 'discord.js'
import {SlashCommandBuilder} from '@discordjs/builders'
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v10'
import DonationService from "./Core/Services/DonationService";
import ShipOrderService from "./Core/Services/ShipOrderService";
import PingService from "./Core/Services/PingService";
import HelpService from "./Core/Services/HelpService";

// ======================================================================
// ==                              Setup                               ==
// ======================================================================
const config = new Config().get()

// @todo: move
if (config.TOKEN == null) {
  throw Error('TOKEN is missing in .env')
}
if (config.APP_ID == null) {
  throw Error('APP_ID is missing in .env')
}
if (config.GUILD_ID == null) {
  throw Error('GUILD_ID is missing in .env')
}

// Start Client
const client = new Client(
  {
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  }
)

// Channel Service @todo: move
const channelService = new ChannelService(client)
const donationService = new DonationService()
const pingService = new PingService()
const shipOrderService = new ShipOrderService()
const helpService = new HelpService()


// @todo: Get Commands
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('help').setDescription('Display help menu'),
  new SlashCommandBuilder().setName('donate').setDescription('Material(s) donation for the corporation'),
  new SlashCommandBuilder().setName('ship-order').setDescription('Order your ship from the corporation'),
].map(command => command.toJSON());


// ======================================================================
// ==                           Initialize                             ==
// ======================================================================
const rest = new REST({ version: '9' }).setToken(config.TOKEN)

rest.put(Routes.applicationGuildCommands(config.APP_ID, config.GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);


// ======================================================================
// ==                         Event Handling                           ==
// ======================================================================
client.on('ready', () => {
  if (!client.user || !client.application) {
    return;
  }

  const hello =
    ' ___                  ___      _                  \n' +
    '| __|__ __ ___       | __| __ | |_   ___  ___  ___\n' +
    '| _| \\ V // -_)      | _| / _||   \\ / _ \\/ -_)(_-/\n' +
    '|___| \\_/ \\___|      |___|\\__||_||_|\\___/\\___|/__/\n'
  console.log(hello)

  client.user.setActivity('Assimilating', { type: 4 })

  void client.application.commands.set(commands);
})

// @todo: move to MessageHandler
client.on('messageCreate', message => {
  console.log(`[message log] ${message.content}`)
})

// @todo: move to InteractionHandler
client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply(pingService.display())
  }
  if (commandName === 'donate') {
    await interaction.reply(
      donationService.prompt()
    )
  }
  if (commandName === 'ship-order') {
    await interaction.reply(
      shipOrderService.prompt()
    )
  }
  if (commandName === 'help') {
    await interaction.reply(
      helpService.display()
    )
  }
});


// ======================================================================
// ==                               Login                              ==
// ======================================================================
void client.login(config.TOKEN)
  .catch(() => {
    throw new Error('Could not login to Discord.  Please double check your token.')
  })
