<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';
import { ShapeMixin } from './Shape';
import { PathItemObject } from '../model';

@Component
export default class PPath extends mixins(ShapeMixin) {
  get context() {
    const element = this.element as PathItemObject;
    return {
      segments: element.segments,
      children: element.children,
      closed: element.closed,
    };
  }
}
</script>
