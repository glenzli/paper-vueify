import paper from 'paper';
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape';
import { PointObject, Point } from 'paper-vueify-datatypes';
import { RegisterItemType } from './Item';

export interface PolygonItemObject extends ShapeItemObject {
  points: PointObject[];
}

export function PolygonItem({ points = [Point(-50, 50), Point(50, 50), Point(50, -50)], ...shape }: Partial<PolygonItemObject> = {}) {
  return { points, ...ShapeItem(POLYGON_TYPE, shape) } as PolygonItemObject;
}

export class PolygonItemRenderer extends ShapeItemRenderer {
  public RenderVisual(element: PolygonItemObject) {
    const polygon = new paper.Path({
      segments: element.points.map((p) => [p.x, p.y]),
      closed: true,
      applyMatrix: false,
      insert: false,
    });
    return polygon;
  }
}

const POLYGON_TYPE = RegisterItemType(PolygonItemRenderer, 'Polygon');
