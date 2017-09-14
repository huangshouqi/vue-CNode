import * as types from '../types'

const state ={
  loading: true
}
const actions = {
  toggleLoading({ commit },status) {
        commit(types.TOGGLE_LOADING,false)
  }
}

const mutations = {
  [types.TOGGLE_LOADING](state,status) {
    state.loading = status
  }
}

const getters = {
  toggleLoading: state => state.loading
}

export default {
  state,
  actions,
  getters,
  mutations
}
