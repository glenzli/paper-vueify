<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { StarItemObject } from '../model'

@Component
export default class PStar extends mixins(ShapeMixin) {
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


