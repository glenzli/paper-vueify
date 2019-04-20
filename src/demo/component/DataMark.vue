<template>
  <p-item :element="hybridMark"></p-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Color$, SolidBrush, Point, Coordinate, Stroke, PointObject, Shadow } from 'paper-vueify-datatypes'
import { PolygonItem, CircleItem, GroupItem, PolylineItem } from '../../model'

const MARK_BRUSHES = [
  SolidBrush(Color$.ToColor('#bcbf22')),
  SolidBrush(Color$.ToColor('#eab33f')),
  SolidBrush(Color$.ToColor('#ea563f')),
]

const MARK_SHADOW = Shadow({ color: Color$.ToColor('#eab33f'), enabled: true, blur: 10 })

const MARK_STROKE = Stroke({ thickness: 0 })

const MARKLINE_STROKE = Stroke({ brush: MARK_BRUSHES[0], thickness: 2 })


const MARKSIZE = 4

@Component
export default class extends Vue {
  @Prop({ required: true }) point!: PointObject
  @Prop({ required: true }) alert!: number
  @Prop({ required: true }) fail!: number

  get coordinate() {
    return Coordinate({ position: Point(this.point.x, 0) })
  }

  get brush() {
    return this.point.y < this.alert ? MARK_BRUSHES[0] : (this.point.y < this.fail ? MARK_BRUSHES[1] : MARK_BRUSHES[2])
  }

  get mark() {
    return PolygonItem({ points: [Point(-MARKSIZE, 0), Point(-MARKSIZE, -this.point.y / 5), Point(0, -this.point.y), Point(MARKSIZE, -this.point.y / 5), Point(MARKSIZE, 0)], brush: this.brush, stroke: MARK_STROKE, shadow: MARK_SHADOW })
  }

  get dot() {
    return CircleItem({ radius: MARKSIZE, coordinate: Coordinate({ position: Point(0, this.point.y / 6 + 30) }), brush: this.brush, stroke: MARK_STROKE, shadow: MARK_SHADOW })
  }

  get line() {
    return PolylineItem({ points: [Point(0, this.point.y / 8 + 60), Point(0, this.point.y / 8 + 70)], stroke: MARKLINE_STROKE })
  }

  get hybridMark() {
    return GroupItem({ children: [this.mark, this.dot, this.line], coordinate: this.coordinate })
  }
}
</script>

