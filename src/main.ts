import Vue from 'vue'
import App from './App.vue'
import PaperVueify from './components'
import VueHightlishtJs from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

Vue.config.productionTip = false
Vue.use(PaperVueify)
Vue.use(VueHightlishtJs)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
