<template>
  <div>
    <data-mark v-for="(datapoint, index) in datapoints" :key="index" :point="datapoint" :alert="120" :fail="180"></data-mark>
  </div>
</template>

<script lang="ts">
import paper, { Color } from 'paper';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Array$ } from 'js-corelib';
import { Point } from 'paper-vueify-datatypes';
import DataMark from './component/DataMark.vue';

@Component({
  components: { DataMark },
})
export default class extends Vue {
  @Prop({ default: () => ({ width: 0, height: 0 }) }) public size!: { width: number, height: number };

  public handle = null as number | null;
  public ys = Array$.Repeat(61, 0);

  get datapoints() {
    const bound = this.size.width / 1.5;
    const offset = -bound / 2;
    const interval = bound / this.ys.length;
    return this.ys.map((y, i) => Point(offset + i * interval, y));
  }

  public mounted() {
    this.handle = window.setInterval(() => {
      this.ys = this.ys.map(() => 200 * Math.random());
    }, 1000 / 12);
  }

  public beforeDestroy() {
    if (this.handle != null) {
      clearInterval(this.handle);
      this.handle = null;
    }
  }
}

export const Description = 'By use vue and paper.js together, it\s extremely easy for advanced and rich-style data visualization based on vue\'s reactivity.';
</script>

