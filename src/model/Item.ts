import paper from 'paper';
import { CoordinateObject, Coordinate, Coordinate$ } from 'paper-vueify-datatypes';
import { $iMap } from './IMap';

export interface PaperItemObject {
  type: number;
  coordinate: CoordinateObject;
  opacity: number;
  visible: boolean;
  selectable: boolean;
}

export function PaperItem(type: number, { coordinate = Coordinate(), opacity = 1, visible = true, selectable = true }: Partial<PaperItemObject> = {}) {
  return { type, coordinate, opacity, visible, selectable } as PaperItemObject;
}

export class PaperItemRenderer {

  get id() {
    return this._id;
  }

  get visual() {
    return this._visual;
  }

  get selectable() {
    return this._selectable;
  }

  set selectable(value: boolean) {
    this._selectable = value;
  }

  get selected() {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    this._visual.selected = this._selected;
  }
  protected _id: number;
  protected _visual!: paper.Item;
  protected _on: ((type: string, event?: paper.MouseEvent) => void) | null = null;
  protected _selectable = false;
  protected _selected = false;

  constructor() {
    this._id = $iMap.New(this);
    if (paper.view) {
      this.InitVisual();
    }
  }

  public On(on: (type: string, event?: paper.MouseEvent) => void) {
    this._on = on;
  }

  public Render(element: PaperItemObject) {
    this._selectable = element.selectable;
    this.ReplaceVisual(this.RenderVisual(element));
    this._visual.selected = this._selected;
    this.UpdateCoordinate(element.coordinate);
    this.UpdateOpacity(element.opacity);
    this.UpdateVisible(element.visible);
  }

  public UpdateCoordinate(coordinate: CoordinateObject) {
    this._visual.matrix = Coordinate$.ToMatrix(coordinate);
  }

  public UpdateOpacity(opacity: number) {
    this._visual.opacity = opacity;
  }

  public UpdateVisible(visible: boolean) {
    this._visual.visible = visible;
  }

  public Destroy() {
    this._visual.remove();
    $iMap.Delete(this._id);
  }

  protected InitVisual() {
    this._visual = new paper.Path({ applyMatrix: false });
  }

  protected RenderVisual(element: PaperItemObject): paper.Item | null {
    return new paper.Path({ applyMatrix: false });
  }

  protected Hook() {
    if (this._on != null) {
      this._visual.onClick = (event: paper.MouseEvent) => {
        if (this._selectable && this._visual.parent instanceof paper.Layer) {
          this.selected = !this._selected;
        }
        this._on!('click', event);
      };
      this._visual.onDoubleClick = (event: paper.MouseEvent) => { this._on!('doubleclick', event); };
      this._visual.onMouseDown = (event: paper.MouseEvent) => { this._on!('mousedown', event); };
      this._visual.onMouseDrag = (event: paper.MouseEvent) => { this._on!('mousedrag', event); };
      this._visual.onMouseEnter = (event: paper.MouseEvent) => { this._on!('mouseenter', event); };
      this._visual.onMouseLeave = (event: paper.MouseEvent) => { this._on!('mouseleave', event); };
      this._visual.onMouseMove = (event: paper.MouseEvent) => { this._on!('mousemove', event); };
      this._visual.onMouseUp = (event: paper.MouseEvent) => { this._on!('mouseup', event); };
    }
  }

  protected ReplaceVisual(visual: paper.Item | null) {
    if (!this._visual || !this._visual.parent) {
      this.InitVisual();
    }
    if (visual) {
      this._visual.replaceWith(visual);
      this._visual.remove();
      this._visual = visual;
      this.Hook();
    }
  }
}


let ITEM_TYPE = 0;
const ITEM_MAP = new Map<number, string>();
const ITEM_TYPE_MAP = new Map<number, new() => any>();

export function RegisterItemType(type: new() => any, typename: string) {
  ITEM_MAP.set(ITEM_TYPE, typename);
  ITEM_TYPE_MAP.set(ITEM_TYPE, type);
  return ITEM_TYPE++;
}

export function GetItemTypename(type: number) {
  return ITEM_MAP.get(type);
}

export function GetItemType(type: number) {
  return ITEM_TYPE_MAP.get(type);
}
