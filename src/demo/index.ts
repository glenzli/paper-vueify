import { ObjectArray } from 'js-corelib'

let Demos: ObjectArray<any> = {}
const imports = require.context('.', false, /\.vue$/)
imports.keys().forEach(key => {
  let id = key.replace(/(\.\/|\.vue)/g, '')
  Demos[`${id}Demo`] = imports(key).default
})

export { Demos }
