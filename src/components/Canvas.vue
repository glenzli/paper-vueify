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
        this.$emit('resize', { width, height })
      }, 0)
    }
  }

  Hook() {
    let on = (type: string, event: paper.MouseEvent | paper.IFrameEvent | paper.KeyEvent) => { this.$emit(type, event) }
    paper.view.onClick = e => on('click', e)
    paper.view.onDoubleClick = e => { on('doubleclick', e) }
    paper.view.onMouseDown = e => { on('mousedown', e) }
    paper.view.onMouseDrag = e => { on('mousedrag', e) }
    paper.view.onMouseEnter = e => { on('mouseenter', e) }
    paper.view.onMouseLeave = e => { on('mouseleave', e) }
    paper.view.onMouseMove = e => { on('mousemove', e) }
    paper.view.onMouseUp = e => { on('mouseup', e) }
    paper.view.onFrame = e => { on('frame', e) }
  }

  mounted() {
    paper.setup(this.$el as HTMLCanvasElement)
    this.Hook()
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
