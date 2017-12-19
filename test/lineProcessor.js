const chai = require('chai')
const expect = chai.expect
const R = require('ramda')

const {NORTH, EAST, SOUTH, WEST} = require('../src/Pose').FACING
const Pose = require('../src/Pose')
const {processLine, processLines} = require('../src/lineProcessor')

function testProcessLines(linesIn, expectedPose, expectedLinesOut) {
  const [actualPose, actualLinesOut] = processLines(linesIn)
  expect(actualPose).to.eql(expectedPose)
  expect(actualLinesOut).to.eql(expectedLinesOut)
}

describe('CLI', function() {
  it('should be able to accept any of the 5 commands (§1.4)', function() {
    testProcessLines(
      [
        'PLACE 1,2,EAST',
        'LEFT',
        'LEFT',
        'LEFT',
        'RIGHT',
        'LEFT',
        'MOVE',
        'REPORT',
      ],
      Pose(1, 1, SOUTH),
      ['Output: 1,1,SOUTH']
    )
  })
  it('should discard all commands until a valid PLACE command (§§1.4, 1.11)', function() {
    testProcessLines(
      [
        'PLACE 1,7,UP',
        'LEFT',
        'LIFT',
        'LEFT',
        'RIGHT',
        'LEFT',
        'MOVE',
        'REPORT',
        'PLACE 1,2,EAST',
        'LEFT',
        'LEFT',
        'LEFT',
        'RIGHT',
        'LEFT',
        'MOVE',
        'REPORT',
      ],
      Pose(1, 1, SOUTH),
      ['Output: 1,1,SOUTH']
    )
  })
  describe('PLACE', function() {
    it('should face NORTH at 0,0 (§1.5)', function() {
      const [pose, lineOut] = processLine(null, 'PLACE 0,0,NORTH')
      expect(pose).to.have.properties(Pose(0, 0, NORTH))
      expect(lineOut).to.be.undefined
    })
    it('should face WEST at 4,4 (§1.5)', function() {
      const [pose] = processLine(null, 'PLACE 4,4,WEST')
      expect(pose).to.have.properties(Pose(4, 4, WEST))
    })
    it('should be repeatable (§1.7)', function() {
      const [pose, linesOut] = processLines([
        'PLACE 1,0,EAST',
        'PLACE 2,4,SOUTH',
      ])
      expect(pose).to.have.properties(Pose(2, 4, SOUTH))
      expect(linesOut).to.eql([])
    })
    it('should ignore invalid placements initially (§2.1)', function() {
      const [pose] = processLine(null, 'PLACE -1,0,EAST')
      expect(pose).to.be.null
    })
    it('should ignore invalid placements subsequently', function() {
      const [pose, linesOut] = processLines([
        'PLACE 2,4,SOUTH',
        'PLACE -1,9,EAST',
      ])
      expect(pose).to.have.properties(Pose(2, 4, SOUTH))
      expect(linesOut).to.eql([])
    })
  })
  describe('MOVE', function() {
    it('should go NORTH (§1.8)', function() {
      const [pose, linesOut] = processLines([
        'PLACE 2,2,NORTH',
        'MOVE',
      ])
      expect(pose).to.have.properties(Pose(2, 3, NORTH))
      expect(linesOut).to.eql([])
    })
    it('should go WEST', function() {
      const [pose, linesOut] = processLines([
        'PLACE 2,2,WEST',
        'MOVE',
      ])
      expect(pose).to.have.properties(Pose(1, 2, WEST))
      expect(linesOut).to.eql([])
    })
    it('should prevent the bus leaving the carpark (§§1.3, 2.1, 2.2)', function() {
      const [pose, linesOut] = processLines([
        'PLACE 0,4,NORTH',
        'MOVE', // Illegal
        'REPORT',
      ])
      expect(pose).to.eql(Pose(0, 4, NORTH))
      expect(linesOut).to.eql(['Output: 0,4,NORTH'])
    })
    it(' ... however further valid movement commands must still be allowed (§1.3)', function() {
      const [pose, linesOut] = processLines([
        'PLACE 0,4,NORTH',
        'MOVE', // Illegal
        'RIGHT',
        'MOVE',
        'REPORT',
      ])
      expect(pose).to.eql(Pose(1, 4, EAST))
      expect(linesOut).to.eql(['Output: 1,4,EAST'])
    })
  })
  describe('Specification §3', function() {
    it('§3a', function() {
      const [pose, linesOut] = processLines([
        'PLACE 0,0,NORTH',
        'MOVE',
        'REPORT',
      ])
      expect(pose).to.have.properties(Pose(0, 1, NORTH))
      expect(linesOut).to.eql(['Output: 0,1,NORTH'])
    })
    it('§3b', function() {
      const [pose, linesOut] = processLines([
        'PLACE 0,0,NORTH',
        'LEFT',
        'REPORT',
      ])
      expect(pose).to.have.properties(Pose(0, 0, WEST))
      expect(linesOut).to.eql(['Output: 0,0,WEST'])
    })
    it('§3c', function() {
      const [pose, linesOut] = processLines([
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'MOVE',
        'REPORT',
      ])
      expect(pose).to.have.properties(Pose(3, 3, NORTH))
      expect(linesOut).to.eql(['Output: 3,3,NORTH'])
    })
  })
})
