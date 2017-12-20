# bus-in-car-park [![Build Status](https://travis-ci.org/aaronjameslang/bus-in-car-park.svg?branch=master)](https://travis-ci.org/aaronjameslang/bus-in-car-park)

"Bus in Car Park" is a simulation of, you guessed it, a bus in a car park

  - [JSDoc](//aaronjameslang.github.io/bus-in-car-park/extras/jsdoc)
  - [Original Specification](//aaronjameslang.github.io/bus-in-car-park/extras/specification.pdf)
  - [Amended  Specification](//aaronjameslang.github.io/bus-in-car-park/extras/specification.html)
  - [Test in your browser](//aaronjameslang.github.io/bus-in-car-park/extras/tests.html)

## Usage

From file:

    $ cat test/3a.bicp
    PLACE 0,0,NORTH
    MOVE
    REPORT
    $ bicp test/3a.bicp
    Output: 0,1,NORTH

As REPL:

    $ bicp
    > PLACE 0,0,NORTH
    : 0,0 🠝
    > MOVE
    : 0,1 🠝
    > REPORT
      Output: 0,1,NORTH
