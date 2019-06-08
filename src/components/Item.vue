<template>
  <component :is="component" :element="element" :index="index" v-on="$listeners"></component>
</template>

<script lang="ts">
import paper from 'paper'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { GetItemTypename, PaperItemRenderer, PaperItemObject } from '../model'
import { BasicComponents} from './components'

@Component({
  components: BasicComponents,
})
export default class PItem extends Vue {
  @Prop({ required: true }) element!: PaperItemObject
  @Prop({ default: -1 }) index!: number

  get component() {
    return `P${GetItemTypename(this.element.type)!}`
  }
}
</script>
