<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { RectangleItemObject } from '../model'

@Component
export default class PRectangle extends Mixins(ShapeMixin) {
  get context() {
    let element = this.element as RectangleItemObject
    return {
      size: element.size,
      radius: element.radius,
    }
  }
}
</script>


