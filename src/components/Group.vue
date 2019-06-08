<template>
  <div>
    <p-item v-for="(child, index) in group.children" :key="index" :element="child" :index="index" @draw="OnDrawed"></p-item>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { GroupItem, $iMap, GroupItemRenderer, GroupItemObject } from '../model'
import { BasicMixin } from './Basic'

@Component
export default class PGroup extends mixins(BasicMixin) {
  get group() {
    return this.element as GroupItemObject
  }

  OnDrawed(cid: number, index: number) {
    let renderer = $iMap.Get<GroupItemRenderer>(this.rendererId)
    if (!renderer) {
      renderer = this.CreateRenderer() as GroupItemRenderer
    }
    let cRenderer = $iMap.Get<GroupItemRenderer>(cid)
    if (cRenderer) {
      if (cRenderer.visual.parent !== renderer.visual) {
        if (index > -1) {
          while (!renderer.visual.children[index]) {
            renderer.visual.addChild(new paper.Path())
          }
          renderer.visual.children[index].replaceWith(cRenderer.visual)
        } else {
          renderer.visual.addChild(cRenderer.visual)
        }
      }
    }
  }
}
</script>
