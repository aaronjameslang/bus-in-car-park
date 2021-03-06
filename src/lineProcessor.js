/** @module */
module.exports = {
  processLine: processLine,
  processLines: processLines
}

const {append, reduce} = require('ramda')

const {place, move, left, right, report} = require('./engine')
const {FACING} = require('./Pose')

/**
 * Takes an array of strings, detailing the commands as the user has
 *   specified them, processes them, and returns the final pose
 *   and any output
 *
 * @static
 * @param {string[]} linesIn The commands to be processed
 * @returns {Array} {[module:Pose.Pose, String[]]}
 *   The final pose, and the output lines
 */
function processLines (linesIn) {
  const reductor = ([poseIn, linesOut], lineIn) => {
    const [poseOut, lineOut] = processLine(poseIn, lineIn)
    return [poseOut, lineOut ? append(lineOut, linesOut) : linesOut]
  }

  return reduce(reductor, [null, []], linesIn)
}

/**
 * Applies the specified input string to the pose and returns the
 *   resulting pose and any output
 *
 * @static
 * @param {module:Pose.Pose} pose The initial pose
 * @param {string} line A line of input describing a command
 * @returns {Array} {[module:Pose.Pose, ?string}
 *   The final pose, and the output line if any
 */
function processLine (pose, line) {
  const parts = line.split(/[^\w\d]/)
  switch (parts[0]) {
    case 'PLACE':
      const x = Number(parts[1])
      const y = Number(parts[2])
      const f = FACING[parts[3]]
      return [place(x, y, f, pose)]
    case 'MOVE':
      return [move(pose)]
    case 'LEFT':
      return [left(pose)]
    case 'RIGHT':
      return [right(pose)]
    case 'REPORT':
      return [report(pose), pose ? format(pose) : null]
    default:
      return [pose]
  }
}

function format (pose) {
  return 'Output: ' + pose.x + ',' + pose.y + ',' + FACING[pose.f]
}
