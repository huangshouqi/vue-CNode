import api from '../../api/api'
import * as types from '../types'

const state = {
  detail: {},
  last_reply_author:{}
}

const actions = {
  getTopicDetail({ commit}, id) {
    commit(types.TOGGLE_LOADING, true)
    api.TopicDetail(id)
      .then(res => {
        commit(types.GET_TOPIC_DETAIL, res)

      })
  }
}

const mutations = {
  [types.GET_TOPIC_DETAIL](state, res) {
    state.detail = res.data
  }
}

const getters = {
  getTopicDetail: state => state.detail
}

export default {
  state,
  actions,
  getters,
  mutations
}
