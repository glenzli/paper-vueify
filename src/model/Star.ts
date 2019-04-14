import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'

export interface StarItemObject extends ShapeItemObject {
  radius1: number,
  radius2: number,
  points: number,
}

export function RawStarItem({ radius1 = 50, radius2 = 30, points = 5, ...shape }: Partial<StarItemObject> = {}) {
  return { radius1, radius2, points, ...RawShapeItem(shape) } as StarItemObject
}

export class StarItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as StarItemObject
    let star = new paper.Path.Star({
      center: [0, 0],
      points: element.points,
      radius1: element.radius1,
      radius2: element.radius2,
      applyMatrix: false,
      insert: false,
    })
    return star
  }
}

export function StarItem(star: Partial<StarItemObject> = {}) {
  let raw = RawStarItem(star)
  return new StarItemRenderer(raw).element as StarItemObject
}
