/** @module */
const readline = require('readline')

const {processLine} = require('../src/lineProcessor')

module.exports.run = run

/**
 * Run the REPL, accepting input, processing, and printing output
 *
 * @param {external:process} The process to be used for IO & exit
 * @param {external:console} The console for output to be logged to
 * @returns {undefined}
 */
function run (process, console) {
  let currentPose = null
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  }).on('line', lineIn => {
    const [pose, lineOut] = processLine(currentPose, lineIn)
    currentPose = pose
    if (lineOut) {
      console.log('  ' + lineOut)
    } else if (!pose) {
      console.log(':')
    } else {
      const arrow = String.fromCodePoint(0xD83E, 0xDC1C + ((pose.f + 1) % 4))
      const str = ': ' + pose.x + ',' + pose.y + ' ' + arrow
      console.log(str)
    }
    rl.prompt()
  }).on('close', () => {
    process.exit()
  })
  rl.prompt()
}
