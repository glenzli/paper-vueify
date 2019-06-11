import { ObjectArray } from 'js-corelib'

let DemoDocs: ObjectArray<any> = {}
const imports = require.context('.', false, /\.vue$/)
imports.keys().forEach(key => {
  let id = key.replace(/(\.\/|\.vue)/g, '')
  DemoDocs[`${id}Doc`] = imports(key).default
})

export { DemoDocs }
