import { Matrix } from 'paper'
import { PointObject, Point$, Point } from './Point'
import { DirectMath } from 'direct-object'

export type CoordinateObject = {
  position: PointObject
  scale: PointObject
  rotation: number
  skewX: number,
}

export function Coordinate({ position = Point(), scale = Point(1, 1), rotation = 0, skewX = 0 } = {}) {
  return { position, scale, rotation, skewX }
}

export namespace Coordinate$ {
  export const EPSILON_ANGLE = 1e-2 / 180 * Math.PI

  export function IsCoordinate(item: unknown): item is CoordinateObject {
    return (item as CoordinateObject).skewX !== undefined
  }

  export function ToMatrix(coordinate: CoordinateObject): Matrix {
    let cr = Math.cos(coordinate.rotation)
    let sr = Math.sin(coordinate.rotation)
    let skew = Math.tan(coordinate.skewX)
    let a = coordinate.scale.x * cr
    let b = coordinate.scale.x * sr
    let c = (cr * skew - sr) * coordinate.scale.y
    let d = (sr * skew + cr) * coordinate.scale.y
    return new Matrix(a, b, c, d, coordinate.position.x, coordinate.position.y)
  }

  export function ToCoordinate(matrix: Matrix): CoordinateObject {
    let seq = matrix.values
    let rotation = Math.atan2(seq[1], seq[0])
    let sx = Math.sqrt(seq[0] * seq[0] + seq[1] * seq[1])
    let c0312 = seq[0] * seq[3] - seq[1] * seq[2]
    let sy = c0312 / sx
    let skewX = Math.atan2(seq[0] * seq[2] + seq[1] * seq[3], c0312)
    return Coordinate({ position: Point(seq[4], seq[5]), scale: Point(sx, sy), rotation, skewX })
  }

  export function Add(...coordinates: Array<CoordinateObject>): CoordinateObject {
    let position = Point$.Add(...coordinates.map(c => c.position))
    let scale = Point$.Multiply(...coordinates.map(c => c.scale))
    let rotation = DirectMath.sum(...coordinates.map(c => c.rotation))
    let skewX = DirectMath.sum(...coordinates.map(c => c.skewX))
    return Coordinate({ position, scale, rotation, skewX })
  }

  export function Multiply(...coordinates: Array<CoordinateObject>): CoordinateObject {
    let matrix = coordinates.map(c => ToMatrix(c)).reduce((m1, m2) => m1.append(m2))
    return ToCoordinate(matrix)
  }

  export function Invert(coordinate: CoordinateObject): CoordinateObject {
    return ToCoordinate(ToMatrix(coordinate).invert())
  }

  export function IsIdentity(coordinate: CoordinateObject): boolean {
    return Math.abs(coordinate.rotation) < EPSILON_ANGLE && Math.abs(coordinate.skewX) < EPSILON_ANGLE && Point$.IsZero(coordinate.position) && Point$.IsNormal(coordinate.scale)
  }
}
