// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

export const weatherApi = axios.create({
  baseURL: 'http://apis.skplanetx.com//weather/',
  timeout: 1000,
  headers: {'appKey': '4a427632-c9ff-3afb-9c4c-f46787312c15'}
})

/* eslint-disable no-new */
Vue.prototype.$appName = 'Hi-Cord'
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
