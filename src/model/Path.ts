import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape'
import { PointObject, Point } from 'paper-vueify-datatypes'
import { RegisterItemType } from './Item'

export interface SegmentObject {
  point: PointObject,
  handleIn: PointObject,
  handleOut: PointObject,
}

export function Segment(point: PointObject = Point(0, 0), { handleIn, handleOut }: { handleIn?: PointObject, handleOut?: PointObject } = {}) {
  return { point, handleIn: handleIn || Point(0, 0), handleOut: handleOut || Point(0, 0) } as SegmentObject
}

export interface PathContextObject {
  segments: Array<SegmentObject>,
  closed?: boolean,
}

export interface PathItemObject extends ShapeItemObject {
  segments?: Array<SegmentObject>,
  children?: Array<PathContextObject>,
  closed: boolean,
}

export function PathItem({ segments = [], children, closed = true, ...shape }: Partial<PathItemObject> = {}) {
  return { segments: children ? undefined : segments, children, closed, ...ShapeItem(PATH_TYPE, shape) } as PathItemObject
}

export class PathItemRenderer extends ShapeItemRenderer {
  RenderVisual(element: PathItemObject) {
    if (element.children) {
      return new paper.CompoundPath({
        children: element.children.map(c => new paper.Path({ segments: c.segments, applyMatrix: false, closed: c.closed !== undefined ? c.closed : element.closed, insert: false })),
        applyMatrix: false,
        insert: false,
      })
    } else {
      return new paper.Path({
        segments: element.segments,
        closed: element.closed,
        applyMatrix: false,
        insert: false,
      })
    }
  }
}

const PATH_TYPE = RegisterItemType(PathItemRenderer, 'Path')
