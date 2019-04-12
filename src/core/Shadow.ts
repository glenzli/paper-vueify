import { Point, PointObject, Point$ } from './Point'
import { Color, ColorObject, Color$ } from './Color'

export type ShadowObject = {
  color: ColorObject,
  blur: number,
  offset: PointObject,
  enabled: boolean,
}

export function Shadow({ color = Color(), blur = 0, offset = Point(), enabled = false } = {}): ShadowObject {
  return { color, blur, offset, enabled }
}

export namespace Shadow$ {
  export function Interpret(shadow: ShadowObject) {
    if (shadow.enabled) {
      return {
        shadowColor: Color$.Interpret(shadow.color),
        shadowBlur: shadow.blur,
        shadowOffset: [shadow.offset.x, shadow.offset.y],
      }
    } else {
      return { shadowColor: null }
    }
  }

  export function Purify(path: paper.Item): ShadowObject {
    if (path.shadowColor != null) {
      return Shadow({ color: Color$.Purify(path.shadowColor as paper.Color), blur: path.shadowBlur, offset: Point$.Purify(path.shadowOffset as paper.Point), enabled: true })
    }
    return Shadow()
  }
}
