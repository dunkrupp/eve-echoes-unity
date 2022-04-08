'use strict'

const Sqlite = require('better-sqlite3')
const path = require('path')
const settings = require(path.join(__dirname, '/../config/settings.json'))
const dbPath = path.join(__dirname, '/../', settings.database.path)

/* @todo: refactor to use statement query builder */
class Database {
  /**
   * @param opts
   */
  constructor (opts) {
    this._connection = null
    this._rows = []
    this._attributes = {}
    this._lastInsertId = null
    this._table = (opts !== undefined && 'table' in opts) ? opts.table : ''
    this.connect()
    return this
  }

  /**
   * @returns {null}
   */
  get connection () {
    return this._connection
  }

  /**
   * @param adapter
   */
  set connection (adapter) {
    this._connection = adapter
  }

  /**
   * @returns {*}
   */
  get attributes () {
    return this._attributes
  }

  /**
   * @param attributes
   */
  set attributes (attributes) {
    this._attributes = attributes
  }

  /**
   * @returns {array}
   */
  get columns () {
    return Object.keys(this._attributes)
  }

  /**
   * @returns {array}
   */
  get values () {
    return Object.values(this._attributes)
  }

  /**
   * @returns {string}
   */
  get binds () {
    return [...Array(this.values.length)].map(i => '?').join(',')
  }

  /**
   * @returns {*|string}
   */
  get table () {
    return this._table
  }

  /**
   * @param table
   */
  set table (table) {
    this._table = table
  }

  /**
   * @returns {null}
   */
  get lastInsertId () {
    return this._lastInsertId
  }

  /**
   * @param id
   */
  set lastInsertId (id) {
    this._lastInsertId = id
  }

  /**
   * Sets the database connection
   */
  connect () {
    this.connection = new Sqlite(dbPath, { verbose: console.log })
  }

  /**
   * Closes the connection
   */
  disconnect () {
    this.connection.close()
  }

  /**
   * @returns {boolean|*}
   */
  create (attributes) {
    this.attributes = attributes

    const statement = this.build(
      `INSERT INTO ${this.table} (${this.columns.join(',')}) VALUES (${this.binds});`
    )

    const result = statement.run(this.values)

    /* Set Last Insert ID */
    this.lastInsertId = result.lastInsertRowid

    return this.where('id', result.lastInsertRowid)
  }

  /**
   * @param value
   * @param column
   * @returns {*}
   */
  delete (column, value) {
    const statement = this.build(
      `DELETE FROM ${this.table} WHERE ${column} = ?;`
    )

    return statement.run(value)
  }

  /**
   * @param column
   * @param value
   * @param operator
   * @returns {*}
   */
  where (column, value, operator = '=') {
    const statement = this.build(
      `SELECT * FROM ${this.table} WHERE ${column} ${operator} ?;`
    )

    return statement.get(value)
  }

  /**
   * @returns {Promise<[*]>}
   */
  all (column = null, value = null, operator = '=', take = null) {
    const where = (column !== null && value !== null) ? ` WHERE ${column} ${operator} ?` : ''
    const limit = (take !== null) ? ` LIMIT ${take}` : ''
    const statement = this.build(
      `SELECT * FROM ${this.table}${where}${limit};`
    )

    return value !== null ? statement.all(value) : statement.all()
  }

  /**
   * @param statement
   */
  build (statement) {
    return this.connection.prepare(statement)
  }

  /**
   * @param query
   * @returns {Promise<[*]>}
   */
  raw (query) {
    const statement = this.build(query)

    return statement.all()
  }

  /**
   * Clears all Attributes and Rows
   */
  clear () {
    this._attributes = []
    this._rows = []
  }

  /**
   * @returns {string}
   */
  softDeleted () {
    return 'where soft_delete = 1'
  }
}

module.exports = Database
