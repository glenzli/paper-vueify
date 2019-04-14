import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PointObject, Point } from '@/core'

export interface PolygonItemObject extends ShapeItemObject {
  points: Array<PointObject>
}

export function RawPolygonItem({ points = [Point(-50, 50), Point(50, 50), Point(50, -50)], ...shape }: Partial<PolygonItemObject> = {}) {
  return { points, ...RawShapeItem(shape) } as PolygonItemObject
}

export class PolygonItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as PolygonItemObject
    let polygon = new paper.Path({
      segments: element.points.map(p => [p.x, p.y]),
      closed: true,
      applyMatrix: false,
      insert: false,
    })
    return polygon
  }
}

export function PolygonItem(polygon: Partial<PolygonItemObject> = {}) {
  let raw = RawPolygonItem(polygon)
  return new PolygonItemRenderer(raw).element as PolygonItemObject
}
