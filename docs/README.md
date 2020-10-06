# Paper Vueify
The [**paper-vueify**](https://github.com/glenzli/paper-vueify) library is a bridge from paper.js to Vue, by combine the drawing ability of paper.js and the data-driven flexibility of Vue, it create a powerful tool for data visualization or animations. The use of **paper-vueify** is easy, here I'll show you the basic usage and the basic apis.

:::tip Notice
The basic data strucutres like **PointObject**, **CoordinateObject**, etc are moving to an independent pacakge called [**paper-vueify-datatypes**](https://github.com/glenzli/paper-vueify-datatypes), you can follow this link to the [api documents](https://glenzli.github.io/paper-vueify-datatypes/) of those objects.
:::

## Get Started
After install the pacakge, you have to install the paper-vueify into your Vue environment as a plugin.
```js
import Vue from 'vue'
import PaperVueify from 'paper-vuiefy'
import paper from 'paper'

// you have to pass your own global paper instance to PaperVueify.
Vue.use(PaperVueify, paper)
```
By install **PaperVueify** you will inject three component globally, a **p-canvas**, a **p-item** and a **p-symbol-definition**. If you don't want to pollute the global scope, you can import those components mannually from the library.

:::tip About paper.js
The library do not pack with paper.js, so you have to install it youself. And for typescript project, you may also need to install @types/paper for type declaration files or you may get warnings in console.
```sh
npm i paper -S
npm i @types/paper -D
```
:::

### Using PCanvas
The **p-canvas** is a helper component for paper.js development. Before using paper.js objects, we have to setup the canvas first, **p-canvas** will do this automatically on it's mounting process. You should put the **p-canvas** tag before any **p-item** and **p-symbol-definition** existence to ensure the canvas initialized at first.
<br/>**p-canvas** also comes with a **autoresize** parameter, but enable it, the canvas will automatically resized to it's parent size and generated a **resize** event each time resized.
<br/>Currently, only one canvas is supported in paper-vueify.
```html
<template>
  <div class="container">
    <p-canvas :autosize="true" @resize="AfterResized"></p-canvas>
  </div>
</template>

<script>
export default {
  AfterResized(size) {
    console.log(size) // { width: ?px, height: ?px }
  }
}
</script>
```

### Using Shapes
The **p-item** is a generic load for any paper-vueify primitive object, it has a single prop **element**. You have to notice that **p-canvas** and **p-item** are independent to each other, you don't have to put the **p-item** tag under **p-canvas** tag. Normally, you can put the **p-canvas** tag in your **App.vue**, and put the **p-item** anywhere you need.
```html
<template>
  <div class="some-drawings">
    <p-item :element="rect"></p-item>
  </div>
</template>

<script>
  exprot default {
    data() {
      return {
        rect: RectangleItem({ size: [100, 100] })
      }
    }
  }
</script>
```
There are several primitives in **paper-vueify**, and here are their initialize interfaces (objects like **CoordinateObject** is definited in an independent pacakge called [**paper-vueify-datatypes**](https://glenzli.github.io/paper-vueify-datatypes/)):
```ts
// the base (not for use)
interface PaperItemObject {
  coordinate: CoordinateObject,
  opacity: number,
  visible: boolean,
  selectable: boolean, // controll is an element is selectable by cursor
}

// the shape base (not for use)
interface ShapeItemObject extends PaperItemObject {
  brush: BrushObject,
  stroke: StrokeObject,
  shadow: ShadowObject,
}
```
### Circle
```ts
interface CircleItemObject extends ShapeItemObject {
  radius: number,
}
let circle = CircleItem({ radius, ... }) // every parameter is optional
```

### Ellipse
```ts
interface EllipseItemObject extends ShapeItemObject {
  size: PointObject,
}
let ellipse = EllipseItem({ size, ... })
```

### Path
```ts
/* Path */
interface SegmentObject {
  point: PointObject,
  handleIn: PointObject,
  handleOut: PointObject,
}

interface PathItemObject extends ShapeItemObject {
  segments?: SegmentObject[],
  children?: Array<{ segments: SegmentObject[], closed?: boolean }>,
  closed: boolean,
}
let path = Path({ segments, closed, ... })
// If the closed property of a child path is missing, the parent closed property is used
let compoundPath = Path({ children, closed, ... })
// import { PaperGraphic$ } from 'paper-vueify'
let pathFrom = PaperGraphic$.From(somePath/* paper.Path | paper.CompoundPath */)
```

### PointText
```ts
interface PointTextItemObject extends ShapeItemObject {
  fontFamily: string,
  fontSize: number,
  fontWeight: string,
  justification: 'left' | 'center' | 'right',
  lineHeight: number,
  content: string,
}
let text = PointText({ content: 'Hello World!' })
```

### Polygon
Create a polygon with given points.
```ts
interface PolygonItemObject extends ShapeItemObject {
  points: Array<PointObject>
}
let polygon = PolygonItem({ points, ... })
```

### Polyline
Create a polyline with given points, and the fill brush will always be none.
```ts
interface PolylineItemRenderer extends ShapeItemObject {
  points: Array<PointObject>
}
let polyline = PolylineItem({ points, ... })
```

### Rectangle
```ts
interface RectangleItemObject extends ShapeItemObject {
  size: PointObject,
  radius: PointObject,
}
let rect = RectangleItem({ size, radius, ... })
```

### RegularPolygon
```ts
interface RegularPolygonItemObject extends ShapeItemObject {
  radius: number,
  sides: number,
}
let polygon = Polygon({ radius, sides, ... })
```

### Star
```ts
interface StarItemObject extends ShapeItemObject {
  radius1: number,
  radius2: number,
  points: number,
}
let star = Star({ radius1, radius2, points, ... })
```

## Using group
There is a group element corresponding to paper.Group. You can use **p-item** to mount it as well.
```ts
interface GroupItemObject extends PaperItemObject {
  children: Array<PaperItemObject>
}

let group = GroupItem({ children: [...], ... })
```
:::danger Notice
The **p-item** tag do not support children slot yet, so the following code cannot add the child element into the group element in current version.
```html
<template>
  <p-item :element="group">
    <p-item :element="child"></p-item>
  </p-item>
</template>
```
You have to create a group element with child set as it's children manually, by now.
```html
<template>
  <p-item :element="group"></p-item>
</template>

<script>
export default {
  data() {
    return {
      group: GroupItem({ children: [child] })
    }
  }
}
</script>
```
:::

## Using symbol
The symbol system is a bit different in **paper-vueify**, the **SymbolDefinitionObject** somehow corresponding to the **paper.SymbolDefinition** and the **SymbolItem** is mostly equivalent to the **paper.SymbolItem**.
:::tip Notice
**paper.js** just released it's official decelartions, so the @types/paper is abandoned, the library is updated with the official delcarations.
:::
```ts
interface SymbolDefinitionObject {
  key: string,
  definition: PaperItemObject,
}
let symbolDefinition = SymbolDefinition(uniqueKey, rectangle)

interface SymbolItemObject extends PaperItemObject {
  key: string,
}
let symbol1 = SymbolItem({ key, ... })
let symbol2 = SymbolItem({ key, ... })
```
A symbol definition in **paper-vueify** has a unique key, and should be mounted by **p-symbol-definition**. Then, you can use **p-item** to mount symbols refer exist definitions. Here is an example:
```html
<template>
  <div class="container">
    <p-symbol-definition :element="definition"></p-symbol-definition>
    <p-item :element="symbol"></p-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      definition:  SymbolDefinition('rect', RectangleItem({ size: [100, 100] })),
      symbol: SymbolItem({ key: 'rect', coordinate: Coordinate({ rotation: Math.PI / 4 }) })
    }
  }
}
</script>
```
:::tip About SymbolDefinition
1. A SymbolDefinition is not shown in the canvas.
2. A SymbolDefinition is global, once created with a unique key, you can refer this definition in any other Vue component just by it's key.
:::

## Demo
[Go back to the demo site for some dynamic examples.](https://glenzli.github.io/paper-vueify/)