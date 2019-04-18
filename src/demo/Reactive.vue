<template>
  <div>
    <data-mark v-for="(datapoint, index) in datapoints" :key="index" :point="datapoint" :alert="120" :fail="180"></data-mark>
  </div>
</template>

<script lang="ts">
import paper, { Color } from 'paper'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Arrayex } from 'arrayex'
import { Point } from '../core'
import DataMark from './component/DataMark.vue'

@Component({
  components: { DataMark },
})
export default class extends Vue {
  @Prop({ default: () => ({ width: 0, height: 0 }) }) size!: { width: number, height: number }

  handle = null as number | null
  ys = Arrayex.Repeat(61, 0)

  get datapoints() {
    let bound = this.size.width / 1.5
    let offset = -bound / 2
    let interval = bound / this.ys.length
    return this.ys.map((y, i) => Point(offset + i * interval, y))
  }

  mounted() {
    this.handle = setInterval(() => {
      this.ys = this.ys.map(() => 200 * Math.random())
    }, 1000 / 12)
  }

  beforeDestroy() {
    if (this.handle != null) {
      clearInterval(this.handle)
      this.handle = null
    }
  }
}

export const Description = 'By use vue and paper.js together, it\s extremely easy for advanced and rich-style data visualization based on vue\'s reactivity.'
</script>

