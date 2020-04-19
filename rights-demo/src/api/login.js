import request from '@/utils/request'

export const getBaseUrl = process.env.VUE_APP_BASE_API;
// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/verifyCode',
    method: 'get'
  })
}
// 获取验证码
export function getCodeImgByUrl(url) {
  return request({
    url: url,
    method: 'get'
  })
}
