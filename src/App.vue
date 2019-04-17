<template>
  <div id="app" class="container">
    <div class="title">Paper-Vueify: Demo</div>
    <div class="menu">
      <div v-for="(name, index) in names" :key="index" class="item" :class="{ selected: index === selected }" @click="Select(index)">{{name}}</div>
    </div>
    <div class="stage" :class="{ mobile: mobileLayout }">
      <div class="code-section" :class="{ normal: !mobileLayout }">
        <component :is="doc" class="doc"></component>
      </div>
      <div class="canvas-section">
        <p-canvas :autosize="true" @resize="OnResize"></p-canvas>
      </div>
    </div>
    <component :is="demo" :size="canvasSize" class="zero"></component>
  </div>
</template>

<script lang="ts">
import paper from 'paper'
import { Component, Vue } from 'vue-property-decorator'
import { Demos } from './demo'
import { DemoDocs } from './demodoc'

@Component({
  components: { ...Demos, ...DemoDocs },
})
export default class App extends Vue {
  names = Object.keys(Demos).map(d => d.replace('Demo', ''))
  selected = 0
  mobileLayout = false
  canvasSize = { width: 0, height: 0 }

  get demo() {
    return `${this.names[this.selected]}Demo`
  }

  get doc() {
    return `${this.names[this.selected]}Doc`
  }

  Select(index: number) {
    paper.project.activeLayer.removeChildren()
    this.selected = index
  }

  OnResize(canvasSize: any) {
    if (canvasSize.width > 0 && canvasSize.height > 0) {
      this.canvasSize = canvasSize
    }
    if (window.innerWidth < 1080) {
      this.mobileLayout = true
    } else {
      this.mobileLayout = false
    }
  }
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: Consolas, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
  flex-wrap: wrap;

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

.stage {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .code-section {
    background: #333;
    padding: 2rem 1rem;
    overflow-y: auto;

    &.normal {
      width: 100%;
      max-width: 42rem;
    }
  }

  .canvas-section {
    flex: 1;
  }

  &.mobile {
    flex-direction: column;
    overflow: initial;

    .code-section {
      overflow-y: initial;
    }

    .canvas-section {
      height: 100%;
      min-height: 60rem;
    }
  }
}

.doc {
  color: #ccc;
  p { margin: 0.25rem 0.1rem; }
  pre { margin: 0!important; }
  code {
    font-family: Consolas, 'Avenir', Helvetica, Arial, sans-serif;
  }
}

.zero {
  height: 0;
}

::-webkit-scrollbar-track
{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #222;
}

::-webkit-scrollbar
{
  width: 0.25rem;
  height: 0.25rem;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0 0.25rem #333;
}

::-webkit-scrollbar-thumb
{
	background-color: #eee;
  border: none;
  opacity: 0.75;
  border-radius: 1rem;
}
</style>
