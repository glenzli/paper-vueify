import paper from 'paper'
import { SolidBrush, Color } from 'paper-vueify-datatypes'
import { ShapeItem, ShapeItemRenderer } from '../model/Shape'

(paper as any).setup(document.createElement('canvas'))

describe('Shape', () => {
  test('ShapeItem', () => {
    expect(ShapeItem(0)).toEqual({
      brush: { type: 1, color: { alpha: 1, blue: 0, green: 0, red: 0 } },
      stroke: {
        brush: { type: 1, color: { alpha: 1, blue: 0, green: 0, red: 0 } },
        thickness: 1,
        dash: [0, 0],
        dashOffset: 0,
        join: 'miter',
        cap: 'butt',
        miterLimit: 10,
      },
      shadow: {
        color: { red: 0, green: 0, blue: 0, alpha: 1 },
        blur: 0,
        offset: { x: 0, y: 0 },
        enabled: false,
      },
      type: 0,
      coordinate: {
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotation: 0,
        skewX: 0,
      },
      opacity: 1,
      visible: true,
    })
  })

  test('Paint', () => {
    let renderer = new ShapeItemRenderer()
    renderer.Paint(ShapeItem(0, { brush: SolidBrush(Color(1, 0, 0, 1)) }))
    expect((renderer.visual.fillColor as paper.Color).components).toEqual([1, 0, 0, 1])
  })
})
