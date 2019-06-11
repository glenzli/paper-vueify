<template>
  <div>
    <p-symbol-definition v-for="definition in definitions" :key="definition.key" :element="definition"></p-symbol-definition>
    <p-item v-for="(element, index) in symbols" :key="index" :element="element"></p-item>
    <p-item v-for="(element, index) in buttons" :key="`b${index}`" :element="element" @click="Select(index)"></p-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Generic } from 'js-corelib'
import { RectangleItem, CircleItem, RegularPolygonItem, StarItem, PaperGraphic$, PaperItemObject, SymbolItem, SymbolDefinition, PointTextItem } from '../model'
import { Point, SolidBrush, Color$, Coordinate, Stroke, Shadow, Point$ } from 'paper-vueify-datatypes'

const RADIUS = 400

const INITS = new Array(60).fill(null).map(() => {
  let scale = Math.random() * 0.5
  return Coordinate({ scale: Point(scale, scale) })
})

const VS = INITS.map(() => Point((2 * Math.random() - 1) * 8, (2 * Math.random() - 1) * 8))

const STROKE = Stroke({ thickness: 0 })

@Component
export default class extends Vue {
  @Prop({ default: () => ({ width: 0, height: 0 }) }) size!: { width: number, height: number }
  definitions = [
    SymbolDefinition('rectangle', RectangleItem({ size: Point(50, 50), brush: SolidBrush(Color$.ToColor('#a83535')), stroke: STROKE, shadow: Shadow({ color: Color$.ToColor('#a83535'), blur: 10, enabled: true }) })),
    SymbolDefinition('circle', CircleItem({ radius: 25, brush: SolidBrush(Color$.ToColor('#a6ad45')), stroke: STROKE, shadow: Shadow({ color: Color$.ToColor('#a6ad45'), blur: 10, enabled: true }) })),
    SymbolDefinition('regular-polygon', RegularPolygonItem({ radius: 25, sides: 5, brush: SolidBrush(Color$.ToColor('#416491')), stroke: STROKE, shadow: Shadow({ color: Color$.ToColor('#416491'), blur: 10, enabled: true }) })),
    SymbolDefinition('star', StarItem({ radius1: 25, radius2: 15, points: 6, brush: SolidBrush(Color$.ToColor('#663f7c')), stroke: STROKE, shadow: Shadow({ color: Color$.ToColor('#663f7c'), blur: 10, enabled: true }) })),
    SymbolDefinition('text', PointTextItem({ content: 'T', fontSize: 60, fontWeight: 'bold', brush: SolidBrush(Color$.ToColor('#cc3965')), stroke: STROKE, shadow: Shadow({ color: Color$.ToColor('#cc3965'), blur: 10, enabled: true }) })),
  ]
  selected = 0
  handle = null as number | null
  symbols = Generic.Clone(INITS).map(coordinate => SymbolItem({ key: this.definitions[this.selected].key, coordinate, selectable: false }))
  counter = 0

  get buttons() {
    let average = this.size.width / 7
    return this.definitions.map((definition, index) => SymbolItem({ key: definition.key, coordinate: Coordinate({ position: Point(-(average * 2) + average * index, index < 4 ? 0 : 5) }) }))
  }

  Select(index: number) {
    this.selected = index
    let pivot = this.buttons[this.selected].coordinate.position
    this.symbols.forEach(s => {
      s.key = this.definitions[index].key
      s.coordinate.position = Generic.Clone(pivot)
    })
    this.counter = 0
  }

  mounted() {
    this.Select(0)
    this.handle = setInterval(() => {
      this.symbols.forEach((s, i) => {
        s.coordinate.position = Point$.Add(s.coordinate.position, VS[i])
        let pivot = this.buttons[this.selected].coordinate.position
        if (Point$.Distance(s.coordinate.position, pivot) > RADIUS) {
          s.coordinate.position = Generic.Clone(pivot)
        }
        s.coordinate.rotation += Math.random() * Math.PI / 6
        if (this.counter++ % 4000 === 3999) {
          this.Select((this.selected + 1) % this.definitions.length)
        }
      })
    }, 1000 / 16)
  }

  beforeDestroy() {
    if (this.handle != null) {
      clearInterval(this.handle)
      this.handle = null
    }
  }
}
</script>
