import paper from 'paper'
import { PaperItemObject, PaperItem, PaperItemRenderer } from './Item'
import { BrushObject, StrokeObject, ShadowObject, Stroke$, Brush$, Shadow$, SolidBrush, Stroke, Shadow } from 'paper-vueify-datatypes'

export interface ShapeItemObject extends PaperItemObject {
  brush: BrushObject,
  stroke: StrokeObject,
  shadow: ShadowObject,
}

export function ShapeItem(type: number, { brush = SolidBrush(), stroke = Stroke(), shadow = Shadow(), ...item }: Partial<ShapeItemObject> = {}) {
  return { brush, stroke, shadow, ...PaperItem(type, item) } as ShapeItemObject
}

export class ShapeItemRenderer extends PaperItemRenderer {
  protected CompileStyle(element: ShapeItemObject) {
    let visual = this._visual as paper.PathItem
    let props = {}
    Object.assign(props, Stroke$.Interpret(element.stroke, visual))
    Object.assign(props, { fillColor: Brush$.Interpret(element.brush, visual) })
    Object.assign(props, Shadow$.Interpret(element.shadow))
    return props
  }

  Paint(element: ShapeItemObject) {
    let props = this.CompileStyle(element)
    this._visual.set(props)
  }

  Render(element: ShapeItemObject) {
    super.Render(element)
    this.Paint(element)
  }
}
