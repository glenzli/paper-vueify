<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { RegularPolygonItemObject } from '../model'

@Component
export default class PRegularPolygon extends Mixins(ShapeMixin) {
  get context() {
    let element = this.element as RegularPolygonItemObject
    return {
      sides: element.sides,
      radius: element.radius,
    }
  }
}
</script>


