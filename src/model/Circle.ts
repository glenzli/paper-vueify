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
    let circle = new paper.Path.Ellipse({
      point: [-element.radius, -element.radius],
      size: [2 * element.radius, 2 * element.radius],
      applyMatrix: false,
      insert: false,
    })
    return circle
  }
}

export function CircleItem(circle: Partial<CircleItemObject> = {}) {
  let raw = RawCircleItem(circle)
  return new CircleItemRenderer(raw).element as CircleItemObject
}
