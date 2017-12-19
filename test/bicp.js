/* globals describe it */

const chai = require('chai')
const expect = chai.expect

const {exec} = require('child_process')

describe('bicp', function () {
  describe('Specification §3', function () {
    it('§3a', function (done) {
      exec('bin/bicp test/3a.bicp', (err, stdout, stderr) => {
        expect(err).to.equal(null)
        expect(stdout).to.equal('Output: 0,1,NORTH\n')
        expect(stderr).to.equal('')
        done()
      })
    })
    it('§3b', function (done) {
      exec('bin/bicp test/3b.bicp', (err, stdout, stderr) => {
        expect(err).to.equal(null)
        expect(stdout).to.equal('Output: 0,0,WEST\n')
        expect(stderr).to.equal('')
        done()
      })
    })
    it('§3c', function (done) {
      exec('bin/bicp test/3c.bicp', (err, stdout, stderr) => {
        expect(err).to.equal(null)
        expect(stdout).to.equal('Output: 3,3,NORTH\n')
        expect(stderr).to.equal('')
        done()
      })
    })
  })
})
