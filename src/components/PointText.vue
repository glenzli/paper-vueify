<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { PointTextItemObject } from '../model'

@Component
export default class PPointText extends mixins(ShapeMixin) {
  get context() {
    let element = this.element as PointTextItemObject
    return {
      fontFamily: element.fontFamily,
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
      justificiation: element.justification,
      lineHeight: element.lineHeight,
      content: element.content,
    }
  }
}
</script>


