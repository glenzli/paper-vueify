import Vue from 'vue'
import App from './App.vue'
import { InstallPaperComponents } from './components'

Vue.config.productionTip = false
InstallPaperComponents()

new Vue({
  render: (h) => h(App),
}).$mount('#app')
