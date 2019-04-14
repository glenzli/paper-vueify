import paper from 'paper'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { PaperItemObject, $iMap, PaperItemRenderer } from '@/model'

@Component
export class ItemMixin extends Vue {
  @Prop({ required: true }) element!: PaperItemObject
  @Prop({ default: false }) symbolic!: boolean

  get context() {
    return {}
  }

  @Watch('context', { deep: true })
  OnContextChanged() {
    let item = $iMap.Get<PaperItemRenderer>(this.element.id)!
    item.Render(this.symbolic)
    this.$emit('draw')
  }

  @Watch('element.coordinate', { deep: true })
  OnCoordinateChanged() {
    let item = $iMap.Get<PaperItemRenderer>(this.element.id)!
    item.UpdateCoordinate()
  }

  @Watch('element.opacity')
  OnOpacityChanged() {
    let item = $iMap.Get<PaperItemRenderer>(this.element.id)!
    item.UpdateOpacity()
  }

  @Watch('element.visible')
  OnVisibleChanged() {
    let item = $iMap.Get<PaperItemRenderer>(this.element.id)!
    item.UpdateVisible()
  }

  On(type: string, event?: paper.Event) {
    this.$emit(type, event)
  }

  mounted() {
    let item = $iMap.Get<PaperItemRenderer>(this.element.id)!
    item.On((type, event) => this.On(type, event))
    item.Render(this.symbolic)
    this.$emit('draw')
  }

  beforeDestroy() {
    let item = $iMap.Get<PaperItemRenderer>(this.element.id)
    if (item) {
      item.Destroy()
    }
  }
}
