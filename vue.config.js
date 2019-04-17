module.exports = {
  publicPath: './',
  chainWebpack: config => {
    if (process.env.VUE_APP_DEMO === 'OFF') {
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
}
