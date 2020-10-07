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
    config.module.rule("vue").uses.delete('thread-loader');
    config.module.rule("js").uses.delete('thread-loader');
    config.module.rule("ts").uses.delete('thread-loader');
    config.module.rule("tsx").uses.delete('thread-loader');

    if (process.env.NODE_ENV === 'production') {
      config.module.rule("ts").uses.delete("cache-loader");

      config.module.rule('ts').use('ts-loader').loader('ts-loader').tap(opts => {
        opts.transpileOnly = false
        opts.happyPackMode = false
        return opts
      })

      if (!process.env.DEMO_TARGET) {
        config.externals({
          'js-corelib': 'js-corelib',
          'paper': 'paper',
          'paper-vueify-datatypes': 'paper-vueify-datatypes',
          'vue': 'vue',
        })
      }
    }
  }
}
