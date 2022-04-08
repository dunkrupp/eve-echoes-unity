'use strict'

const AbstractRepository = require('./AbstractRepository')
const Database = require('../Database')
const Citation = require('../models/Citation')

class CitationRepository extends AbstractRepository {
  constructor () {
    super()
    this.table = 'citations'
    this.connection = new Database({ table: this.table })
  }

  /**
   * @param value
   * @param column
   * @returns {*}
   */
  search (value, column = 'id') {
    return this.connection.all(column, value)
  }

  /**
   * @param attributes
   * @returns {attributes}
   */
  create (attributes) {
    return this.connection.create(
      attributes
    )
  }

  /**
   * @param value
   * @param column
   * @returns {*}
   */
  delete (value, column = 'id') {
    return this.connection.delete(column, value)
  }

  /**
   * @param attributes
   * @returns {Citation}
   */
  new (attributes = {}) {
    return new Citation(attributes)
  }

  /**
   * @param value
   * @param column
   * @returns {*}
   */
  count (value, column = 'id') {
    return this.connection.all(column, value).length
  }
}

module.exports = CitationRepository
