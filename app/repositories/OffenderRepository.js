'use strict'

const AbstractRepository = require('./AbstractRepository')
const Database = require('../Database')
const Offender = require('../models/Offender')

class OffenderRepository extends AbstractRepository {
  constructor () {
    super()
    this.table = 'offenders'
    this.connection = new Database({ table: this.table })
  }

  /**
   * @param   value
   * @param   column
   * @returns {*}
   */
  search (value, column = 'name') {
    return this.hydrate(
      new Offender(),
      this.connection.where(column, value)
    )
  }

  /**
   * @param   attributes
   * @returns {attributes}
   */
  create (attributes) {
    return this.hydrate(
      new Offender(),
      this.connection.create(attributes)
    )
  }

  /**
   * @param   id
   * @returns {*}
   */
  delete (id) {
    return this.connection.delete(id)
  }

  /**
   * @param   attributes
   * @returns {Offender}
   */
  new (attributes = {}) {
    return new Offender()
  }

  /**
   * @param column
   * @param value
   * @param operator
   * @param take
   * @returns {[]}
   */
  all (column = null, value = null, operator = null, take = 5) {
    const results = []
    const rows = this.connection.all(column, value, operator, take)

    for (const row of rows) {
      results.push(
        this.hydrate(this.new(), row)
      )
    }

    return results
  }

  /**
   * @returns {[]}
   */
  top (take = 5) {
    const results = []
    const rows = this.connection.raw(
      `select o.*, count(c.id) as count from offenders o 
                left join citations c on o.id = c.offender_id 
             group by o.id order by count desc limit ${take}`
    )

    for (const row of rows) {
      results.push(
        this.hydrate(this.new(), row)
      )
    }

    return results
  }
}

module.exports = OffenderRepository
