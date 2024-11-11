import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
