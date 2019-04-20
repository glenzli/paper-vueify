module.exports = {
  publicPath: './',
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      config.module.rules.forEach(rule => {
        if (rule.use) {
          let idx = rule.use.findIndex(w => w.loader === 'thread-loader')
          if (idx !== -1) rule.use.splice(idx, 1)
        }
      })
    }
  },
  chainWebpack: config => {
    if (process.env.VUE_APP_DEMO === 'OFF') {
      // to get .d.ts declaration file, almost a year but the bug remains
      // disable cache loader
      config.module.rule("ts").uses.delete("cache-loader");

      config.module.rule('ts').use('ts-loader').loader('ts-loader').tap(opts => {
        opts.transpileOnly = false
        opts.happyPackMode = false
        return opts
      })

      config.externals({
        'arrayex': 'arrayex',
        'direct-object': 'direct-object',
        'paper': 'paper',
        'paper-vueify-datatypes': 'paper-vueify-datatypes',
        'vue': 'vue',
        'core-js': 'core-js',
        'vue-class-component': 'vue-class-component',
        'vue-property-decorator': 'vue-property-decorator'
      })
    }
  }
}
