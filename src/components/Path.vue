<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ShapeMixin } from './Shape'
import { PathItemObject } from '../model'

@Component
export default class extends Mixins(ShapeMixin) {
  get context() {
    let element = this.element as PathItemObject
    return {
      segments: element.segments,
      closed: element.closed,
    }
  }
}
</script>
