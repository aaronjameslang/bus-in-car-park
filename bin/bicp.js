#! /usr/bin/env node

const filename = process.argv[2]
if (filename) {
  require('../src/fileProcessor').processFile(filename, console)
} else {
  require('../src/repl').run(process, console)
}
