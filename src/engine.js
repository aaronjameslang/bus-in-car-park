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

