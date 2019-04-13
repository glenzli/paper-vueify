<template>
  <div id="app" class="container">
    <div class="title">Vue Paper: Demo</div>
    <div class="stage">
      <p-canvas :autosize="true"></p-canvas>
      <p-rectangle :element="r1"></p-rectangle>
      <p-ellipse :element="e1"></p-ellipse>
      <p-point-text :element="t1"></p-point-text>
    </div>
  </div>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Vue } from 'vue-property-decorator'
import { Point, SolidBrush, Color, Coordinate } from './core'
import { RectangleItem, EllipseItem, PointTextItem } from './model'

@Component
export default class App extends Vue {
  r1 = RectangleItem()
  e1 = EllipseItem({ size: Point(120, 80), brush: SolidBrush(Color(0.5, 0.1, 0.1)), coordinate: Coordinate({ position: Point(100, 0) }) })
  t1 = PointTextItem({ content: 'Demo Test', coordinate: Coordinate({ position: Point(200, 0) }) })
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Consolas, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.title {
  background: #333;
  color: #ccc;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stage {
  flex: 1;
}
</style>
