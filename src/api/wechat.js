import request from '@/utils/request'

export function list() {
  return request({
    url: '/wxes',
    method: 'get'
  })
}

export function login() {
  return request({
    url: '/login/wx',
    method: 'get'

  })
}

export function logout(puid) {
  return request({
    url: '/logout/wx/'+puid,
    method: 'post'

  })
}
