import paper from 'paper';
import { ShapeItemObject, ShapeItemRenderer, ShapeItem } from './Shape';
import { RegisterItemType } from './Item';

export interface PointTextItemObject extends ShapeItemObject {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  justification: 'left' | 'center' | 'right';
  lineHeight: number;
  content: string;
}

export function PointTextItem({ fontFamily = 'arial', fontSize = 16, fontWeight = 'normal', justification = 'center', lineHeight = 1.2, content = 'Text', ...shape }: Partial<PointTextItemObject> = {}) {
  const textObject = { fontFamily, fontSize, fontWeight, justification, lineHeight, content, ...ShapeItem(POINT_TEXT_TYPE, shape) } as PointTextItemObject;
  if (!arguments[0] || !arguments[0].stroke) {
    textObject.stroke.thickness = 0;
  }
  return textObject;
}

export class PointTextItemRenderer extends ShapeItemRenderer {
  public RenderVisual(element: PointTextItemObject) {
    const pointText = new paper.PointText({
      point: [0, 0],
      content: element.content,
      fontFamily: element.fontFamily,
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
      justification: element.justification,
      applyMatrix: false,
      insert: false,
    });
    return pointText;
  }
}

const POINT_TEXT_TYPE = RegisterItemType(PointTextItemRenderer, 'PointText');
