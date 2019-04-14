<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { DirectMap } from 'direct-object'
import { SymbolItemObject } from '../model'
import { ItemMixin } from './Item'

@Component
export default class PSymbol extends Mixins(ItemMixin) {
  get context() {
    return {
      reference: (this.element as SymbolItemObject).reference,
    }
  }
}
</script>


