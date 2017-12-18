const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-properties'))
const R = require('rambda')

const {place, move, left, right, report} = require('../src/engine')
const {NORTH, EAST, SOUTH, WEST} = require('../src/Pose')
const Pose = require('../src/Pose')

describe('engine', function() {
  describe('move', function() {
    it('should go NORTH', function() {
      const init = Pose(2, 2, NORTH)
      const pose = move(init)
      expect(pose).to.eql(Pose(2, 3, NORTH))
    })
    it('should go EAST', function() {
      const init = Pose(2, 2, EAST)
      const pose = move(init)
      expect(pose).to.eql(Pose(3, 2, EAST))
    })
    it('should go SOUTH', function() {
      const init = Pose(2, 2, SOUTH)
      const pose = move(init)
      expect(pose).to.eql(Pose(2, 1, SOUTH))
    })
    it('should go WEST', function() {
      const init = Pose(2, 2, WEST)
      const pose = move(init)
      expect(pose).to.eql(Pose(1, 2, WEST))
    })
  })
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
  describe('Specification §1', function() {
    it('§1.3 Any movement that would result in the bus leaving the carpark must be prevented,', function() {
      const pose = R.pipe(
        place(0, 4, NORTH),
        move, // illegal
        report
      )()
      expect(pose).to.have.properties(Pose(0, 4, NORTH))
    })
    it('§1.3 ... however further valid movement commands must still be allowed', function() {
      const pose = R.pipe(
        place(0, 4, NORTH),
        move, // illegal
        right,
        move,
        report
      )()
      expect(pose).to.have.properties(Pose(1, 4, EAST))
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
