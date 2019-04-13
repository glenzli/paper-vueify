import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PointObject } from '@/core'

export interface SegmentObject {
  point: PointObject,
  handleIn: PointObject,
  handleOut: PointObject,
}

export interface PathContextObject {
  segments: Array<SegmentObject>,
}

export interface PathItemObject extends ShapeItemObject, PathContextObject {
  closed: boolean,
}

export function RawPathItem({ segments = [], closed = true, ...shape }: Partial<PathItemObject> = {}) {
  return { segments, closed, ...RawShapeItem(shape) } as PathItemObject
}

export class PathItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as PathItemObject
    let Path = new paper.Path({
      segments: element.segments,
      applyMatrix: true,
      insert: false,
    })
    return Path
  }
}

export function PathItem(Path: Partial<PathItemObject> = {}) {
  let raw = RawPathItem(Path)
  return new PathItemRenderer(raw).element
}
