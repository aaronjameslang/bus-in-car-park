module.exports = {
  entry: {
    'mocha.min.js': './node_modules/mocha/mocha.js',
    'tests.min.js': [
      './test/Pose.js', // TODO this should be a pattern match
      './test/engine.js',
      './test/lineProcessor.js'
    ]
  },
  output: {
    filename: './docs/[name]'
  }
}
