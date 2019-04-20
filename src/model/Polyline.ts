import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape'
import { PointObject, Point, NoneBrush } from 'paper-vueify-datatypes'
import { RegisterItemType } from './Item'

export interface PolylineItemObject extends ShapeItemObject {
  points: Array<PointObject>
}

export function PolylineItem({ points = [Point(-50, 0), Point(50, 0)], ...shape }: Partial<PolylineItemObject> = {}) {
  let polyline = { points, ...ShapeItem(POLYLINE_TYPE, shape) } as PolylineItemObject
  polyline.brush = NoneBrush()
  return polyline
}

export class PolylineItemRenderer extends ShapeItemRenderer {
  RenderVisual(element: PolylineItemObject) {
    let polyline = new paper.Path({
      segments: element.points.map(p => [p.x, p.y]),
      closed: false,
      applyMatrix: false,
      insert: false,
    })
    return polyline
  }
}

const POLYLINE_TYPE = RegisterItemType(PolylineItemRenderer, 'Polyline')
