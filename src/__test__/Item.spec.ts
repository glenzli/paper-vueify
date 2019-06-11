import paper from 'paper'
import { PaperItem, PaperItemRenderer, RegisterItemType, GetItemTypename, GetItemType } from '../model/Item'
import { $iMap } from '../model/IMap'

(paper as any).setup(document.createElement('canvas'))

describe('Item', () => {
  test('PaperItem', () => {
    expect(PaperItem(0)).toEqual({
      type: 0,
      coordinate: {
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotation: 0,
        skewX: 0,
      },
      opacity: 1,
      visible: true,
      selectable: true,
    })
  })

  test('PaperItemRenderer.constructor', () => {
    let renderer = new PaperItemRenderer()
    expect($iMap.Get(renderer.id)).toBe(renderer)
    expect(renderer.visual).not.toBeNull()
  })

  test('Render', () => {
    let renderer = new PaperItemRenderer()
    renderer.Render(PaperItem(0))
    expect(renderer.visual).not.toBeNull()
    renderer.UpdateCoordinate({ position: { x: 100, y: 50 }, scale: { x: 2, y: 1 }, rotation: 0, skewX: 0 })
    expect(renderer.visual.matrix.values).toEqual([2, 0, 0, 1, 100, 50])
    renderer.UpdateVisible(false)
    expect(renderer.visual.visible).toBeFalsy()
    renderer.UpdateOpacity(0.5)
    expect(renderer.visual.opacity).toEqual(0.5)
  })

  test('Delete', () => {
    let renderer = new PaperItemRenderer()
    renderer.Destroy()
    expect($iMap.Get(renderer.id)).toBeUndefined()
    expect(renderer.visual.parent).toBeNull()
  })

  test('RegisterItemType', () => {
    class Test {}
    let type = RegisterItemType(Test, 'test')
    expect(type).toBeGreaterThanOrEqual(0)
    expect(GetItemTypename(type)).toEqual('test')
    expect(GetItemType(type)).toBe(Test)
  })
})
