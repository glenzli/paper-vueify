import Vue from 'vue'
import App from './App.vue'
import PaperVueify from './components'
import 'highlight.js/styles/atom-one-dark.css'
// tslint:disable-next-line:no-var-requires
const VueHightlishtJs = require('vue-highlightjs')

Vue.config.productionTip = false
Vue.use(PaperVueify)
Vue.use(VueHightlishtJs)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
