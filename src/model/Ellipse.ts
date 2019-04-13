import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PointObject, Point, Stroke } from '@/core'

export interface EllipseItemObject extends ShapeItemObject {
  size: PointObject,
}

export function RawEllipseItem({ size = Point(100, 100), ...shape }: Partial<EllipseItemObject> = {}) {
  return { size, ...RawShapeItem(shape) } as EllipseItemObject
}

export class EllipseItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as EllipseItemObject
    let Ellipse = new paper.Path.Ellipse({
      point: [-element.size.x / 2, -element.size.y / 2],
      size: [element.size.x, element.size.y],
      applyMatrix: true,
      insert: false,
    })
    return Ellipse
  }
}

export function EllipseItem(Ellipse: Partial<EllipseItemObject> = {}) {
  let raw = RawEllipseItem(Ellipse)
  return new EllipseItemRenderer(raw).element
}
