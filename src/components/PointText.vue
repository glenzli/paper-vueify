<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { PointTextItemObject } from '../model'

@Component
export default class extends Mixins(ShapeMixin) {
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


