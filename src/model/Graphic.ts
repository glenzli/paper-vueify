import paper from 'paper'
import { PathItem } from './Path'
import { Brush$, Point$, Stroke$, Shadow$ } from 'paper-vueify-datatypes'

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
}
