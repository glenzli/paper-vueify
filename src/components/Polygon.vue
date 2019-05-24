<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { PolygonItemObject } from '../model'

@Component
export default class PPolygon extends mixins(ShapeMixin) {
  get context() {
    return {
      points: (this.element as PolygonItemObject).points,
    }
  }
}
</script>


