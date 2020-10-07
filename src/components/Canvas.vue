<template>
  <canvas></canvas>
</template>

<script lang="ts">
import paper from 'paper';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class PCanvas extends Vue {
  @Prop({ default: false }) public autosize!: boolean;

  public ResizeCanvas() {
    const canvas = this.$el as HTMLCanvasElement;
    if (this.autosize) {
      this.$paper.view.viewSize = new paper.Size(0, 0);
      setTimeout(() => {
        const parent = canvas.parentElement!;
        const pStyle = getComputedStyle(parent);
        const width = parent.clientWidth - parseFloat(pStyle.paddingLeft || '0') - parseFloat(pStyle.paddingRight || '0') - parseFloat(pStyle.borderLeftWidth || '0') - parseFloat(pStyle.borderRightWidth || '0');
        const height = parent.clientHeight - parseFloat(pStyle.paddingTop || '0') - parseFloat(pStyle.paddingBottom || '0') - parseFloat(pStyle.borderTopWidth || '0') - parseFloat(pStyle.borderBottomWidth || '0');
        this.$paper.view.viewSize = new paper.Size(width, height);
        this.$paper.view.center = new paper.Point(0, 0);
        this.$emit('resize', { width, height });
      }, 0);
    }
  }

  public Hook() {
    const on = (type: string, event: paper.Event) => { this.$emit(type, event); };
    this.$paper.view.onClick = (e: paper.Event) => on('click', e);
    this.$paper.view.onDoubleClick = (e: paper.Event) => { on('doubleclick', e); };
    this.$paper.view.onMouseDown = (e: paper.Event) => { on('mousedown', e); };
    this.$paper.view.onMouseDrag = (e: paper.Event) => { on('mousedrag', e); };
    this.$paper.view.onMouseEnter = (e: paper.Event) => { on('mouseenter', e); };
    this.$paper.view.onMouseLeave = (e: paper.Event) => { on('mouseleave', e); };
    this.$paper.view.onMouseMove = (e: paper.Event) => { on('mousemove', e); };
    this.$paper.view.onMouseUp = (e: paper.Event) => { on('mouseup', e); };
    this.$paper.view.onFrame = (e: paper.Event) => { on('frame', e); };
  }

  public mounted() {
    this.$paper.setup(this.$el as HTMLCanvasElement);
    this.Hook();
    this.$paper.view.center = new paper.Point(0, 0);
    if (this.autosize) {
      this.ResizeCanvas();
      window.addEventListener('resize', this.ResizeCanvas);
    }
  }

  public beforeDestroy() {
    if (this.autosize) {
      window.removeEventListener('resize', this.ResizeCanvas);
    }
  }
}
</script>
