import paper from 'paper';
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape';
import { RegisterItemType } from './Item';

export interface CircleItemObject extends ShapeItemObject {
  radius: number;
}

export function CircleItem({ radius = 50, ...shape }: Partial<CircleItemObject> = {}) {
  return { radius, ...ShapeItem(CIRCLE_TYPE, shape) } as CircleItemObject;
}

export class CircleItemRenderer extends ShapeItemRenderer {
  public RenderVisual(element: CircleItemObject) {
    const circle = new paper.Path.Ellipse({
      point: [-element.radius, -element.radius],
      size: [2 * element.radius, 2 * element.radius],
      applyMatrix: false,
      insert: false,
    });
    return circle;
  }
}

const CIRCLE_TYPE = RegisterItemType(CircleItemRenderer, 'Circle');
