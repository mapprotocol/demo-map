import Vue from 'vue'
import App from './App.vue'
import api from './api/api'

Vue.config.productionTip = false

new Vue({
  api,
  render: h => h(App),
}).$mount('#app')
