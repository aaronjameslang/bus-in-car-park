module.exports = {
  processLine: processLine,
  processLines: processLines
}

const {append, pipe, reduce} = require('rambda')

const {place, move, left, right, report} = require('./engine')
const {FACING} = require('./Pose')

function processLines(linesIn) {
  const reductor = ([poseIn, linesOut], lineIn) => {
    const [poseOut, lineOut] = processLine(poseIn, lineIn)
    return [poseOut, lineOut ? append(lineOut, linesOut) : linesOut]
  }

  return reduce(reductor, [null, []], linesIn)
}

function processLine(pose, line) {
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

function format(pose) {
  return 'Output: ' + pose.x + ',' + pose.y + ',' + FACING[pose.f]
}
