'use strict'

/** Config */
const config = require('../config/settings.json')

/** Bootstrap Application */
const app = require('../bootstrap/app')

/** Classes */
const Client = new app.Discord.Client()

Client.on('ready', () => {
  console.log('####################################')
  console.log('######### TEST MODE CLIENT #########')
  console.log('####################################')
  const fs = require('fs')

  /* Check for Database */
  fs.access(config.database, error => {
    if (!error) {
      console.log('Database Ready')
    } else {
      console.log('No Database Found')
    }
  })
  console.log('Bot Ready')

  /* Set Bot */
  Client.user.setStatus('online')
  Client.user.setPresence({
    game: {
      name: 'testing.',
      type: 'LISTENING'
    }
  })

  /* Get Guilds ID */
  const server = { guilds: [], roles: [] }

  Client.guilds.forEach(function (guild) {
    server.guilds.push({ id: guild.id, name: guild.name, members: guild.memberCount })

    guild.roles.forEach((role) => {
      server.roles.push({ id: role.id, name: role.name, permissions: role.permissions })
    })
  })

  const data = JSON.stringify(server, null, 2)

  fs.writeFileSync(app.root_path + '/config/server.json', data, (error) => {
    if (error) {
      throw error
    } else {
      console.info('server.json successfully written.')
    }
  })
})

Client.login(config.token)
