const R = require('rambda')

const Pose = require('./Pose')

function move(pose) {
  return pose && Pose(
    pose.x + ( 2 - pose.f ) % 2,
    pose.y + ( 1 - pose.f ) % 2,
    pose.f,
    pose
  )
}

const turn = R.curry(
  (Δt, pose) =>
    pose && Pose(
      pose.x,
      pose.y,
     (pose.f + Δt + 4) % 4,
      pose
    )
)

module.exports = {
  place: R.curry(Pose),
  move: move,
  left:  turn(-1),
  right: turn(+1),
  report: R.identity,
}

