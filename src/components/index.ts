import Vue, { VueConstructor } from 'vue'

import PCanvas from './Canvas.vue'
import PItem from './Item.vue'
import PSymbolDefinition from './SymbolDefinition.vue'
import { PaperScope } from 'paper'

declare module 'vue/types/vue' {
  interface Vue {
    $paper: PaperScope
  }
}

export default {
  install(vue: VueConstructor<Vue>, paper: PaperScope) {
    vue.component('p-canvas', PCanvas)
    vue.component('p-item', PItem)
    vue.component('p-symbol-definition', PSymbolDefinition)
    vue.prototype.$paper = paper
  },
}

export { PCanvas, PItem, PSymbolDefinition }
export * from './Basic'
export * from './Shape'
