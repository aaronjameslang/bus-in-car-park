/* globals describe it */

const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-properties'))

const Pose = require('../src/Pose')

describe('Pose', function () {
  it('should accept valid input', function () {
    const fallback = Pose(0, 1, 2)
    const pose = Pose(3, 3, 3, fallback)
    expect(pose).to.have.properties({x: 3, y: 3, f: 3})
  })
  it('should not accept invalid position', function () {
    const fallback = Pose(0, 1, 2)
    const pose = Pose(5, 3, 3, fallback)
    expect(pose).to.have.properties({x: 0, y: 1, f: 2})
  })
  it('should not accept invalid facing', function () {
    const fallback = Pose(0, 1, 2)
    const pose = Pose(4, 4, 4, fallback)
    expect(pose).to.have.properties({x: 0, y: 1, f: 2})
  })
  it('should not require a fallback', function () {
    const pose = Pose(0, 0, 0)
    expect(pose).to.have.properties({x: 0, y: 0, f: 0})
  })

  describe('FACING', function () {
    it('should map NORTH -> 0', function () {
      const id = Pose.FACING['NORTH']
      expect(id).to.equal(0)
    })
    it('should map WEST -> 3', function () {
      const id = Pose.FACING['WEST']
      expect(id).to.equal(3)
    })
    it('should map 0 -> NORTH', function () {
      const name = Pose.FACING[0]
      expect(name).to.equal('NORTH')
    })
    it('should map 3 -> WEST', function () {
      const name = Pose.FACING[3]
      expect(name).to.equal('WEST')
    })
  })
})
