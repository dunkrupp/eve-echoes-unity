const app = require('../bootstrap/app')
const Command = new app.Command()

const tests = [
  '.citation add Drew Broke the Roe Rule D',
  '.citation current Drew',
  '.citation total Drew',
  '.citation search Drew',
  '.citation lookup Drew',
  '.citation resolve Drew 1',
  '.citation clear Drew'
]

for (const test of tests) {
  console.log(Command.parse(test))
}
