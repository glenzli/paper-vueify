<template>
  <canvas></canvas>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PCanvas extends Vue {
  @Prop({ default: false }) autosize!: boolean

  ResizeCanvas() {
    let canvas = this.$el as HTMLCanvasElement
    if (this.autosize) {
      paper.view.viewSize = new paper.Size(0, 0)
      setTimeout(() => {
        let parent = canvas.parentElement!
        let pStyle = getComputedStyle(parent)
        let width = parent.clientWidth - parseFloat(pStyle.paddingLeft || '0') - parseFloat(pStyle.paddingRight || '0') - parseFloat(pStyle.borderLeftWidth || '0') - parseFloat(pStyle.borderRightWidth || '0')
        let height = parent.clientHeight - parseFloat(pStyle.paddingTop || '0') - parseFloat(pStyle.paddingBottom || '0') - parseFloat(pStyle.borderTopWidth || '0') - parseFloat(pStyle.borderBottomWidth || '0')
        paper.view.viewSize = new paper.Size(width, height)
        paper.view.center = new paper.Point(0, 0)
      }, 0)
    }
  }

  mounted() {
    paper.setup(this.$el as HTMLCanvasElement)
    paper.view.center = new paper.Point(0, 0)
    if (this.autosize) {
      this.ResizeCanvas()
      window.addEventListener('resize', this.ResizeCanvas)
    }
  }

  beforeDestroy() {
    if (this.autosize) {
      window.removeEventListener('resize', this.ResizeCanvas)
    }
  }
}
</script>
