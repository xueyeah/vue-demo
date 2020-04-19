'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_BASE_API: '"/prod-api"',
  // 开发环境代理服务器
  devProxy: {
    host: 'localhost', // ip/localhost都可以访问
    port: 8083
  }
}
