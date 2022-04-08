'use strict'

/** Config */
const config = require('./config/settings.json')

/** Bootstrap Application */
const app = require('./bootstrap/app')

/** Classes */
const Client = new app.Discord.Client(undefined)
const Command = new app.Command()

/* Start-up Checks */
Client.on('ready', () => {
  const fs = require('fs')
  console.log('Bot Ready')

  /* Check for Database */
  fs.access(config.database, error => {
    if (error) {
      throw error
    }
  })
  console.log('Database Ready')

  /* Get Server ID and Roles */
  const server = { guilds: [], roles: [] }
  Client.guilds.forEach(guild => {
    server.guilds.push(guild.id)

    guild.roles.forEach(role => {
      server.roles.push({ id: role.id, name: role.name, permissions: role.permissions })
    })
  })

  const data = JSON.stringify(server, null, 2)

  fs.writeFileSync(app.root_path + '/config/settings.json', data, error => {
    if (error) {
      throw error
    }
  })
  console.log('Config Ready')

  /* Set Bot Status */
  Client.user.setStatus('available')
  Client.user.setPresence({
    game: {
      name: 'orders.',
      type: 'LISTENING'
    }
  })
  console.log('Client Ready')
})

Client.on('message', message => {
  /* Ignore bot & non-prefixed messages */
  if (
    message.author.bot ||
    !message.content.startsWith(config.prefix)
  ) {
    return false
  }

  /* Parse and match command */
  const command = Command.parse(
    message
  )

  /** @todo: process error if exists */
  if (command.hasErrors()) {
    message.reply(command.errors.map(error => `${error.message}`))
  } else {
    if (command.accessible) {
      message.channel.send(
        app.dispatch(command)
      ).catch(error => {
        console.error(error)
      })
    } else {
      message.reply('You are not authorized to use this command.')
    }
  }

  command.clean()
})

Client.login(config.token)
