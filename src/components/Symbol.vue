<template>
  <div></div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { DirectMap } from 'direct-object'
import { SymbolItemObject } from '../model'
import { BasicMixin } from './Basic'

@Component
export default class PSymbol extends mixins(BasicMixin) {
  get context() {
    return {
      key: (this.element as SymbolItemObject).key,
    }
  }
}
</script>


