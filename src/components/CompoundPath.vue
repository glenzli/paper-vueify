<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { CompoundPathItemObject } from '../model'

@Component
export default class extends Mixins(ShapeMixin) {
  get context() {
    let element = this.element as CompoundPathItemObject
    return {
      children: element.children,
      closed: element.closed,
    }
  }
}
</script>


