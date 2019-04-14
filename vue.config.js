module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.externals({
      'arrayex': 'arrayex',
      'direct-object': 'direct-object',
      'paper': 'paper',
      'vue': 'vue',
      'core-js': 'core-js',
      'vue-class-component': 'vue-class-component',
      'vue-property-decorator': 'vue-property-decorator'
    })
  }
}
