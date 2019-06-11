import paper from 'paper'
import { PathItem, PathItemObject } from './Path'
import { Brush$, Point$, Stroke$, Shadow$ } from 'paper-vueify-datatypes'
import { PaperItemObject, GetItemType, PaperItemRenderer } from './Item'

export namespace PaperGraphic$ {
  function FromSegment(segment: paper.Segment) {
    return { point: Point$.Purify(segment.point), handleIn: Point$.Purify(segment.handleIn), handleOut: Point$.Purify(segment.handleOut) }
  }

  export function From(path: paper.PathItem) {
    let brush = Brush$.Purify(path.fillColor as paper.Color, path)
    let stroke = Stroke$.Purify(path)
    let shadow = Shadow$.Purify(path)
    if (path instanceof paper.Path) {
      return PathItem({
        segments: path.segments.map(s => FromSegment(s)),
        closed: path.closed,
        brush,
        stroke,
        shadow,
      })
    } else {
      return PathItem({
        children: path.children.map(c => ({ segments: (c as paper.Path).segments.map(s => FromSegment(s)) })),
        closed: (path as paper.CompoundPath).closed,
        brush,
        stroke,
        shadow,
      })
    }
  }

  export function To(element: PaperItemObject) {
    let ctor = GetItemType(element.type)
    let renderer = new ctor!() as PaperItemRenderer
    renderer.Render(element)
    return renderer.visual
  }

  export function Unite(item1: PathItemObject, item2: PathItemObject) {
    let visual1 = To(item1) as paper.PathItem
    let visual2 = To(item2) as paper.PathItem
    return From(visual1.unite(visual2, { isnert: false }))
  }

  export function Subtract(item1: PathItemObject, item2: PathItemObject) {
    let visual1 = To(item1) as paper.PathItem
    let visual2 = To(item2) as paper.PathItem
    return From(visual1.subtract(visual2, { insert: false }))
  }

  export function Exclude(item1: PathItemObject, item2: PathItemObject) {
    let visual1 = To(item1) as paper.PathItem
    let visual2 = To(item2) as paper.PathItem
    return From(visual1.exclude(visual2, { insert: false }))
  }

  export function Divide(item1: PathItemObject, item2: PathItemObject) {
    let visual1 = To(item1) as paper.PathItem
    let visual2 = To(item2) as paper.PathItem
    return From(visual1.divide(visual2, { insert: false }))
  }
}
