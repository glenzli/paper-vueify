# vue-paper
## Introduction
**Paper.js** is a very useful tool for creating complicate canvas shapes and animations. But using paper.js for tasks such as data visualiztion is not very convenient, and could produce many redundant code lines. On the other hand, **Vue** is data-driven framework and it's extremely friendly to data related operations. By combining these two powerful tools result a really nice workflow for data visualization and lightweight data-driven animation editing. That's the purpose of **paper-vue**.

## Install
The recommended way to install and maintain paper-vue in your project is through the Node.js Pacakge Manager (NPM), simply type the npm command in your project folder:

```sh
npm install paper-vuew
```

### Usage
Vue only works properly with plain object, the library comes with a series of redefinition of basic paper object, and the parameters of each object is almost identical to the original.
<br/>To use paper-vue, you may import component manually or use the installer to register all the components.
```javascript
import { InstallPaperComponents } from 'paper-vue'

InstallPaperComponents()
```
<br/>**Paper.js** only works after initialized with a canvas element. The library provide a **p-canvas** component, use it before any other components will set the paper.js environment properly. You may treat **p-canvas** as a native canvas since it's just a canvas with automatic initialization. You can pass any canvas parameters or apply any canvas style to this component. And the **p-canvas** also has a **autosize** prop which will automatically resize the canvas to the size of it's container.
```html
<template>
  <p-canvas></p-canvas>
</template>
```
Creating shape in **paper-vue** is really simple, the following code create a round reactive red rectangle, any change to the data object will be reflected on the canvas drawing:
```html
<template>
  <p-item :element="rect"></p-item>
</template>

<script>
  export default {
    data: () => {
      rect = RectangleItem({ size: Point(100, 100), radius: Point(10, 10), brush: SolidBrush(Color$.ToColor('red')) })
    }
  }
</script>
```
**p-item** can be used for all kind of items except symbol definition. In **paper.js**, the idea of symbol saves a lot of resources in drawing, to create a placed symbol, you need create a definition first. In **paper-vue**, you need a **SymbolDefinition** function to create a proper definition, with a unique user specified key to identify the definition. Then, you may create inifinite number of symbol to refer the key. The following code will create 40 symbols refer to the circle. The definition is not displayed, which is consistent with paper.js's.

```html
<template>
  <p-symbol-definition :element="circle"></p-symbol-definitions>
  <p-item v-for="(c, index) in circles" :key="index" :element="c"></p-item>
</template>

<script>
  import { Arrayex } from 'arrayex'

  export default {
    data: () => {
      circle = SymbolDefinition('circle', CircleItem({ radius: 20 }))
      circles = Arrayex.Create(40, () => SymbolItem({ key: 'circle', coordinate: Coordinate({ position: Point(Math.random() * 1000, Math.random() * 1000) }) }))
    }
  }
</script>
```
Document will come later, please wait in patient.

### Demo
In demo folder, you can see some basic plays with **paper-vue**. With the data-reactive framework, it's easy to create very complicate canvas structure and animation (Though, it's not very suitable for very large scale graphic project).
<br/>Use following command to build demo into the docs folder (for github pages).
```sh
npm run demo
```
You can view the demos on my [Github Pages](https://luz-alphacode.github.io/paper-vue/).


## License
Distributed under the MIT license. See [LICENSE](https://github.com/luz-alphacode/paper-vue/blob/master/LICENSE) for detail.
