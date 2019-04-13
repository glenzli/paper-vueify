<template>
  <canvas></canvas>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  mounted() {
    paper.setup(this.$el as HTMLCanvasElement)
    paper.view.center = new paper.Point(0, 0)
  }
}
</script>
