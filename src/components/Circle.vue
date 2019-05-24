<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { CircleItemObject } from '../model'

@Component
export default class PCircle extends mixins(ShapeMixin) {
  get context() {
    let element = this.element as CircleItemObject
    return {
      radius: element.radius,
    }
  }
}
</script>


