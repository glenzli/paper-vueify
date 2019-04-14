<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { PolygonItemObject } from '../model'

@Component
export default class PPolygon extends Mixins(ShapeMixin) {
  get context() {
    return {
      points: (this.element as PolygonItemObject).points,
    }
  }
}
</script>


