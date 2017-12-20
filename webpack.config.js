module.exports = {
  entry: {
    'mocha.js': './node_modules/mocha/mocha.js',
    'tests.js': [
      './test/Pose.js', // TODO this should be a pattern match
      './test/engine.js',
      './test/lineProcessor.js'
    ]
  },
  output: {
    filename: './docs/extras/[name]'
  }
}
