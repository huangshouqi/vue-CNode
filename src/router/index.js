import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Topic from '../pages/Topic'
import User from '../pages/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/topic/:id',
      component: Topic
    },
    {
      path: '/user/:name',
      component: User
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition  //游览器返回记住位置
    } else {
      return { x: 0, y: 0 } //滚动到顶
    }
  }
})
