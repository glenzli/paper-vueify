import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'

export interface RegularPolygonItemObject extends ShapeItemObject {
  radius: number,
  sides: number,
}

export function RawRegularPolygonItem({ radius = 50, sides = 5, ...shape }: Partial<RegularPolygonItemObject> = {}) {
  return { radius, sides, ...RawShapeItem(shape) } as RegularPolygonItemObject
}

export class RegularPolygonItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as RegularPolygonItemObject
    let regularPolygon = new paper.Path.RegularPolygon({
      center: [0, 0],
      sides: element.sides,
      radius: element.radius,
      applyMatrix: false,
      insert: false,
    })
    return regularPolygon
  }
}

export function RegularPolygonItem(regularPolygon: Partial<RegularPolygonItemObject> = {}) {
  let raw = RawRegularPolygonItem(regularPolygon)
  return new RegularPolygonItemRenderer(raw).element as RegularPolygonItemObject
}
