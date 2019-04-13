import paper from 'paper'
import { ShapeItemObject, ShapeItemRenderer, RawShapeItem } from './Shape'

export interface PointTextItemObject extends ShapeItemObject {
  fontFamily: string,
  fontSize: number,
  fontWeight: string,
  justification: 'left' | 'center' | 'right',
  lineHeight: number,
  content: string,
}

export function RawPointTextItem({ fontFamily = 'arial', fontSize = 16, fontWeight = 'normal', justification = 'center', lineHeight = 1.2, content = 'Text', ...shape }: Partial<PointTextItemObject> = {}) {
  let textObject = { fontFamily, fontSize, fontWeight, justification, lineHeight, content, ...RawShapeItem(shape) } as PointTextItemObject
  if (!arguments[0] || !arguments[0].stroke) {
    textObject.stroke.thickness = 0
  }
  return textObject
}

export class PointTextItemRenderer extends ShapeItemRenderer {
  RenderVisual() {
    let element = this._element as PointTextItemObject
    let PointText = new paper.PointText({
      point: [0, 0],
      content: element.content,
      fontFamily: element.fontFamily,
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
      justification: element.justification,
      applyMatrix: true,
      insert: false,
    })
    return PointText
  }
}

export function PointTextItem(PointText: Partial<PointTextItemObject> = {}) {
  let raw = RawPointTextItem(PointText)
  return new PointTextItemRenderer(raw).element
}
