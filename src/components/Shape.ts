import { Component, Watch, Mixins } from 'vue-property-decorator'
import { ItemMixin } from './Item'
import { $iMap, ShapeItemRenderer, ShapeItemObject } from '@/model'

@Component
export class ShapeMixin extends Mixins(ItemMixin) {
  get style() {
    let element = this.element as ShapeItemObject
    return {
      brush: element.brush,
      stroke: element.stroke,
      shadow: element.shadow,
    }
  }

  @Watch('style', { deep: true })
  OnStyleChanged() {
    let item = $iMap.Get<ShapeItemRenderer>(this.element.id)!
    item.Paint()
  }
}
