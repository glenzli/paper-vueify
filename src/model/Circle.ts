import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'

export interface CircleItemObject extends ShapeItemObject {
  radius: number,
}

export function RawCircleItem({ radius = 50, ...shape }: Partial<CircleItemObject> = {}) {
  return { radius, ...RawShapeItem(shape) } as CircleItemObject
}

export class CircleItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as CircleItemObject
    let Ellipse = new paper.Path.Ellipse({
      point: [-element.radius / 2, -element.radius / 2],
      size: [element.radius, element.radius],
      applyMatrix: true,
      insert: false,
    })
    return Ellipse
  }
}

export function CircleItem(Circle: Partial<CircleItemObject> = {}) {
  let raw = RawCircleItem(Circle)
  return new CircleItemRenderer(raw).element
}
