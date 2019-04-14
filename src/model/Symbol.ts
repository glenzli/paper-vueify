import paper from 'paper'
import { PaperItemObject, RawPaperItem, PaperItemRenderer } from './Item'
import { $iMap } from './IMap'

export interface SymbolItemObject extends PaperItemObject {
  reference: number,
}

export function RawSymbolItem({ reference = -1, ...base }: Partial<SymbolItemObject>) {
  return { reference, ...RawPaperItem(base) } as SymbolItemObject
}

export class SymbolItemRenderer extends PaperItemRenderer {
  RenderVisual() {
    let reference = (this._element as SymbolItemObject).reference
    if (reference > -1) {
      let original = $iMap.Get<PaperItemRenderer>(reference)!
      if (original && original.symoblic && original.symbol) {
        return new paper.PlacedSymbol(original.symbol)
      }
    }
    return new paper.Path()
  }
}

export function SymbolItem(symbol: Partial<SymbolItemObject> = {}) {
  let raw = RawSymbolItem(symbol)
  return new SymbolItemRenderer(raw).element as SymbolItemObject
}
