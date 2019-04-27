# paper-vueify
## Introduction
**Paper.js** is a very useful tool for creating complicate canvas shapes and animations. But using paper.js for tasks such as data visualiztion is not very convenient, and could produce many redundant code lines. On the other hand, **Vue** is data-driven framework and it's extremely friendly to data related operations. By combining these two powerful tools result a really nice workflow for data visualization and lightweight data-driven animation editing. That's the purpose of **paper-vueify**.

## Install
The recommended way to install and maintain paper-vueify in your project is through the Node.js Pacakge Manager (NPM), simply type the npm command in your project folder:

```sh
npm install --save paper-vueify
```
If you are using typescript environment, you may also need to install paper's declaration files:
```sh
npm install --save-dev @types/paper
```

## Usage
Vue only works properly with plain object, the library comes with a series of redefinition of basic paper object, and the parameters of each object is almost identical to the original.
<br/>To use paper-vueify, you may import component manually or use the installer to register all the components.
```javascript
import Vue from 'vue'
import paper from 'paper'
import PaperVueify from 'paper-vueify'

// the install process register 3 components into the global scope, p-canvas, p-item and p-symbol-definition
// the secondary parameter paper is to register your paper variable in current scope, or there will be two seperated PaperScope and the p-canvas will not work properly.
Vue.use(PaperVueify, paper)
```

## Demo
In demo folder, you can see some basic plays with **paper-vueify**. With the data-reactive framework, it's easy to create very complicate canvas structure and animation (Though, it's not very suitable for very large scale graphic project).
<br/>Use following command to build demo into the docs folder (for github pages).
```sh
npm run demo
```
![Preview](/public/preview.jpg)
The demos come with the docs of this project, You can view the demos on my [Github Pages](https://luz-alphacode.github.io/paper-vueify/).

## Api
The demo has showed the basic use of this library. Here I will list a simple API reference doc.
### Point
The library comes with a simple **PointObject** interface, with a **Point** and a **PolarPoint** function to create it (plain object).
```javascript
export type PointObject = { x: number, y: number }

let point = Point(0/*x*/, 0/*y*/) // { x: 0, y: 0 }
let polarPoint = PolarPoint(1/*r*/, 0/*θ in radian*/) // { x: 1, y: 0 }
```
There is a **Point$** util for point operations, almost every function name is self explanatory so I'd like to skip the documentation.
<br/>**Purify(point)** converts a point instance (like paper.Point) to plain object, which is good for vue usage.

### Color
There is a **ColorObject** with each component is normalized, thus, every channel in this object is ranged in [0, 1]. There is a **Color** function to create it. You can also use **HsvColor** function to create a **HsvColorObject**, which is the hsv color-space represtation of color (also normalized). You can use functions in **Color$** util to convert from one to another.
```javascript
export type ColorObject = { red: number, green: number, blue: number, alpha: number }
export type HsvColorObject = { hue: number, saturation: number, value: number, alpha: number }

let color = Color(1, 1, 1, 1) // rgb(255, 255, 255, 1)
let hsvColor = Color$.ToHsv(color)
let color2 = Color$.ToColor(hsvColor) // rgb(255, 255, 255, 1)
// ToColor(color) also accepts css string
let color3 = Color$.ToColor('rgba(255, 255, 255, 1)')
```
**Purify(color)** converts a complicate color-interfaced instance into a plain object (like paper.Color).
<br/>**ToHex(color)** and **ToCss(color)** gives you *# expression* or *rgba/rgb expression*.
<br/>**HighContrast(color)** gives either white or black which has more contrast to given color, it's useful for automatic foreground color.
There is a **ColorstopObject**, which has following interface, is used by Gradient Brush.
```javascript
export type ColorstopObject = { offset: number, color: ColorObject }

let colorstop = Colorstop(0.5, Color$.ToColor('white'))
```

### Brush
There are four brushes in **paper-vueify**, **NoneBrush**, **SolidBrush**, **LinearBrush** and **RadialBrush**.
<br/>**NoneBrush()** creates a null brush and **SolidBrush(colorObject)** creates a solid one. **LinearBrush(options)** allow you to control start/end point and colorstops, which is same as those parameters in paper.Gradient.
<br/>**RadialBrush(options)** corresponding the the radial case in paper.Gradient, the **bias** param is corresponding to the highlight param in paper.Graident.
```javascript
let none = NoneBrush()
let solidBrush = SolidBrush(Color$.ToColor('red'))
let linearBrush = LinearBrush({
  start: [0, 0],
  end: [1, 1],
  colorstops: [Color$.ToColor('black'), Color$.ToColor('white')]
})
let radialBrush = RadialBrush({
  start: [0.5, 0.5],
  end: [1, 1],
  bias: [0, 0],
  colorstops: [Color$.ToColor('black'), Color$.ToColor('white')]
})
```
The **Brush$** util is written for another project and useless in this project, you may ignored it.

### Stroke
To be continued.


## License
Distributed under the MIT license. See [LICENSE](https://github.com/luz-alphacode/paper-vueify/blob/master/LICENSE) for detail.
