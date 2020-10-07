<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';
import { ShapeMixin } from './Shape';
import { RegularPolygonItemObject } from '../model';

@Component
export default class PRegularPolygon extends mixins(ShapeMixin) {
  get context() {
    const element = this.element as RegularPolygonItemObject;
    return {
      sides: element.sides,
      radius: element.radius,
    };
  }
}
</script>


