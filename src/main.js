import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// Clear timeout for no-js message
window.clearTimeout(window.LOAD_TIMEOUT)
document.documentElement.classList.add('has-js')
