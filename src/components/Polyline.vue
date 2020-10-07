<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';
import { ShapeMixin } from './Shape';
import { PolylineItemObject } from '../model';

@Component
export default class PPolyline extends mixins(ShapeMixin) {
  get context() {
    return {
      points: (this.element as PolylineItemObject).points,
    };
  }
}
</script>
