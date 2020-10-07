<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';
import { ShapeMixin } from './Shape';
import { RectangleItemObject } from '../model';

@Component
export default class PRectangle extends mixins(ShapeMixin) {
  get context() {
    const element = this.element as RectangleItemObject;
    return {
      size: element.size,
      radius: element.radius,
    };
  }
}
</script>


