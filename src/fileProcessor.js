const fs = require('fs')

const {processLines} = require('./lineProcessor')

module.exports.processFile = processFile

function processFile(filename, console) {
  const text = fs.readFileSync(filename, 'utf8')
  const linesIn = text.split(/\r?\n/)
  const [_, linesOut] = processLines(linesIn)
  linesOut.forEach(line => console.log(line))
}

