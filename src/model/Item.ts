import paper from 'paper'
import { CoordinateObject, Coordinate, Coordinate$ } from '@/core'
import { $iMap } from './IMap'

export interface PaperItemObject {
  type: number,
  coordinate: CoordinateObject,
  opacity: number,
  visible: boolean,
}

export function PaperItem(type: number, { coordinate = Coordinate(), opacity = 1, visible = true }: Partial<PaperItemObject> = {}) {
  return { type, coordinate, opacity, visible } as PaperItemObject
}

export class PaperItemRenderer {
  protected _id: number
  protected _visual!: paper.Item
  protected _on: ((type: string, event?: paper.MouseEvent) => void) | null = null

  constructor() {
    this._id = $iMap.New(this)
    if (paper.view) {
      this.InitVisual()
    }
  }

  protected InitVisual() {
    this._visual = new paper.Path()
  }

  get id() {
    return this._id
  }

  get visual() {
    return this._visual
  }

  protected RenderVisual(element: PaperItemObject): paper.Item | null {
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
      this.InitVisual()
    }
    if (visual) {
      this._visual.replaceWith(visual)
      this._visual.remove()
      this._visual = visual
      this.Hook()
    }
  }

  Render(element: PaperItemObject) {
    this.ReplaceVisual(this.RenderVisual(element))
    this.UpdateCoordinate(element.coordinate)
    this.UpdateOpacity(element.opacity)
    this.UpdateVisible(element.visible)
  }

  UpdateCoordinate(coordinate: CoordinateObject) {
    this._visual.matrix = Coordinate$.ToMatrix(coordinate)
  }

  UpdateOpacity(opacity: number) {
    this._visual.opacity = opacity
  }

  UpdateVisible(visible: boolean) {
    this._visual.visible = visible
  }

  Destroy() {
    this._visual.remove()
    $iMap.Delete(this._id)
  }
}


let ITEM_TYPE = 0
const ITEM_MAP = new Map<number, string>()
const ITEM_TYPE_MAP = new Map<number, new() => any>()

export function RegisterItemType(type: new() => any) {
  ITEM_MAP.set(ITEM_TYPE, type.name.replace('ItemRenderer', ''))
  ITEM_TYPE_MAP.set(ITEM_TYPE, type)
  return ITEM_TYPE++
}

export function GetItemTypename(type: number) {
  return ITEM_MAP.get(type)
}

export function GetItemType(type: number) {
  return ITEM_TYPE_MAP.get(type)
}
