import Vue from 'vue'
import App from './App.vue'
import api from './api/api'
import toastRegistry from './vendor/toast/index'
Vue.use(toastRegistry)

Vue.config.productionTip = false

new Vue({
  api,
  render: h => h(App),
}).$mount('#app')
