import paper from 'paper';
import { PaperItemObject, PaperItem, PaperItemRenderer } from './Item';
import { BrushObject, StrokeObject, ShadowObject, Stroke$, Brush$, Shadow$, SolidBrush, Stroke, Shadow } from 'paper-vueify-datatypes';

export interface ShapeItemObject extends PaperItemObject {
  brush: BrushObject;
  stroke: StrokeObject;
  shadow: ShadowObject;
}

export function ShapeItem(type: number, { brush = SolidBrush(), stroke = Stroke(), shadow = Shadow(), ...item }: Partial<ShapeItemObject> = {}) {
  return { brush, stroke, shadow, ...PaperItem(type, item) } as ShapeItemObject;
}

export class ShapeItemRenderer extends PaperItemRenderer {

  public Paint(element: ShapeItemObject) {
    const props = this.CompileStyle(element);
    this._visual.set(props);
  }

  public Render(element: ShapeItemObject) {
    super.Render(element);
    this.Paint(element);
  }
  protected CompileStyle(element: ShapeItemObject) {
    const visual = this._visual as paper.PathItem;
    const props = {};
    Object.assign(props, Stroke$.Interpret(element.stroke, visual));
    Object.assign(props, { fillColor: Brush$.Interpret(element.brush, visual) });
    Object.assign(props, Shadow$.Interpret(element.shadow));
    return props;
  }
}
