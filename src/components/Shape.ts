import { Component, Watch, Mixins } from 'vue-property-decorator'
import { BasicMixin } from './Basic'
import { $iMap, ShapeItemRenderer, ShapeItemObject } from '../model'

@Component
export class ShapeMixin extends Mixins(BasicMixin) {
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
    $iMap.Get<ShapeItemRenderer>(this.rendererId)!.Paint(this.element as ShapeItemObject)
  }
}
