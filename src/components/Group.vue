<template>
  <div>
    <p-item v-for="(child, index) in element.children" :key="index" :element="child" @draw="OnDrawed"></p-item>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { GroupItem, $iMap, GroupItemRenderer } from '../model'
import { BasicMixin } from './Basic'

@Component
export default class PGroup extends Mixins(BasicMixin) {
  OnDrawed(cid: number) {
    let renderer = $iMap.Get<GroupItemRenderer>(this.rendererId)
    if (!renderer) {
      renderer = this.CreateRenderer() as GroupItemRenderer
    }
    let cRenderer = $iMap.Get<GroupItemRenderer>(cid)
    if (cRenderer) {
      renderer.visual.addChild(cRenderer.visual)
    }
  }
}
</script>


