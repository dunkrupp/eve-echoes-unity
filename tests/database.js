const app = require('../bootstrap/app')

const OffenderRepository = require('../app/repositories/OffenderRepository')

const repository = new OffenderRepository()

console.log(
  repository.search('Drewbie5')
)
