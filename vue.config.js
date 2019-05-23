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
    // to get .d.ts declaration file, almost a year but the bug remains
    // disable cache loader
    if (process.env.NODE_ENV === 'production') {
      config.module.rule("ts").uses.delete("cache-loader");

      config.module.rule('ts').use('ts-loader').loader('ts-loader').tap(opts => {
        opts.transpileOnly = false
        opts.happyPackMode = false
        return opts
      })

      if (!process.env.DEMO_TARGET) {
        config.externals({
          'arrayex': 'arrayex',
          'direct-object': 'direct-object',
          'paper': 'paper',
          'paper-vueify-datatypes': 'paper-vueify-datatypes',
          'vue': 'vue',
          'core-js': 'core-js'
        })
      } else {
        config.externals({
          'paper': 'paper',
          'vue': 'Vue',
        })
      }
    }
  }
}
