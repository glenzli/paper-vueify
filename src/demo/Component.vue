<template>
  <div>
    <p-item :element="circle" @click="ToggleParade"></p-item>
    <tadpole v-for="(tp, index) in tadpoles" :key="index" :position="tp.position" :velocity="tp.velocity" :radius="400" :parade="parade"></tadpole>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tadpole from './component/Tadpole.vue'
import { Point, Stroke, SolidBrush, Color$, Shadow } from '../core'
import { CircleItem } from '../model';

@Component({
  components: { Tadpole },
})
export default class extends Vue {
  tadpoles = new Array(30).fill(null).map(p => ({
    position: Point((2 * Math.random() - 1) * 300, (2 * Math.random() - 1) * 300),
    velocity: Point((2 * Math.random() - 1) * 10, (2 * Math.random() - 1) * 10),
  }))
  circle = CircleItem({ radius: 25, stroke: Stroke({ thickness: 0 }), brush: SolidBrush(Color$.ToColor('#af503d')), shadow: Shadow({ enabled: true, color: Color$.ToColor('#af503d'), blur: 10 }) })
  parade = false

  ToggleParade() {
    this.parade = !this.parade
  }
}

export const Description = 'Using vue components make the canvas drawing modularized, component based drawing is easier to control in relative-large project. DEMO HINT: Click red dot.'

</script>
