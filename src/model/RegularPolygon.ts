import paper from 'paper';
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape';
import { RegisterItemType } from './Item';

export interface RegularPolygonItemObject extends ShapeItemObject {
  radius: number;
  sides: number;
}

export function RegularPolygonItem({ radius = 50, sides = 5, ...shape }: Partial<RegularPolygonItemObject> = {}) {
  return { radius, sides, ...ShapeItem(REGULAR_POLYGON_TYPE, shape) } as RegularPolygonItemObject;
}

export class RegularPolygonItemRenderer extends ShapeItemRenderer {
  public RenderVisual(element: RegularPolygonItemObject) {
    const regularPolygon = new paper.Path.RegularPolygon({
      center: [0, 0],
      sides: element.sides,
      radius: element.radius,
      applyMatrix: false,
      insert: false,
    });
    return regularPolygon;
  }
}

const REGULAR_POLYGON_TYPE = RegisterItemType(RegularPolygonItemRenderer, 'RegularPolygon');
