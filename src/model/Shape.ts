import paper from 'paper'
import { PaperItemObject, RawPaperItem, PaperItemRenderer } from './Item'
import { BrushObject, StrokeObject, ShadowObject, Stroke$, Brush$, Shadow$, SolidBrush, Stroke, Shadow } from '@/core'

export interface ShapeItemObject extends PaperItemObject {
  brush: BrushObject,
  stroke: StrokeObject,
  shadow: ShadowObject,
}

export function RawShapeItem({ brush = SolidBrush(), stroke = Stroke(), shadow = Shadow(), ...item }: Partial<ShapeItemObject> = {}) {
  return { brush, stroke, shadow, ...RawPaperItem(item) } as ShapeItemObject
}


export class ShapeItemRenderer extends PaperItemRenderer {
  protected CompileStyle() {
    let visual = this._visual as paper.PathItem
    let element = this._element as ShapeItemObject
    let props = {}
    Object.assign(props, Stroke$.Interpret(element.stroke, visual))
    Object.assign(props, { fillColor: Brush$.Interpret(element.brush, visual) })
    Object.assign(props, Shadow$.Interpret(element.shadow))
    return props
  }

  Paint() {
    let props = this.CompileStyle()
    this._visual.set(props)
  }

  Render() {
    super.Render()
    this.Paint()
  }
}
