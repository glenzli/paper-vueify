import paper from 'paper'
import { Generic } from 'direct-object'
import { Point, PointObject, Point$ } from './Point'
import { Color, Colorstop, Color$, ColorObject, ColorstopObject } from './Color'

export enum BrushType { None = 0, Solid, Linear, Radial }

export interface NoneBrushObject { type: BrushType }
export interface SolidBrushObject { type: BrushType, color: ColorObject }
export interface GradientBrushObject { type: BrushType, start: PointObject, end: PointObject, colorstops: Array<ColorstopObject>, bias?: PointObject }
export type BrushObject = NoneBrushObject | SolidBrushObject | GradientBrushObject

export function NoneBrush(): NoneBrushObject {
  return { type: BrushType.None }
}

export function SolidBrush(color = Color()): SolidBrushObject {
  return { type: BrushType.Solid, color }
}

export function LinearBrush({ start = Point(), end = Point(1, 0), colorstops = [Colorstop(), Colorstop(1, Color(1, 1, 1))] } = {}): GradientBrushObject {
  return { type: BrushType.Linear, start, end, colorstops }
}

export function RadialBrush({ start = Point(0.5, 0.5), end = Point(1, 1), bias = Point(0, 0), colorstops = [Colorstop(), Colorstop(1, Color(1, 1, 1))] } = {}): GradientBrushObject {
  return { type: BrushType.Radial, start, end, bias, colorstops }
}

export namespace Brush$ {
  export function ToCss(brush: BrushObject): string {
    switch (brush.type) {
      case BrushType.None: return 'transparent'
      case BrushType.Solid: return Color$.ToCss((brush as SolidBrushObject).color)
      default:
        let gradients = (brush as GradientBrushObject).colorstops.map(c => `${Color$.ToCss(c.color)} ${c.offset * 100}%`).join(',')
        if (brush.type === BrushType.Linear) {
          return `linear-gradient(0, ${gradients})`
        } else {
          return `radial-gradient(circle, ${gradients})`
        }
    }
  }

  export function ToSolid(brush: BrushObject): SolidBrushObject | null {
    switch (brush!.type) {
      case BrushType.None: return SolidBrush(Color(0, 0, 0, 0))
      case BrushType.Solid: return brush as SolidBrushObject
      default: return null
    }
  }

  export function ToGradient<T extends GradientBrushObject>(brush: BrushObject, reference: T): T | null {
    if (brush!.type <= BrushType.Solid) {
      let gradient = Generic.Clone(reference)
      let color = brush.type === BrushType.None ? Color(0, 0, 0, 0) : (brush as SolidBrushObject).color
      gradient.colorstops.forEach(c => { c.color = color })
      return gradient
    } else {
      return brush.type === reference.type ? brush as T : null
    }
  }

  /** interpret graident on paper.PathItem */
  export function Interpret(brush: BrushObject, path: paper.PathItem): paper.Color | null {
    switch (brush!.type) {
      case BrushType.None: return null
      case BrushType.Solid:
        let color = (brush as SolidBrushObject).color
        return new paper.Color(color.red, color.green, color.blue, color.alpha)
      default:
        let gbrush = brush as GradientBrushObject
        // convert to paper.js style gradient
        let gradient = new paper.Gradient(gbrush.colorstops.map(c => new paper.GradientStop(Color$.Interpret(c.color), c.offset)), brush.type === BrushType.Radial)
        // convert to paper.js style origin/destination/highlight structure (which is path dependent)
        let { point, size } = path!.bounds
        let psize = Point(size.width, size.height)
        let origin = Point$.ToPaperPoint(Point$.Add(Point$.Multiply(gbrush.start, psize), point))
        let destination = Point$.ToPaperPoint(Point$.Add(Point$.Multiply(gbrush.end, psize), point))
        let highlight = gbrush.bias ? Point$.ToPaperPoint(Point$.Add(origin, Point$.Multiply(psize, gbrush.bias))) : undefined
        return new paper.Color(gradient, origin, destination, highlight)
    }
  }

  export function Purify(color: paper.Color, path: paper.PathItem): BrushObject {
    if (color != null) {
      if (color.gradient != null) {
        let colorstops = color.gradient.stops.map(s => Colorstop(s.offset, Color$.Purify(s.color)))
        let { point, size } = path!.bounds
        let psize = new paper.Point(size.width, size.height)
        let start = Point$.Purify(color.origin!.subtract(point).divide(psize))
        let end = Point$.Purify(color.destination!.subtract(point).divide(psize))
        if (color.gradient.radial) {
          let bias = color.highlight ? Point$.Purify(color.highlight.subtract(color.origin!).divide(psize)) : Point()
          return RadialBrush({ start, end, bias, colorstops })
        } else {
          return LinearBrush({ start, end, colorstops })
        }
      } else {
        return SolidBrush(Color$.Purify(color))
      }
    }
    return NoneBrush()
  }

  export function Validate(brush: BrushObject) {
    if (Object.values(brush).some(prop => prop == null)) {
      brush.type = BrushType.None
    }
  }
}
