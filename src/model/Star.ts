import paper from 'paper';
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape';
import { RegisterItemType } from './Item';

export interface StarItemObject extends ShapeItemObject {
  radius1: number;
  radius2: number;
  points: number;
}

export function StarItem({ radius1 = 50, radius2 = 30, points = 5, ...shape }: Partial<StarItemObject> = {}) {
  return { radius1, radius2, points, ...ShapeItem(STAR_TYPE, shape) } as StarItemObject;
}

export class StarItemRenderer extends ShapeItemRenderer {
  public RenderVisual(element: StarItemObject) {
    const star = new paper.Path.Star({
      center: [0, 0],
      points: element.points,
      radius1: element.radius1,
      radius2: element.radius2,
      applyMatrix: false,
      insert: false,
    });
    return star;
  }
}

const STAR_TYPE = RegisterItemType(StarItemRenderer, 'Star');
