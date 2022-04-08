'use strict'

/* Set DB Path */
const path = require('path')
const settings = require(path.join(__dirname, '/../config/settings.json'))
const dbPath = path.join(__dirname, '/../', settings.database.path)

/* Create DB if it doesn't exist */
const fs = require('fs')

fs.access(dbPath, error => {
  if (error) {
    fs.closeSync(
      fs.openSync(dbPath, 'w')
    )
  }
})

/* Install Schema */
const Sqlite = require('better-sqlite3')
const db = new Sqlite(dbPath, { verbose: console.log })

/* Uncomment below and write any database migrations */
// @todo: make an importer class to parse and run sql files maybe?
// db.prepare(``).run()
