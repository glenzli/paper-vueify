<template>
  <component :is="component" :element="element" v-on="$listeners"></component>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Mixins, Vue, Prop, Watch } from 'vue-property-decorator'
import { GetItemTypename, PaperItemRenderer, PaperItemObject } from '../model'

@Component
export default class PSymbolDefinition extends Vue {
  @Prop({ required: true }) element!: PaperItemObject

  get component() {
    return `P${GetItemTypename(this.element.type)!}`
  }
}
</script>
