import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape'
import { PointObject, Point } from 'paper-vueify-datatypes'
import { RegisterItemType } from './Item'

export interface RectangleItemObject extends ShapeItemObject {
  size: PointObject,
  radius: PointObject,
}

export function RectangleItem({ size = Point(100, 100), radius = Point(0, 0), ...shape }: Partial<RectangleItemObject> = {}) {
  return { size, radius, ...ShapeItem(RECTANGLE_TYPE, shape) } as RectangleItemObject
}

export class RectangleItemRenderer extends ShapeItemRenderer {
  RenderVisual(element: RectangleItemObject) {
    let rectangle = new paper.Path.Rectangle({
      point: [-element.size.x / 2, -element.size.y / 2],
      size: [element.size.x, element.size.y],
      radius: [element.radius.x, element.radius.y],
      applyMatrix: false,
      insert: false,
    })
    return rectangle
  }
}

const RECTANGLE_TYPE = RegisterItemType(RectangleItemRenderer, 'Rectangle')
