import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PointObject, Point } from '@/core'

export interface RectangleItemObject extends ShapeItemObject {
  size: PointObject,
  corner: PointObject,
}

export function RawRectangleItem({ size = Point(100, 100), corner = Point(0, 0), ...shape }: Partial<RectangleItemObject> = {}) {
  return { size, corner, ...RawShapeItem(shape) } as RectangleItemObject
}

export class RectangleItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as RectangleItemObject
    let rectangle = new paper.Path.Rectangle({
      point: [-element.size.x / 2, -element.size.y / 2],
      size: [element.size.x, element.size.y],
      radius: [element.corner.x, element.corner.y],
      applyMatrix: false,
      insert: false,
    })
    return rectangle
  }
}

export function RectangleItem(rectangle: Partial<RectangleItemObject> = {}) {
  let raw = RawRectangleItem(rectangle)
  return new RectangleItemRenderer(raw).element as RectangleItemObject
}
