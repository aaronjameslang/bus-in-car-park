# bus-in-car-park [![Build Status](https://travis-ci.org/aaronjameslang/bus-in-car-park.svg?branch=master)](https://travis-ci.org/aaronjameslang/bus-in-car-park)

"Bus in Car Park" is a simulation of, you guessed it, a bus in a car park

Original specification available [here](username.github.io/bus-in-car-park/specification.pdf)

Amended  specification available [here](username.github.io/bus-in-car-park/specification.html)

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
