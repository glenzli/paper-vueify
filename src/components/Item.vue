<template>
  <component :is="component" :element="element" v-on="$listeners"></component>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Mixins, Vue, Prop, Watch } from 'vue-property-decorator'
import { GetItemTypename, PaperItemRenderer, PaperItemObject } from '../model'
import { BasicComponents} from './components'

@Component({
  components: BasicComponents,
})
export default class PItem extends Vue {
  @Prop({ required: true }) element!: PaperItemObject

  get component() {
    return `P${GetItemTypename(this.element.type)!}`
  }
}
</script>
