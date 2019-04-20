<template>
  <div>
    <p-item :element="tadpole"></p-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { EllipseItem, PolylineItem, GroupItem } from '../../model'
import { Point, SolidBrush, Color$, Coordinate, PointObject, Point$, Shadow } from 'paper-vueify-datatypes'

@Component
export default class extends Vue {
  @Prop({ default: 20 }) size!: number
  @Prop({ default: '#1a1c21' }) color!: string
  @Prop({ default: () => Point() }) position!: PointObject
  @Prop({ default: () => Point(1, 0) }) velocity!: PointObject
  @Prop({ default: 0  }) radius!: number
  @Prop({ default: false }) parade!: boolean

  amplitude = 0
  dynamicPosition = Point()
  currentVelocity = Point()
  angleSpeed = 0
  handle: number | null = null

  get head() {
    return EllipseItem({ size: Point(this.size, 0.6 * this.size), coordinate: Coordinate({ position: Point(this.size / 2, 0) }), brush: SolidBrush(Color$.ToColor(this.color)), shadow: Shadow({ color: Color$.ToColor(this.color), enabled: true, blur: this.size / 3 }) })
  }

  get tail() {
    return PolylineItem({ points: [Point(-this.size / 2 * 3, 0), Point(-this.size / 4 * 5, this.amplitude), Point(-this.size, 0), Point(-this.size / 4 * 3, -this.amplitude), Point(-this.size / 2, 0), Point(-this.size / 4, this.amplitude), Point(0, 0)] })
  }

  get currentPosition() {
    return Point$.Add(this.position, this.dynamicPosition)
  }

  get tadpole() {
    return GroupItem({ children: [this.head, this.tail], coordinate: Coordinate({ position: Point$.Add(this.position, this.dynamicPosition), rotation: Point$.Angle(this.currentVelocity) }) })
  }

  @Watch('currentPosition')
  OnSwim() {
    if (this.radius > 0 && !this.parade && Point$.Length(this.currentPosition) > this.radius) {
      if (Point$.Dot(this.currentVelocity, this.currentPosition) > 0) {
        let deltaX = (2 * Math.random() - 1) * 0.5
        let deltaY = (2 * Math.random() - 1) * 0.5
        this.currentVelocity = Point$.Multiply(this.currentVelocity, Point(-1 + deltaX, -1 + deltaY))
      }
    }
  }

  @Watch('parade')
  OnParadeChange() {
    if (this.parade) {
      let angle = Point$.Angle(this.currentPosition) + Math.PI / 2
      let v = Point$.Length(this.currentVelocity)
      this.currentVelocity = Point$.Polar(v, angle)
      this.angleSpeed = v / Point$.Length(this.currentPosition)
    } else {
      this.currentVelocity = Point$.Rotate(this.currentVelocity, Math.random() * Math.PI * 2)
    }
  }

  mounted() {
    this.currentVelocity = this.velocity
    this.handle = setInterval(() => {
      this.amplitude = this.amplitude > 0 ? -this.size / 8 : this.size / 8
      if (this.parade) {
        this.currentVelocity = Point$.Polar(Point$.Length(this.currentVelocity), Point$.Angle(this.currentVelocity) + this.angleSpeed)
      }
      this.dynamicPosition = Point$.Add(this.dynamicPosition, this.currentVelocity)
    }, 1000 / 12)
  }

  beforeDestroy() {
    if (this.handle != null) {
      clearInterval(this.handle)
    }
  }
}
</script>
