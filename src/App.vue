<template>
  <div id="app" class="container">
    <div class="title">Paper-Vueify: Demo</div>
    <div class="menu">
      <div v-for="(name, index) in names" :key="index" class="item" :class="{ selected: index === selected }" @click="Select(index)">{{name}}</div>
    </div>
    <div class="description">{{description}}</div>
    <div class="stage">
      <p-canvas :autosize="true"></p-canvas>
    </div>
    <component :is="demo" class="zero"></component>
  </div>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Vue } from 'vue-property-decorator'
import { Demos, DemoDescriptions } from './demo'

@Component({
  components: Demos,
})
export default class App extends Vue {
  names = Object.keys(Demos).map(d => d.replace('Demo', ''))
  selected = 0

  get demo() {
    return `${this.names[this.selected]}Demo`
  }

  get description() {
    return DemoDescriptions[this.demo]
  }

  Select(index: number) {
    paper.project.activeLayer.removeChildren()
    this.selected = index
  }
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Consolas, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.title {
  background: #333;
  color: #ccc;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  user-select: none;
}

.menu {
  display: flex;
  background: #444;
  padding: 0;

  .item {
    padding: 0.5rem 2rem;
    color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: initial;
    user-select: none;

    &.selected {
      background: #333;
    }

    &:hover {
      background: #555;
    }
  }
}

.description {
  padding: 0.5rem 1rem;;
  background: #555;
  color: #ccc;
}

.stage {
  flex: 1;
}

.zero {
  height: 0;
}
</style>
