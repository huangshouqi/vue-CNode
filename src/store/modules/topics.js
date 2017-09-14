import api from '../../api/api'
import * as types from '../types'

const state = {
  topicsList: [], //文章列表数据
  noReplyList: [],
}

const actions = {
  /*
   * 获取获取文章列表
   */
  getTopicsList({commit}, tab) {
     commit(types.TOGGLE_LOADING, true)
    // api.TopicsList(`?tab=${state.parameter.tab}&page=${state.parameter.page}&limit=${state.parameter.limit}`)
     api.TopicsList(`?tab=${tab}`)
      .then(res => {
        commit(types.GET_TOPICS_LIST, res)
        commit(types.GET_NO_REPLY)
        commit(types.TOGGLE_LOADING, false)
      })
  }
}

const mutations = {
  [types.GET_TOPICS_LIST](state, res) {
      state.topicsList = res.data
  },
  [types.GET_NO_REPLY](state) {
    state.topicsList.forEach(item=>{
      if(item.reply_count === 0){
        state.noReplyList.push(item)
      }
    })
  }
}

const getters = {
  getTopicsList: state => state.topicsList
}

export default {
  state,
  actions,
  getters,
  mutations
}
