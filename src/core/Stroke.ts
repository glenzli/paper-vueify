import paper from 'paper'
import { Arrayex } from 'arrayex'
import { BrushObject, SolidBrush, Brush$ } from './Brush'

export enum StrokeJoin {
  Miter = 'miter',
  Round = 'round',
  Bevel = 'bevel',
}

export enum StrokeCap {
  Butt = 'butt',
  Round = 'round',
  Square = 'square',
}

export interface StrokeObject {
  brush: BrushObject
  thickness: number
  dash: Array<number>
  join: StrokeJoin
  cap: StrokeCap
  miterLimit: number
  dashOffset: number,
}

export function Stroke({ brush = SolidBrush() as BrushObject, thickness = 1, dash = [0, 0], join = StrokeJoin.Miter, cap = StrokeCap.Butt, miterLimit = 10, dashOffset = 0 } = {}): StrokeObject {
  return { brush, thickness, dash, dashOffset, join, cap, miterLimit }
}

export namespace Stroke$ {
  export function NormalizeDash(dash: Array<number> | null): Array<number> {
    if (dash == null || dash.every(d => d === 0)) {
      return [0, 0]
    } else {
      dash = Arrayex.AnalyzePeriod(dash)
      return dash!.length % 2 ? [...dash!, ...dash!] : dash!
    }
  }

  export function Interpret(stroke: StrokeObject, path: paper.PathItem) {
    let brush = Brush$.Interpret(stroke.brush, path)
    return {
      strokeColor: brush,
      strokeWidth: stroke.thickness,
      strokeCap: stroke.cap,
      strokeJoin: stroke.join,
      dashArray: stroke.dash,
      miterLimit: stroke.miterLimit,
      dashOffset: stroke.dashOffset,
    }
  }

  export function Purify(path: paper.PathItem): StrokeObject {
    let brush = Brush$.Purify(path.strokeColor as paper.Color, path)
    return Stroke({
      brush,
      thickness: path.strokeWidth,
      dash: path.dashArray || [0, 0],
      join: path.strokeJoin as StrokeJoin,
      cap: path.strokeCap as StrokeCap,
      miterLimit: path.miterLimit,
      dashOffset: path.dashOffset,
    })
  }
}
