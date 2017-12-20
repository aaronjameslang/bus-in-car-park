/** @module */

const R = require('ramda')

const Pose = require('./Pose')

/** @see module:engine.move */
function move (pose) {
  return pose && Pose(
    pose.x + (2 - pose.f) % 2,
    pose.y + (1 - pose.f) % 2,
    pose.f,
    pose
  )
}

/**
 * Calculate a turn
 *
 * If the initial pose is unset, the result will be also
 *
 * @param {int} Δf - The change in f, how much to turn
 * @param {module:Pose.Pose} pose - The pose before turning
 * @returns {module:Pose.Pose} The pose after turning
 */
function turn (Δf, pose) {
  return pose && Pose(
    pose.x,
    pose.y,
   (pose.f + Δf + 4) % 4,
    pose
  )
}

module.exports = {
  /**
   * Calculate the pose after a place
   *
   * This function is curried
   *
   * @function
   * @param {int} x - Horizontal position, between 0-4 inclusive, 0 is south
   * @param {int} y - Vertical   position, between 0-4 inclusive, 0 is west
   * @param {int} f - Facing/orientation , between 0-3 inclusive
   * @param {module:Pose.Pose} pose - The pose before placing
   * @returns {module:Pose.Pose} The pose after
   */
  place: R.curry(Pose),
  /**
   * Calculate the pose after a move
   *
   * @function
   * @param {module:Pose.Pose} pose - The pose before moving
   * @returns {module:Pose.Pose} The pose after
   */
  move: move,
  /**
   * Calculate the pose after a left turn
   *
   * @see module:engine~turn
   * @see module:engine.right
   *
   * @function
   * @param {module:Pose.Pose} pose - The pose before turning
   * @returns {module:Pose.Pose} The pose after turning
   */
  left: R.partial(turn, [-1]),
  /**
   * Calculate the pose after a right turn
   *
   * @see module:engine~turn
   * @see module:engine.left
   *
   * @function
   * @param {module:Pose.Pose} pose - The pose before turning
   * @returns {module:Pose.Pose} The pose after turning
   */
  right: R.partial(turn, [+1]),
  /**
   * Calculate the pose after a report, this is a no-op
   *
   * @function
   * @param {module:Pose.Pose} pose - The pose before
   * @returns {module:Pose.Pose} The pose after
   */
  report: R.identity
}
