import axios from 'axios'

// api 路径
const API_URL = 'https://cnodejs.org/api/v1'

export function fetch(options, method = 'GET') {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: API_URL + options,
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /*
   * 获取文章列表
   */
  TopicsList(params) {
    return fetch(`/topics/${params}`)
  },

  /*
   * 获取文章详情
   */
  TopicDetail(id) {
    return fetch(`/topic/${id}`)
  },

  /*
   * 获取用户信息
   */
  UserInfo(name) {
    return fetch(`/user/${name}`)
  }
}
