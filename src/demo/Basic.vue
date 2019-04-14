<template>
  <div>
    <component v-for="(element, key) in sources" :key="`${key}0`" :is="`p-${key}`" :element="element" :symbolic="true"></component>
    <component v-for="(element, key) in buttons" :key="`${key}1`" :is="`p-${key}`" :element="element" @click="Select(key)"></component>
    <p-symbol v-for="(element, index) in symbols" :key="index" :element="element"></p-symbol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DirectMap, DirectMapObject, Generic } from 'direct-object'
import { RectangleItem, CircleItem, RegularPolygonItem, StarItem, PaperGraphic$, PaperItemObject, SymbolItem } from '../model'
import { Point, SolidBrush, Color$, Coordinate } from '../core'

const XMAX = 400
const YMAX = 400

const INITS = new Array(30).fill(null).map(() => {
  let x = (Math.random() - 0.5) * XMAX * 2
  let y = Math.sign(Math.random() - 0.5) * (Math.random() * YMAX + 50)
  let scale = Math.random() * 0.5 + 0.5
  let rotation = Math.random() * 2 * Math.PI
  return Coordinate({ position: Point(x, y), scale: Point(scale, scale), rotation })
})

@Component
export default class extends Vue {
  sources = {
    'rectangle': RectangleItem({ size: Point(50, 50), brush: SolidBrush(Color$.ToColor('#a83535')) }),
    'circle': CircleItem({ radius: 25, brush: SolidBrush(Color$.ToColor('#a6ad45')) }),
    'regular-polygon': RegularPolygonItem({ radius: 25, sides: 5, brush: SolidBrush(Color$.ToColor('#416491')) }),
    'star': StarItem({ radius1: 25, radius2: 15, points: 6, brush: SolidBrush(Color$.ToColor('#663f7c')) }),
  } as DirectMapObject<PaperItemObject>
  selected = 'rectangle'
  handle = null as number | null
  symbols = Generic.Clone(INITS).map(coordinate => SymbolItem({ reference: this.sources[this.selected].id, coordinate }))

  get buttons() {
    let index = 0
    return DirectMap.ValueMap(this.sources, source => {
      let button = PaperGraphic$.Clone(source)
      button.coordinate.position = Point(-150 + 100 * index++, 0)
      return button
    } )
  }

  Select(type: string) {
    this.selected = type
    let reference = this.sources[this.selected].id
    this.symbols.forEach(s => { s.reference = reference })
  }

  mounted() {
    this.handle = setInterval(() => {
      this.symbols.forEach(s => {
        s.coordinate.position.x += 10
        if (s.coordinate.position.x > XMAX) {
          s.coordinate.position.x = -XMAX
        }
        s.coordinate.rotation += Math.random() * Math.PI / 6
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

export const Description = 'Fully support for paper.js shapes, symbol, and group item(click to switch).'

</script>
