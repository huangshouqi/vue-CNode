import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router' // 引入路由文件
import './stylus/reset.styl' // 引入样式文件
import store from './store/store' // vuex

// 注册全局过滤器
import * as filters from './assets/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
