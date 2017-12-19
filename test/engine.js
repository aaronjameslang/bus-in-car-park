/* globals describe it */

const chai = require('chai')
const expect = chai.expect
const {pipe} = require('ramda')

const {place, move, left, right, report} = require('../src/engine')
const {NORTH, EAST, SOUTH, WEST} = require('../src/Pose').FACING
const Pose = require('../src/Pose')

describe('engine', function () {
  describe('place', function () {
    it('should face NORTH at 0,0 (§1.5)', function () {
      const pose = pipe(
        place(0, 0, NORTH),
        report
      )(undefined)
      expect(pose).to.eql(Pose(0, 0, NORTH))
    })
    it('should face WEST at 4,4 (§1.5)', function () {
      const pose = pipe(
        place(4, 4, WEST),
        report
      )(undefined)
      expect(pose).to.eql(Pose(4, 4, WEST))
    })
    it('should be repeatable (§1.7)', function () {
      const pose = pipe(
        place(1, 0, EAST),
        place(2, 4, SOUTH),
        report
      )()
      expect(pose).to.eql(Pose(2, 4, SOUTH))
    })
    it('should ignore invalid placements initially (§2.1)', function () {
      const pose = pipe(
        place(-1, 0, EAST),
        report
      )(undefined)
      expect(pose).to.equal(undefined)
    })
    it('should ignore invalid placements subsequently', function () {
      const pose = pipe(
        place(2, 4, SOUTH),
        place(-1, 0, EAST),
        report
      )(undefined)
      expect(pose).to.eql(Pose(2, 4, SOUTH))
    })
  })
  describe('move', function () {
    it('should go NORTH (§1.8)', function () {
      const init = Pose(2, 2, NORTH)
      const pose = move(init)
      expect(pose).to.eql(Pose(2, 3, NORTH))
    })
    it('should go EAST', function () {
      const init = Pose(2, 2, EAST)
      const pose = move(init)
      expect(pose).to.eql(Pose(3, 2, EAST))
    })
    it('should go SOUTH', function () {
      const init = Pose(2, 2, SOUTH)
      const pose = move(init)
      expect(pose).to.eql(Pose(2, 1, SOUTH))
    })
    it('should go WEST', function () {
      const init = Pose(2, 2, WEST)
      const pose = move(init)
      expect(pose).to.eql(Pose(1, 2, WEST))
    })
    it('should prevent the bus leaving the carpark (§§1.3, 2.1, 2.2)', function () {
      const pose = pipe(
        place(0, 4, NORTH),
        move, // illegal
        report
      )(undefined)
      expect(pose).to.eql(Pose(0, 4, NORTH))
    })
    it(' ... however further valid movement commands must still be allowed (§1.3)', function () {
      const pose = pipe(
        place(0, 4, NORTH),
        move, // illegal
        right,
        move,
        report
      )(undefined)
      expect(pose).to.eql(Pose(1, 4, EAST))
    })
  })
  describe('right', function () {
    it('should go NORTH -> EAST (§1.9)', function () {
      const north = Pose(0, 0, NORTH)
      const east = right(north)
      expect(east).to.eql({x: 0, y: 0, f: EAST})
    })
    it('should go WEST -> NORTH', function () {
      const west = Pose(0, 0, WEST)
      const north = right(west)
      expect(north).to.eql({x: 0, y: 0, f: NORTH})
    })
  })
  describe('left', function () {
    it('should go NORTH -> WEST', function () {
      const north = Pose(0, 0, NORTH)
      const west = left(north)
      expect(west).to.eql({x: 0, y: 0, f: WEST})
    })
    it('should go EAST -> NORTH', function () {
      const east = Pose(0, 0, EAST)
      const north = left(east)
      expect(north).to.eql({x: 0, y: 0, f: NORTH})
    })
  })
  describe('Specification §3', function () {
    it('§3a', function () {
      const pose = pipe(
        place(0, 0, NORTH),
        move,
        report
      )(undefined)
      expect(pose).to.eql({x: 0, y: 1, f: NORTH})
    })
    it('§3b', function () {
      const pose = pipe(
        place(0, 0, NORTH),
        left,
        report
      )(undefined)
      expect(pose).to.eql({x: 0, y: 0, f: WEST})
    })
    it('§3c', function () {
      const pose = pipe(
        place(1, 2, EAST),
        move,
        move,
        left,
        move,
        report
      )(undefined)
      expect(pose).to.eql({x: 3, y: 3, f: NORTH})
    })
  })
  describe('engine', function () {
    it('should be able to accept any of the 5 commands (§1.4)', function () {
      const pose = pipe(
        place(1, 2, EAST),
        left,
        left,
        left,
        right,
        left,
        move,
        report
      )(undefined)
      expect(pose).to.eql(Pose(1, 1, SOUTH))
    })
    it('should discard all commands until a valid PLACE command (§§1.4, 1.11)', function () {
      const pose = pipe(
        place(1, 2, -1),
        move,
        left,
        right,
        report,
        place(1, 2, EAST),
        move,
        left,
        right,
        report
      )()
      expect(pose).to.eql(Pose(2, 2, EAST))
    })
  })
})
