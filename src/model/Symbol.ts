import paper from 'paper'
import { PaperItemObject, PaperItem, PaperItemRenderer, RegisterItemType } from './Item'
import { $iMap } from './IMap'

export interface SymbolDefinitionObject {
  key: string,
  definition: PaperItemObject,
}

export function SymbolDefinition(key: string, definition: PaperItemObject) {
  return { key, definition }
}

export interface SymbolItemObject extends PaperItemObject {
  key: string,
}

export function SymbolItem({ key = '', ...base }: Partial<SymbolItemObject>) {
  return { key, ...PaperItem(SYMBOL_TYPE, base) } as SymbolItemObject
}

export class SymbolItemRenderer extends PaperItemRenderer {
  RenderVisual(element: SymbolItemObject) {
    if (element.key) {
      let symbol = $iMap.Get<paper.SymbolDefinition>(element.key)
      if (symbol) {
        return new paper.SymbolItem(symbol)
      }
    }
    return new paper.Path()
  }
}

const SYMBOL_TYPE = RegisterItemType(SymbolItemRenderer, 'Symbol')
