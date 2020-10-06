# paper-vueify
![Build State](https://img.shields.io/travis/glenzli/paper-vueify.svg?style=flat-square)
![Coverage](https://img.shields.io/codecov/c/github/glenzli/paper-vueify.svg?style=flat-square)
![License](https://img.shields.io/github/license/glenzli/paper-vueify.svg?color=%23333&style=flat-square)
![Version](https://img.shields.io/github/package-json/v/glenzli/paper-vueify.svg?style=flat-square)
## Introduction
**Paper.js** is a very useful tool for creating complicate canvas shapes and animations. But using paper.js for tasks such as data visualiztion is not very convenient, and could produce many redundant code lines. On the other hand, **Vue** is data-driven framework and it's extremely friendly to data related operations. By combining these two powerful tools result a really nice workflow for data visualization and lightweight data-driven animation editing. That's the purpose of **paper-vueify**. **paper-vueify** is updated with the new official decalartions of **paper.js**.

## Install
The recommended way to install and maintain paper-vueify in your project is through the Node.js Pacakge Manager (NPM), simply type the npm command in your project folder:

```sh
npm install --save paper-vueify
```
Begin with **v1.1.5**, **paper-vueify** is synced with the newest official declarations of **paper.js v0.12.1**, since there are some differences between the **@types/paper** and the official one, PLEASE always use the official declarations in your typescript project and uninstall the **@types/paper** library, or you will get some complie errors.

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
npm run build:demo
```
![Preview](/public/preview.jpg)
The demos come with the docs of this project, You can view the demos on my [Github Pages](https://glenzli.github.io/paper-vueify/).

And you may find the [api reference here](https://glenzli.github.io/paper-vueify/api/).

## License
Distributed under the MIT license. See [LICENSE](https://github.com/glenzli/paper-vueify/blob/master/LICENSE) for detail.
