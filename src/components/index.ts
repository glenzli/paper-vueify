import Vue, { VueConstructor } from 'vue'

import PCanvas from './Canvas.vue'
import PItem from './Item.vue'
import PSymbolDefinition from './SymbolDefinition.vue'

export default {
  install(vue: VueConstructor<Vue>) {
    vue.component('p-canvas', PCanvas)
    vue.component('p-item', PItem)
    vue.component('p-symbol-definition', PSymbolDefinition)
  },
}

export { PCanvas, PItem, PSymbolDefinition }
export * from './Basic'
export * from './Shape'
