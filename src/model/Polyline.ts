import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PointObject, Point, NoneBrush } from '@/core'

export interface PolylineItemObject extends ShapeItemObject {
  points: Array<PointObject>
}

export function RawPolylineItem({ points = [Point(-50, 0), Point(50, 0)], ...shape }: Partial<PolylineItemObject> = {}) {
  let polyline = { points, ...RawShapeItem(shape) } as PolylineItemObject
  polyline.brush = NoneBrush()
  return polyline
}

export class PolylineItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as PolylineItemObject
    let polyline = new paper.Path({
      segments: element.points.map(p => [p.x, p.y]),
      closed: false,
      applyMatrix: false,
      insert: false,
    })
    return polyline
  }
}

export function PolylineItem(polyline: Partial<PolylineItemObject> = {}) {
  let raw = RawPolylineItem(polyline)
  return new PolylineItemRenderer(raw).element as PolylineItemObject
}
