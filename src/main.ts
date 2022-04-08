import Config from './Core/Config'
import ChannelService from './Core/Services/ChannelService'
import {Client, Intents, Interaction, TextChannel} from 'discord.js'
import {SlashCommandBuilder} from '@discordjs/builders'
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v10'

// ======================================================================
// ==                              Setup                               ==
// ======================================================================

// Retrieve .env
const config = new Config().get()

// Move
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
  { intents: [Intents.FLAGS.GUILDS] }
)

// Channel Service @todo: move
const channelService = new ChannelService(client)

// @todo: Get Commands
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('donate-ore').setDescription('Ore Donation'),
  new SlashCommandBuilder().setName('donate-pi').setDescription('PI Donation')
].map(command => command.toJSON());

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

  channelService.inspect('bot-testing')

  const boot = client.channels.cache.find(channel => channel.id === '874351397443895388')

  if (boot && boot.isText()) {
    boot.send(hello).then(r => r).catch(e => console.error(e))
  }

/*  channelService.find('874351397443895388')
    .then(r => console.log(r))
    .catch(e => console.error(e))*/

  void client.application.commands.set(commands);
})

client.on('message', msg => {
  console.log(`[message log] ${msg.content}`)
})

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});


// ======================================================================
// ==                               Login                              ==
// ======================================================================
void client.login(config.TOKEN)
  .catch(() => {
    throw new Error('Could not login to Discord.  Please double check your token.')
  })
