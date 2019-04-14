<template>
  <div>
    <p-polygon v-for="mark in marks" :key="mark.id" :element="mark"></p-polygon>
    <p-polyline :element="polyline"></p-polyline>
    <p-circle v-for="dot in dots" :key="dot.id" :element="dot"></p-circle>
  </div>
</template>

<script lang="ts">
import paper, { Color } from 'paper'
import { Component, Vue } from 'vue-property-decorator'
import { PaperGraphic$, PolylineItem, PolygonItemObject, PolygonItem, CircleItem } from '../model'
import { Arrayex } from 'arrayex'
import { Generic } from 'direct-object'
import { Point, Stroke, Brush$, Coordinate, SolidBrush, Color$, Shadow, StrokeJoin, StrokeCap } from '../core'

const MARKSIZE = 4
const DATA_COUNT = 61
const XS = Arrayex.Create(DATA_COUNT, i => (i - DATA_COUNT / 2) * MARKSIZE * 3)
const MARK = [Point(-MARKSIZE, 0), Point(-MARKSIZE, 0), Point(0, 0), Point(MARKSIZE, 0), Point(MARKSIZE, 0)]
const MARK_BRUSH = SolidBrush(Color$.ToColor('#bcbf22'))
const MARK_BRUSH_ALERT = SolidBrush(Color$.ToColor('#eab33f'))
const MARK_BRUSH_FAIL = SolidBrush(Color$.ToColor('#ea563f'))
const MARK_SHADOW = Shadow({ color: Color$.ToColor('#bcbf22'), blur: MARKSIZE * 3, enabled: true })
const MARK_STROKE = Stroke({ thickness: 0 })
const MARKLINE_STROKE = Stroke({ brush: MARK_BRUSH, thickness: 2, dash: [2, 10], join: StrokeJoin.Round, cap: StrokeCap.Round })

function GetYs() {
  return XS.map(index => Math.random() * 200)
}

function SetMarkHeight(mark: PolygonItemObject, height: number) {
  mark.points[3].y = mark.points[1].y = -height * 0.2
  mark.points[2].y = -height
}

@Component
export default class extends Vue {
  marks = XS.map(x => PolygonItem({ points: Generic.Clone(MARK), coordinate: Coordinate({ position: Point(x, 0) }), brush: MARK_BRUSH, stroke: MARK_STROKE, shadow: MARK_SHADOW }))
  dots = XS.map(x => CircleItem({ radius: 5, coordinate: Coordinate({ position: Point(x, 15) }), brush: MARK_BRUSH, stroke: MARK_STROKE, shadow: MARK_SHADOW }))
  polyline = PolylineItem({ points: XS.map(x => Point(x, 0)), stroke: MARKLINE_STROKE })
  handle = null as number | null

  mounted() {
    this.handle = setInterval(() => {
      GetYs().map((y, index) => {
        this.polyline.points[index].y = y / 6 + 50
        SetMarkHeight(this.marks[index], y)
        this.dots[index].radius = 2 + y / 100
        let brush = y > 180 ? MARK_BRUSH_FAIL : (y > 120 ? MARK_BRUSH_ALERT : MARK_BRUSH)
        this.marks[index].brush = brush
        this.dots[index].brush = brush
        this.dots[index].coordinate.position.y = y / 8
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

export const Description = 'By use vue and paper.js together, it\s extremely easy for advanced data visualization based on vue\'s reactivity.'
</script>

