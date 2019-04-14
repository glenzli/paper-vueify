<template>
  <div>
    <p-rectangle :element="boundary" @mousemove="Move" @mouseleave="Leave"></p-rectangle>
    <p-circle :element="circle" :symbolic="true"></p-circle>
    <p-symbol v-for="symbol in symbols" :key="symbol.id" :element="symbol"></p-symbol>
  </div>
</template>

<script lang="ts">
import paper, { Color } from 'paper'
import { Component, Vue } from 'vue-property-decorator'
import { PaperGraphic$, PolylineItem, PolygonItemObject, PolygonItem, CircleItem, RectangleItem, PaperItemObject, PaperItemRenderer, SymbolItem } from '../model'
import { Arrayex } from 'arrayex'
import { Generic } from 'direct-object'
import { Point, Stroke, Brush$, Coordinate, SolidBrush, Color$, Shadow, StrokeJoin, StrokeCap, NoneBrush, Point$, PointObject } from '../core'

const INITS = new Array(30).fill(null).map(() => {
  let x = 580 * Math.random() - 290
  let y = 580 * Math.random() - 290
  let scale = 0.5 + Math.random() * 0.5
  return Coordinate({ position: Point(x, y), scale: Point(scale, scale) })
})

const VS = INITS.map(() => {
  let x = (2 * Math.random() - 1) * 20
  let y = (2 * Math.random() - 1) * 20
  return Point(x, y)
})

@Component
export default class extends Vue {
  boundary = RectangleItem({ size: Point(600, 600), brush: SolidBrush(Color$.ToColor('white')), stroke: Stroke({ dash: [1, 5] }) })
  circle = CircleItem({ radius: 20, brush: SolidBrush(Color$.ToColor('#8e321d')) })
  symbols = INITS.map(coordinate => SymbolItem({ reference: this.circle.id, coordinate }))
  center: PointObject | null = null
  handle: number | null = null

  Move(event: paper.MouseEvent) {
    this.center = Point$.Purify(event.point)
  }

  Leave() {
    this.center = null
  }

  mounted() {
    this.handle = setInterval(() => {
      this.symbols.forEach((symbol, index) => {
        if (this.center != null) {
          let v = Point$.Length(VS[index])
          let direction = Point$.Subtract(this.center, symbol.coordinate.position)
          if (Point$.Length(direction) > v) {
            let nv = Point$.Multiply(Point$.Normalize(direction), v)
            symbol.coordinate.position = Point$.Add(symbol.coordinate.position, nv)
          }
        } else {
          symbol.coordinate.position = Point$.Add(symbol.coordinate.position, VS[index])
        }
        if (Math.abs(symbol.coordinate.position.x) > 290) {
          symbol.coordinate.position.x = -symbol.coordinate.position.x
        }
        if (Math.abs(symbol.coordinate.position.y) > 290) {
          symbol.coordinate.position.y = -symbol.coordinate.position.y
        }
      })
    }, 1000 / 12)
  }

  beforeDestroy() {
    if (this.handle != null) {
      clearInterval(this.handle)
      this.handle = null
    }
  }
}

export const Description = 'Much easy to use event for interaction.'
</script>

