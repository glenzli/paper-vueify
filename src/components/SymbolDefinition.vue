<template>
  <component :is="component" :element="element.definition" @draw="OnDrawed"></component>
</template>

<script lang="ts">
import paper from 'paper'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { DirectMap } from 'direct-object'
import { SymbolItemObject, SymbolDefinitionObject, GetItemTypename, $iMap, PaperItemRenderer } from '../model'
import { BasicComponents} from './components'

@Component({
  components: BasicComponents,
})
export default class PSymbolDefinition extends Vue {
  @Prop({ required: true }) element!: SymbolDefinitionObject

  get component() {
    return `P${GetItemTypename(this.element.definition.type)!}`
  }

  OnDrawed(rendererId: number) {
    let renderer = $iMap.Get<PaperItemRenderer>(rendererId)!
    let symbol = $iMap.Get<paper.Symbol>(this.element.key)
    if (!symbol) {
      symbol = new paper.Symbol(new paper.Path())
      $iMap.Bind(this.element.key, symbol)
    }
    if (!symbol.definition) {
      symbol.definition!.remove()
    }
    symbol.definition = renderer.visual
  }

  @Watch('element.key')
  OnKeyChanged(key: string, oldKey: string) {
    let symbol = $iMap.Get(oldKey)
    $iMap.Delete(oldKey)
    if (symbol) {
      $iMap.Bind(key, symbol)
    }
  }
}
</script>
