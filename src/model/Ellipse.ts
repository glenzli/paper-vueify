import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape'
import { PointObject, Point } from 'paper-vueify-datatypes'
import { RegisterItemType } from './Item'

export interface EllipseItemObject extends ShapeItemObject {
  size: PointObject,
}

export function EllipseItem({ size = Point(100, 100), ...shape }: Partial<EllipseItemObject> = {}) {
  return { size, ...ShapeItem(ELLIPSE_TYPE, shape) } as EllipseItemObject
}

export class EllipseItemRenderer extends ShapeItemRenderer {
  RenderVisual(element: EllipseItemObject) {
    let ellipse = new paper.Path.Ellipse({
      point: [-element.size.x / 2, -element.size.y / 2],
      size: [element.size.x, element.size.y],
      applyMatrix: false,
      insert: false,
    })
    return ellipse
  }
}

const ELLIPSE_TYPE = RegisterItemType(EllipseItemRenderer, 'Ellipse')
