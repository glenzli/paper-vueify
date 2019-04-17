import { DirectMapObject } from 'direct-object'

let DemoDocs: DirectMapObject<any> = {}
const imports = require.context('.', false, /\.vue$/)
imports.keys().forEach(key => {
  let id = key.replace(/(\.\/|\.vue)/g, '')
  DemoDocs[`${id}Doc`] = imports(key).default
})

export { DemoDocs }
