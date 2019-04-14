import { DirectMapObject } from 'direct-object'

let Demos: DirectMapObject<any> = {}
let DemoDescriptions: DirectMapObject<string> = {}
const imports = require.context('.', false, /\.vue$/)
imports.keys().forEach(key => {
  let id = key.replace(/(\.\/|\.vue)/g, '')
  id = `${id}Demo`
  Demos[id] = imports(key).default
  DemoDescriptions[id] = imports(key).Description
})

export { Demos, DemoDescriptions }
