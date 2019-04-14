<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { PolylineItemObject } from '../model'

@Component
export default class PPolyline extends Mixins(ShapeMixin) {
  get context() {
    return {
      points: (this.element as PolylineItemObject).points,
    }
  }
}
</script>
