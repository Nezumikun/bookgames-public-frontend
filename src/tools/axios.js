import axios from 'axios'
const defaultConfig = {
  baseURL: '/api/'
}

const apiCall = function (url, method = 'post', data = {}) {
  return axios({
    method: method,
    url: url,
    data: data,
    ...defaultConfig
  })
}

export default apiCall
