import paper from 'paper'
import { Generic, DirectMath } from 'direct-object'

export type PointObject = { x: number, y: number }

export function Point(x = 0, y = 0): PointObject {
  return { x, y }
}

export function PolarPoint(r = 0, angle = 0): PointObject {
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) }
}

export namespace Point$ {
  export const EPSILON = 1e-3

  export function IsPointObject(item: unknown): item is PointObject {
    return (item as PointObject).x !== undefined
  }

  export function Purify(point: PointObject | number): PointObject {
    return Generic.IsNumber(point) ? Point(point, point) : Point(point.x, point.y)
  }

  export function ToPaperPoint(point: PointObject): paper.Point {
    return new paper.Point(point.x, point.y)
  }

  export function IsNormal(point: PointObject): boolean {
    return Math.abs(Length(point) - 1) < EPSILON
  }

  export function IsZero(point: PointObject, tolerance?: number): boolean {
    return Length(point) <= (tolerance != null ? tolerance : EPSILON)
  }

  export function SignedArea(points: Array<PointObject>): number {
    let last = points.length - 1
    if (last > 1) {
      let sum = points[last].x * points[0].y - points[0].x * points[last].y
      for (let i = 0; i < last; ++i) {
        sum += (points[i].x * points[i + 1].y - points[i + 1].x * points[i].y)
      }
      return sum / 2
    }
    return 0
  }

  export function IsClockwise(points: Array<PointObject>): boolean {
    return SignedArea(points) < 0
  }

  export function Clockwised(points: Array<PointObject>): Array<PointObject> {
    return IsClockwise(points) ? points : points.reverse()
  }

  export function CounterClockwised(points: Array<PointObject>): Array<PointObject> {
    return IsClockwise(points) ? points.reverse() : points
  }

  export function Polar(length: number, angle: number): PointObject {
    return Point(length * Math.cos(angle), length * Math.sin(angle))
  }

  export function Angle(point: PointObject): number {
    return Math.atan2(point.y , point.x)
  }

  export function Length(point: PointObject): number {
    return Math.sqrt(point.x * point.x + point.y * point.y)
  }

  export function Add(...points: Array<PointObject | number>): PointObject {
    return DirectMath.Add(Purify(points[0]), ...points.slice(1))
  }

  export function Subtract(...points: Array<PointObject | number>): PointObject {
    return DirectMath.Subtract(Purify(points[0]), ...points.slice(1))
  }

  export function Multiply(...points: Array<PointObject | number>): PointObject {
    return DirectMath.Multiply(Purify(points[0]), ...points.slice(1))
  }

  export function Divide(...points: Array<PointObject | number>): PointObject {
    return DirectMath.Divide(Purify(points[0]), ...points.slice(1))
  }

  export function Distance(p1: PointObject, p2: PointObject): number {
    return Length(Subtract(p1, p2))
  }

  export function DistanceToLine(point: PointObject, lp1: PointObject, lp2: PointObject): number {
    let length = Distance(lp1, lp2)
    return length > 0 ? Math.abs((lp2.y - lp1.y) * point.x - (lp2.x - lp1.x) * point.y + lp2.x * lp1.y - lp2.y * lp1.x) / length : Distance(point, lp1)
  }

  export function CubicBezier(p0: PointObject, p1: PointObject, p2: PointObject, p3: PointObject, t: number): PointObject {
    let tr = 1 - t
    let f0 = Multiply(p0, tr * tr * tr)
    let f1 = Multiply(p1, 3 * tr * tr * t)
    let f2 = Multiply(p2, 3 * tr * t * t)
    let f3 = Multiply(p3, t * t * t)
    return Add(f0, f1, f2, f3)
  }

  export function Intersection(p1: PointObject, p2: PointObject, p3: PointObject, p4: PointObject): PointObject {
    let l1 = Subtract(p1, p2)
    let l2 = Subtract(p3, p4)
    let dl1 = Det(p1, p2)
    let dl2 = Det(p3, p4)
    return Multiply(Point(dl1 * l2.x - l1.x * dl2, dl1 * l2.y - l1.y * dl2), 1 / Det(l1, l2))
  }

  export function Det(p1: PointObject, p2: PointObject): number {
    return p1.x * p2.y - p1.y * p2.x
  }

  export function Dot(p1: PointObject, p2: PointObject): number {
    return p1.x * p2.x + p1.y * p2.y
  }

  /** Directinal angle from p1 to p2 */
  export function IncludedAngle(p1: PointObject, p2: PointObject): number {
    return Math.atan2(Det(p1, p2), Dot(p1, p2))
  }

  /** Angle of two lines: p1 and p2, in [0, π/2] */
  export function LineAngle(p1: PointObject, p2: PointObject): number {
    let angle = Math.abs(IncludedAngle(p1, p2))
    return Math.min(angle, Math.PI - angle)
  }

  /** Bound in length */
  export function Bound(point: PointObject, min: number, max: number): PointObject {
    let length = DirectMath.bound(Length(point), min, max)
    return Polar(length, Angle(point))
  }

  export function XYBound(point: PointObject, min: number, max: number): PointObject {
    return DirectMath.Bound<PointObject>(point, min, max)
  }

  export function Rotate(point: PointObject, angle: number, pivot: PointObject = Point()): PointObject {
    let dp = Subtract(point, pivot)
    let r = Point(Math.sin(angle), Math.cos(angle))
    return Add(Point(Det(dp, r), Dot(dp, r)), pivot)
  }

  export function Scale(point: PointObject, scale: PointObject | number, pivot: PointObject = Point()): PointObject {
    return Add(Multiply(Subtract(point, pivot), scale), pivot)
  }

  export function Normalize(point: PointObject) {
    let length = Length(point)
    return Point(point.x / length, point.y / length)
  }

  export function Project(point: PointObject, ref: PointObject) {
    let normal = Normalize(ref)
    return Multiply(normal, Dot(point, normal))
  }
}
