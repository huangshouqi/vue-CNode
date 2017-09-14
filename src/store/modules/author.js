import api from '../../api/api'
import * as types from '../types'


const state ={
  authorInfo: {}
}
const actions = {
  getAuthorInfo({ commit }, id) {
    commit(types.TOGGLE_LOADING, true)
    api.UserInfo(id)
      .then(res => {
        commit(types.TOGGLE_LOADING, false)
        commit(types.GET_AUTHOR_INFO, res)
      })
  }
}

const mutations = {
  [types.GET_AUTHOR_INFO](state, res) {
    state.authorInfo = res.data
  }
}

const getters = {
  getAuthorInfo: state => state.authorInfo
}

export default {
  state,
  actions,
  getters,
  mutations
}
