<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { EllipseItemObject } from '../model'

@Component
export default class PEllipse extends mixins(ShapeMixin) {
  get context() {
    let element = this.element as EllipseItemObject
    return {
      size: element.size,
    }
  }
}
</script>


