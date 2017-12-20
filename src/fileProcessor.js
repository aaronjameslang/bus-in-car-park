/** @module */
const fs = require('fs')

const {processLines} = require('./lineProcessor')

module.exports.processFile = processFile

/**
 * Takes a filename, reads commands from it,
 *   and writes the result to the console
 *
 * @static
 * @param {string} filenme The file to be read for commands
 * @returns {external:console} The console the output will be logged to
 */
function processFile (filename, console) {
  const text = fs.readFileSync(filename, 'utf8')
  const linesIn = text.split(/\r?\n/)
  const linesOut = processLines(linesIn)[1]
  linesOut.forEach(line => console.log(line))
}
