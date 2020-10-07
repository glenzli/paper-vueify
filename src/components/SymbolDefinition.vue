<template>
  <component :is="component" :element="element.definition" @draw="OnDrawed"></component>
</template>

<script lang="ts">
import paper from 'paper';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { SymbolItemObject, SymbolDefinitionObject, GetItemTypename, $iMap, PaperItemRenderer } from '../model';
import { BasicComponents} from './components';

@Component({
  components: BasicComponents,
})
export default class PSymbolDefinition extends Vue {
  @Prop({ required: true }) public element!: SymbolDefinitionObject;

  get component() {
    return `P${GetItemTypename(this.element.definition.type)!}`;
  }

  public OnDrawed(rendererId: number) {
    const renderer = $iMap.Get<PaperItemRenderer>(rendererId)!;
    let symbol = $iMap.Get<paper.SymbolDefinition>(this.element.key);
    if (!symbol) {
      symbol = new paper.SymbolDefinition(new paper.Path());
      $iMap.Bind(this.element.key, symbol);
    }
    if (!symbol.item) {
      symbol.item!.remove();
    }
    symbol.item = renderer.visual;
  }

  @Watch('element.key')
  public OnKeyChanged(key: string, oldKey: string) {
    const symbol = $iMap.Get(oldKey);
    $iMap.Delete(oldKey);
    if (symbol) {
      $iMap.Bind(key, symbol);
    }
  }
}
</script>
