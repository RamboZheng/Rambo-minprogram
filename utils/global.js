const login = require('./lib/login.js')
const http = require('./lib/http.js')
const tool = require('./lib/tool.js')
const api = require('./lib/api.js')

module.exports = {
  login: login.login,
  getUserInfo: login.getUserInfo,
  URL: api.URL,
  STORE: api.STORE,
  requestLoading: http.requestLoading,
  requestGet: http.requestGet,
  requestPost: http.requestPost,
  formatTime: tool.formatTime,
  getPhoneNum: tool.getPhoneNum
}