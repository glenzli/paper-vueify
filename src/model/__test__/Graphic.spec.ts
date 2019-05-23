import paper from 'paper'
import { PaperGraphic$ } from '../Graphic'

const canvas = document.createElement('canvas')
paper.setup(canvas)

describe('PaperGraphic$', () => {
  test('From', () => {
    let rect = new paper.Path.Rectangle({ point: [0, 0], size: [100, 100] })
    expect(PaperGraphic$.From(rect)).toEqual({
      segments: [
        { point: { x: 0, y: 100 }, handleIn: { x: 0, y: 0 }, handleOut: { x: 0, y: 0 } },
        { point: { x: 0, y: 0 }, handleIn: { x: 0, y: 0 }, handleOut: { x: 0, y: 0 } },
        { point: { x: 100, y: 0 }, handleIn: { x: 0, y: 0 }, handleOut: { x: 0, y: 0 } },
        { point: { x: 100, y: 100 }, handleIn: { x: 0, y: 0 }, handleOut: { x: 0, y: 0 } },
      ],
      closed: true,
      brush: { type: 0 },
      stroke: {
        brush: { type: 0 },
        thickness: 1,
        dash: [],
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
})
