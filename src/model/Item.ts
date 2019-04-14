import paper from 'paper'
import { CoordinateObject, Coordinate, Coordinate$ } from '@/core'
import { $iMap } from './IMap'

export interface PaperItemObject {
  id: number,
  coordinate: CoordinateObject,
  opacity: number,
  visible: boolean,
}

export function RawPaperItem({ coordinate = Coordinate(), opacity = 1, visible = true }: Partial<PaperItemObject> = {}) {
  return { id: -1, coordinate, opacity, visible } as PaperItemObject
}

export class PaperItemRenderer {
  protected _element: PaperItemObject
  protected _visual!: paper.Item
  protected _symbolic: boolean = false
  protected _symbol!: paper.Symbol
  protected _on: ((type: string, event?: paper.MouseEvent) => void) | null = null

  constructor(element: PaperItemObject) {
    this._element = element
    this._element.id = $iMap.New(this)
    if (paper.view) {
      this._visual = new paper.Path()
      this._symbol = new paper.Symbol(new paper.Path())
    }
  }

  get id() {
    return this._element.id
  }

  get element() {
    return this._element
  }

  get visual() {
    return this._visual
  }

  get symoblic() {
    return this._symbolic
  }

  get symbol() {
    return this._symbol
  }

  protected RenderVisual(): paper.Item | null {
    return new paper.Path()
  }

  protected Hook() {
    if (this._on != null) {
      this._visual.onClick = event => { this._on!('click', event) }
      this._visual.onDoubleClick = event => { this._on!('doubleclick', event) }
      this._visual.onMouseDown = event => { this._on!('mousedown', event) }
      this._visual.onMouseDrag = event => { this._on!('mousedrag', event) }
      this._visual.onMouseEnter = event => { this._on!('mouseenter', event) }
      this._visual.onMouseLeave = event => { this._on!('mouseleave', event) }
      this._visual.onMouseMove = event => { this._on!('mousemove', event) }
      this._visual.onMouseUp = event => { this._on!('mouseup', event) }
    }
  }

  On(on: (type: string, event?: paper.MouseEvent) => void) {
    this._on = on
  }

  protected ReplaceVisual(visual: paper.Item | null) {
    if (!this._visual || !this._visual.parent) {
      this._visual = new paper.Path()
      this._symbol = new paper.Symbol(new paper.Path())
    }
    if (visual) {
      this._visual.replaceWith(visual)
      this._visual.remove()
      this._visual = visual
      this.Hook()
    }
    if (this._symbolic) {
      this._symbol.definition = this._visual
    } else {
      this._symbol.definition = new paper.Path()
    }
  }

  Render(symbolic: boolean = false) {
    this._symbolic = symbolic
    this.ReplaceVisual(this.RenderVisual())
    this.UpdateCoordinate()
    this.UpdateOpacity()
    this.UpdateVisible()
  }

  UpdateCoordinate() {
    this._visual.matrix = Coordinate$.ToMatrix(this._element.coordinate)
  }

  UpdateOpacity() {
    this._visual.opacity = this._element.opacity
  }

  UpdateVisible() {
    this._visual.visible = this._element.visible
  }

  Destroy() {
    this._visual.remove()
    $iMap.Delete(this._element.id)
  }
}
