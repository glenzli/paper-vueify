import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PointObject } from '@/core'

export interface SegmentObject {
  point: PointObject,
  handleIn: PointObject,
  handleOut: PointObject,
}

interface PathContextObject {
  segments: Array<SegmentObject>,
}

export interface PathItemObject extends ShapeItemObject {
  segments?: Array<SegmentObject>,
  children?: Array<PathContextObject>,
  closed: boolean,
}

export function RawPathItem({ segments = [], closed = true, ...shape }: Partial<PathItemObject> = {}) {
  return { segments, closed, ...RawShapeItem(shape) } as PathItemObject
}

export class PathItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as PathItemObject
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

export function PathItem(path: Partial<PathItemObject> = {}) {
  let raw = RawPathItem(path)
  return new PathItemRenderer(raw).element as PathItemObject
}
