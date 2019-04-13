import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'
import { PathContextObject } from './Path'

export interface CompoundPathItemObject extends ShapeItemObject {
  children: Array<PathContextObject>,
  closed: boolean,
}

export function RawCompoundPathItem({ children = [], closed = true, ...shape }: Partial<CompoundPathItemObject> = {}) {
  return { children, closed, ...RawShapeItem(shape) } as CompoundPathItemObject
}

export class CompoundPathItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as CompoundPathItemObject
    let path = new paper.CompoundPath({
      children: element.children.map(c => new paper.Path({ segments: c.segments, applyMatrix: true, closed: element.closed, insert: false })),
      applyMatrix: true,
      insert: false,
    })
    return path
  }
}

export function CompoundPathItem(CompoundPath: Partial<CompoundPathItemObject> = {}) {
  let raw = RawCompoundPathItem(CompoundPath)
  return new CompoundPathItemRenderer(raw).element
}
