import Vue from 'vue'
import Vuex from 'vuex'

import topics  from './modules/topics'
import detail  from './modules/detail'
import author from './modules/author'
import common from './modules/common'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    common,
    topics,
    detail,
    author
  },
  strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
})
