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

  constructor(element: PaperItemObject) {
    this._element = element
    this._element.id = $iMap.New(this)
    if (paper.view) {
      this._visual = new paper.Path()
    }
  }

  get id() {
    return this._element.id
  }

  get element() {
    return this._element
  }

  protected RenderVisual(): paper.Item {
    return new paper.Path()
  }

  protected ReplaceVisual(visual: paper.Item | null) {
    if (!this._visual) {
      this._visual = new paper.Path()
    }
    if (visual) {
      this._visual.replaceWith(visual)
      this._visual.remove()
      this._visual = visual
    }
  }

  Render() {
    this.ReplaceVisual(this.RenderVisual())
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
