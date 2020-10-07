import { mixins } from 'vue-class-component';
import { Component, Watch } from 'vue-property-decorator';
import { BasicMixin } from './Basic';
import { $iMap, ShapeItemRenderer, ShapeItemObject } from '../model';

@Component
export class ShapeMixin extends mixins(BasicMixin) {
  get style() {
    const element = this.element as ShapeItemObject;
    return {
      brush: element.brush,
      stroke: element.stroke,
      shadow: element.shadow,
    };
  }

  @Watch('style', { deep: true })
  public OnStyleChanged() {
    $iMap.Get<ShapeItemRenderer>(this.rendererId)!.Paint(this.element as ShapeItemObject);
  }
}
