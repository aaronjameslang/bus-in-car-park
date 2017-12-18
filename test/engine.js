const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-properties'))
const R = require('rambda')

const {place, move, left, right, report} = require('../src/engine')
const {NORTH, EAST, SOUTH, WEST} = require('../src/Pose')
const Pose = require('../src/Pose')

describe('engine', function() {
  describe('right', function() {
    it('should go NORTH -> EAST', function() {
      const north = Pose(0, 0, NORTH)
      const east = right(north)
      expect(east).to.have.properties({x:0, y:0, f:EAST})
    })
    it('should go WEST -> NORTH', function() {
      const west = Pose(0, 0, WEST)
      const north = right(west)
      expect(north).to.have.properties({x:0, y:0, f:NORTH})
    })
  })
  describe('left', function() {
    it('should go NORTH -> WEST', function() {
      const north = Pose(0, 0, NORTH)
      const west = left(north)
      expect(west).to.have.properties({x:0, y:0, f:WEST})
    })
    it('should go EAST -> NORTH', function() {
      const east = Pose(0, 0, EAST)
      const north = left(east)
      expect(north).to.have.properties({x:0, y:0, f:NORTH})
    })
  })
  describe('Specification §3', function() {
    it('§3a', function() {
      const pose = R.pipe(
        place(0, 0, NORTH),
        move,
        report
      )()
      expect(pose).to.have.properties({x:0, y:1, f:NORTH})
    })
    it('§3b', function() {
      const pose = R.pipe(
        place(0, 0, NORTH),
        left,
        report
      )()
      expect(pose).to.have.properties({x:0, y:0, f:WEST})
    })
    it('§3c', function() {
      const pose = R.pipe(
        place(1, 2, EAST),
        move,
        move,
        left,
        move,
        report
      )()
      expect(pose).to.have.properties({x:3, y:3, f:NORTH})
    })
  })
})
