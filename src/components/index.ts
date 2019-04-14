import Vue from 'vue'

export function InstallPaperComponents() {
  const imports = require.context('.', false, /\.vue$/)
  imports.keys().forEach(key => {
    let id = key.replace(/(\.\/|\.vue)/g, '')
    Vue.component(`P${id}`, imports(key).default)
  })
}

export { default as PCanvas } from './Canvas.vue'
export { default as PCircle } from './Circle.vue'
export { default as PEllipse } from './Ellipse.vue'
export { default as PGroup } from './Group.vue'
export { default as PItem } from './Item.vue'
export { default as PPath } from './Path.vue'
export { default as PPointText } from './PointText.vue'
export { default as PPolygon } from './Polygon.vue'
export { default as PPolyline } from './Polyline.vue'
export { default as PRectangle } from './Rectangle.vue'
export { default as PRegularPolygon } from './RegularPolygon.vue'
export { default as PStar } from './Star.vue'
export { default as PSymbol } from './Symbol.vue'
export { default as PSymbolDefinition } from './SymbolDefinition.vue'
export * from './Basic'
export * from './Shape'
