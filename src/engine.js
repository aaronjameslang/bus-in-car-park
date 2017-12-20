const R = require('ramda')

const Pose = require('./Pose')

function move (pose) {
  return pose && Pose(
    pose.x + (2 - pose.f) % 2,
    pose.y + (1 - pose.f) % 2,
    pose.f,
    pose
  )
}

function turn (Δf, pose) {
  return pose && Pose(
    pose.x,
    pose.y,
   (pose.f + Δf + 4) % 4,
    pose
  )
}

module.exports = {
  place: R.curry(Pose),
  move: move,
  left: R.partial(turn, [-1]),
  right: R.partial(turn, [+1]),
  report: R.identity
}
