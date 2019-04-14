<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { StarItemObject } from '../model'

@Component
export default class PStar extends Mixins(ShapeMixin) {
  get context() {
    let element = this.element as StarItemObject
    return {
      radius1: element.radius1,
      radius2: element.radius2,
      points: element.points,
    }
  }
}
</script>


