<template>
  <div>
    <p-item :element="boundary" @mousemove="Move" @mouseleave="Leave"></p-item>
    <p-symbol-definition :element="circle"></p-symbol-definition>
    <p-item v-for="symbol in symbols" :key="symbol.id" :element="symbol"></p-item>
  </div>
</template>

<script lang="ts">
import paper, { Color } from 'paper'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PaperGraphic$, PolylineItem, PolygonItemObject, PolygonItem, CircleItem, RectangleItem, PaperItemObject, PaperItemRenderer, SymbolItem, SymbolDefinition } from '../model'
import { Point, Stroke, Brush$, Coordinate, SolidBrush, Color$, Shadow, StrokeJoin, StrokeCap, NoneBrush, Point$, PointObject } from 'paper-vueify-datatypes'

const RADIUS = 20

const INITS = new Array(30).fill(null).map(() => {
  let x = RADIUS * Math.random() - 2 * RADIUS
  let y = RADIUS * Math.random() - 2 * RADIUS
  let scale = 0.5 + Math.random() * 0.5
  return Coordinate({ position: Point(x, y), scale: Point(scale, scale) })
})

const VS = INITS.map(() => {
  let x = (2 * Math.random() - 1) * RADIUS
  let y = (2 * Math.random() - 1) * RADIUS
  return Point(x, y)
})

@Component
export default class extends Vue {
  @Prop({ default: () => ({ width: 0, height: 0 }) }) size!: { width: number, height: number }

  circle = SymbolDefinition('circle', CircleItem({ radius: RADIUS, brush: SolidBrush(Color$.ToColor('#8e321d')), stroke: Stroke({ thickness: 0 }) }))
  symbols = INITS.map(coordinate => SymbolItem({ key: 'circle', coordinate }))
  center: PointObject | null = null
  handle: number | null = null

  get bound() {
    return Point(this.size.width * 0.9, this.size.height * 0.9)
  }

  get boundary() {
    return RectangleItem({ size: this.bound, brush: SolidBrush(Color$.ToColor('white')), stroke: Stroke({ dash: [1, 5] }), selectable: false })
  }

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
        let bound = Point$.Subtract(this.bound, RADIUS * symbol.coordinate.scale.x)
        if (Math.abs(symbol.coordinate.position.x) > bound.x / 2) {
          symbol.coordinate.position.x = (symbol.coordinate.position.x + bound.x / 2 * 3) % bound.x - bound.x / 2
        }
        if (Math.abs(symbol.coordinate.position.y) > bound.y / 2) {
          symbol.coordinate.position.y = (symbol.coordinate.position.y + bound.y / 2 * 3) % bound.y - bound.y / 2
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
</script>

