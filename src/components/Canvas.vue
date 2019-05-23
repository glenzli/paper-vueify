<template>
  <canvas></canvas>
</template>

<script lang="ts">
import paper from 'paper'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class PCanvas extends Vue {
  @Prop({ default: false }) autosize!: boolean

  ResizeCanvas() {
    let canvas = this.$el as HTMLCanvasElement
    if (this.autosize) {
      this.$paper.view.viewSize = new paper.Size(0, 0)
      setTimeout(() => {
        let parent = canvas.parentElement!
        let pStyle = getComputedStyle(parent)
        let width = parent.clientWidth - parseFloat(pStyle.paddingLeft || '0') - parseFloat(pStyle.paddingRight || '0') - parseFloat(pStyle.borderLeftWidth || '0') - parseFloat(pStyle.borderRightWidth || '0')
        let height = parent.clientHeight - parseFloat(pStyle.paddingTop || '0') - parseFloat(pStyle.paddingBottom || '0') - parseFloat(pStyle.borderTopWidth || '0') - parseFloat(pStyle.borderBottomWidth || '0')
        this.$paper.view.viewSize = new paper.Size(width, height)
        this.$paper.view.center = new paper.Point(0, 0)
        this.$emit('resize', { width, height })
      }, 0)
    }
  }

  Hook() {
    let on = (type: string, event: paper.MouseEvent | paper.IFrameEvent | paper.KeyEvent) => { this.$emit(type, event) }
    this.$paper.view.onClick = e => on('click', e)
    this.$paper.view.onDoubleClick = e => { on('doubleclick', e) }
    this.$paper.view.onMouseDown = e => { on('mousedown', e) }
    this.$paper.view.onMouseDrag = e => { on('mousedrag', e) }
    this.$paper.view.onMouseEnter = e => { on('mouseenter', e) }
    this.$paper.view.onMouseLeave = e => { on('mouseleave', e) }
    this.$paper.view.onMouseMove = e => { on('mousemove', e) }
    this.$paper.view.onMouseUp = e => { on('mouseup', e) }
    this.$paper.view.onFrame = e => { on('frame', e) }
  }

  mounted() {
    this.$paper.setup(this.$el as HTMLCanvasElement)
    this.Hook()
    this.$paper.view.center = new paper.Point(0, 0)
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
