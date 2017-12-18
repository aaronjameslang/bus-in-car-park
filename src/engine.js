const R = require('rambda')

const Pose = require('./Pose')

function getUnitVector(f) {
  return {
    0: {x: 0, y:+1}, // North
    1: {x:+1, y: 0}, // East
    2: {x: 0, y:-1}, // South
    3: {x:-1, y: 0}, // West
  }[f]
}

function move(pose) {
  const unitVector = getUnitVector(pose.f)
  const x = pose.x + unitVector.x
  const y = pose.y + unitVector.y
  const f = pose.f
  return Pose(x, y, f)
}

const turn = R.curry(
  (Δt, pose) =>
    Pose(
      pose.x,
      pose.y,
     (pose.f + Δt + 4) % 4,
      pose
    )
)

const place = R.curry(Pose)
const left  = turn(-1)
const right = turn(+1)
const report = R.identity

module.exports = {
  place: place,
  move: move,
  left: left,
  right: right,
  report:report,
}

