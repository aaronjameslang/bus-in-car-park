/**
 * @module
 */
module.exports = Pose

/**
 * Positon & Facing
 *
 * There's a snappy backronym here somewhere
 * Position and Orientation of Specific Entity? idk
 *
 * @constructor
 * @param {int} x - Horizontal position, between 0-4 inclusive, 0 is south
 * @param {int} y - Vertical   position, between 0-4 inclusive, 0 is west
 * @param {int} f - Facing/orientation , between 0-3 inclusive
 * @param {?module:Pose.Pose} [fallback] - State if others params are invalid
 * @see module:Pose.FACING
 * @static
 */
function Pose (x, y, f, fallback) {
  if (!isValid(x, y, f)) return fallback
  return Object.freeze({
    x: x,
    y: y,
    f: f
  })
}

function isValid (x, y, f) {
  return true &&
    isIntInRange(x, 0, 4) &&
    isIntInRange(y, 0, 4) &&
    isIntInRange(f, 0, 3)
}

function isIntInRange (i, min, max) {
  return Number.isInteger(i) && i >= min && i <= max
}

/**
 * A map of facings, names <-> id
 * 0: North, 1: East, 2: South, 3: West
 * Multiply by 3 and visualise a clock face
 * @static
 */
const FACING = [
  'NORTH',
  'EAST',
  'SOUTH',
  'WEST'
]
FACING.forEach((name, id) => { FACING[name] = id })
Pose.FACING = Object.freeze(FACING)
