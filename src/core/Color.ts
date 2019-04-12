import paper from 'paper'
import { DirectMath, Generic } from 'direct-object'
import { DOMKit } from './DOMKit'

export type ColorObject = { red: number, green: number, blue: number, alpha: number }

export type HsvColorObject = { hue: number, saturation: number, value: number, alpha: number }

export type ColorstopObject = { offset: number, color: ColorObject }

/** r, g, b, alpha is in (0, 1) */
export function Color(red = 0, green = 0, blue = 0, alpha = 1): ColorObject {
  return { red, green, blue, alpha }
}

/** h, s, b, alpha is in (0, 1) */
export function HsvColor(hue = 0, saturation = 0, value = 0, alpha = 1): HsvColorObject {
  return { hue, saturation, value, alpha }
}

export function Colorstop(offset = 0, color = Color()): ColorstopObject {
  return { offset, color }
}

export namespace Color$ {
  function IsColorstop(color: any): color is ColorstopObject {
    return (color as ColorstopObject).color !== undefined
  }

  export function Purify(color: ColorObject): ColorObject
  export function Purify(color: ColorstopObject): ColorstopObject
  export function Purify(color: ColorObject | ColorstopObject): ColorObject | ColorstopObject {
    if (IsColorstop(color)) {
      return Colorstop(color.offset, Purify(color.color))
    } else {
      return Color(color.red, color.green, color.blue, color.alpha)
    }
  }

  export function ToHsv(color: ColorObject): HsvColorObject {
    let [m, M] = DirectMath.minmax(color.red, color.green, color.blue)
    let delta = M - m
    let s = M > 0 ? (delta / M) : 0
    let h = 0
    if (delta > 0) {
      switch (M) {
        case color.red: h = (1 / 6 * (color.green - color.blue) / delta + 1) % 1; break
        case color.green: h = 1 / 6 * (color.blue - color.red) / delta + 1 / 3; break
        case color.blue: h = 1 / 6 * (color.red - color.green) / delta + 2 / 3
      }
    }
    return HsvColor(h, s, M, color.alpha)
  }

  function HsvColorToColor(color: HsvColorObject): ColorObject {
    let hn = Math.floor(color.hue * 6) % 6
    let f = (color.hue % 1) * 6 - hn
    let p = color.value * (1 - color.saturation)
    let q = color.value * (1 - f * color.saturation)
    let t = color.value * (1 - (1 - f) * color.saturation)
    let b = color.value
    switch (hn) {
      case 0: return Color(b, t, p, color.alpha)
      case 1: return Color(q, b, p, color.alpha)
      case 2: return Color(p, b, t, color.alpha)
      case 3: return Color(p, q, b, color.alpha)
      case 4: return Color(t, p, b, color.alpha)
      default: return Color(b, p, q, color.alpha)
    }
  }

  const ColorNormalizer = DOMKit.CreateHiddenTag()

  function CssToColor(color: string): ColorObject {
    ColorNormalizer.style.color = color
    let channels = window!.getComputedStyle(ColorNormalizer)!.color!.match(/\d+(\.\d+)?/g)!.map(c => parseFloat(c))
    if (channels.length < 4) {
      channels.push(1)
    }
    return Color(channels[0] / 255, channels[1] / 255, channels[2] / 255, channels[3])
  }

  export function ToColor(color: HsvColorObject | string): ColorObject {
    if (Generic.IsString(color)) {
      return CssToColor(color)
    } else {
      return HsvColorToColor(color)
    }
  }

  function Channel2Hex(channel: number): string {
    let hex = Math.round(channel * 255).toString(16)
    return hex.length > 1 ? hex : `0${hex}`
  }

  export function ToHex(color: ColorObject, rgba = false): string {
    let alpha = rgba ? Channel2Hex(color.alpha) : ''
    return `#${Channel2Hex(color.red)}${Channel2Hex(color.green)}${Channel2Hex(color.blue)}${alpha}`
  }

  export function Interpret(color: ColorObject): paper.Color {
    return new paper.Color(color.red, color.green, color.blue, color.alpha)
  }

  export function ToCss(color: ColorObject): string {
    let params = [color.red, color.green, color.blue].map(c => `${100 * c}%`)
    if (color.alpha < 1) {
      return `rgba(${params.join(',')}, ${color.alpha})`
    } else {
      return `rgb(${params.join(',')})`
    }
  }

  export function HighContrast(color: ColorObject): ColorObject {
    let c = (color.red * 0.299 + color.green * 0.587 + color.blue * 0.114) > 186 ? 0 : 255
    return Color(c, c, c, color.alpha)
  }
}
