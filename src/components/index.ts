import Vue from 'vue'

export function InstallPaperComponents() {
  const imports = require.context('.', false, /\.vue$/)
  imports.keys().forEach(key => {
    let id = key.replace(/(\.\/|\.vue)/g, '')
    Vue.component(`P${id}`, imports(key).default)
  })
}
