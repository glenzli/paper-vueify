<template>
  <div id="app">
    <p-canvas width="800" height="600"></p-canvas>
    <p-rectangle :element="r1"></p-rectangle>
    <p-ellipse :element="e1"></p-ellipse>
  </div>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Vue } from 'vue-property-decorator'
import { Point, SolidBrush, Color } from './core'
import { RectangleItem, EllipseItem } from './model'

@Component
export default class App extends Vue {
  r1 = RectangleItem()
  e1 = EllipseItem({ size: Point(120, 80), brush: SolidBrush(Color(0.5, 0.1, 0.1)) })
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
