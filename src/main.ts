import Config from './Core/Config'
import ChannelService from './Core/Services/ChannelService'
import {Client, Intents, Interaction} from 'discord.js'
import {SlashCommandBuilder} from '@discordjs/builders'
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v10'
import DonationService from "./Core/Services/DonationService";
import ShipyardService from "./Core/Services/ShipyardService";
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

// @todo: move
const channelService = new ChannelService(client)
const donationService = new DonationService()
const pingService = new PingService()
const shipyardService = new ShipyardService()
const helpService = new HelpService()


// @todo: Get Commands
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('help').setDescription('Display help menu'),
  new SlashCommandBuilder().setName('donate').setDescription('Material(s) donation for the corporation'),
  new SlashCommandBuilder()
    .setName('shipyard').setDescription('Information and Ordering')
    .addSubcommand(subcommand =>
      subcommand
        .setName('order')
        .setDescription('Place an order')
        .addStringOption(option =>
          option.setName('ship')
            .setDescription('The ship we are looking to order. Minimum 3 characters.')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addNumberOption(option =>
          option.setName('quantity')
            .setDescription('Enter a number')
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
            .setMinValue(1)
            .setMaxValue(6)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('info')
        .setDescription('Ship information')
        .addStringOption(option =>
          option.setName('ship')
            .setDescription('The ship we are querying information for.')
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
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
  // DONATION SELECT MENU PROCESSING
  if (interaction.isSelectMenu()) {
    if (interaction.values.includes('ores')
      || interaction.values.includes('minerals')
      || interaction.values.includes('planetary-materials')
    ) {
      await interaction.update(
        donationService.processSelect(interaction)
      )
    }
  }

  if (interaction.isAutocomplete()) {
    await interaction.respond(
      shipyardService.shipAutoComplete(interaction)
    )
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'shipyard-order-verify-yes') {
      shipyardService.purchaseOrderAccept(interaction)
    }
    if (interaction.customId === 'shipyard-order-verify-no') {
      shipyardService.purchaseOrderReject(interaction)
    }
  }

  // SLASH COMMAND PROCESSING
  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (commandName === 'ping') {
      await interaction.reply(pingService.display())
    }
    if (commandName === 'donate') {
      await interaction.reply(
        donationService.prompt()
      )
    }
    if (commandName === 'shipyard') {
      await interaction.reply(
        shipyardService.shipVerification(interaction)
      )
    }
    if (commandName === 'help') {
      await interaction.reply(
        helpService.display()
      )
    }
  }

  return
});


// ======================================================================
// ==                               Login                              ==
// ======================================================================
void client.login(config.TOKEN)
  .catch(() => {
    throw new Error('Could not login to Discord.  Please check your token.')
  })
