import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape'
import { PointObject } from 'paper-vueify-datatypes'
import { RegisterItemType } from './Item'

export interface SegmentObject {
  point: PointObject,
  handleIn: PointObject,
  handleOut: PointObject,
}

export interface PathContextObject {
  segments: Array<SegmentObject>,
}

export interface PathItemObject extends ShapeItemObject {
  segments?: Array<SegmentObject>,
  children?: Array<PathContextObject>,
  closed: boolean,
}

export function PathItem({ segments = [], closed = true, ...shape }: Partial<PathItemObject> = {}) {
  return { segments, closed, ...ShapeItem(PATH_TYPE, shape) } as PathItemObject
}

export class PathItemRenderer extends ShapeItemRenderer {
  RenderVisual(element: PathItemObject) {
    if (element.children) {
      return new paper.CompoundPath({
        children: element.children.map(c => new paper.Path({ segments: c.segments, applyMatrix: false, closed: element.closed, insert: false })),
        closed: element.closed,
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
