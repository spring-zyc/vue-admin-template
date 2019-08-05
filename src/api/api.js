import axios from 'axios'

let base = process.env.VUE_APP_BASE_API + '/j'

const request = (url, options={}, method='get') => {
  let key = ~['delete', 'get', 'head'].indexOf(method) ? 'params' : 'data'
  return axios(Object.assign({'url': url, 'method':method, 'validateStatus': false}, {[key]: options})).then(
    res => res)
}

const requestLogin = () => {
  return request(`${base}/login/wx`, {}, 'post')
}

const requestLogout = () => {
  return request(`${base}/logout/wx`, {}, 'post')
}

const getUserList = params => {
  return request(`${base}/users`, params)
}

const getGroupSetings = puid_ => {
  return request(`${base}/settings/group/${puid}`)
}

const updateGroupSetings = (puid, params) => {
  return request(`${base}/settings/group/${puid}`, params, 'put')
}

const getGroupList = params => {
  return request(`${base}/groups`, params)
}

const removeUser = (id, params) => {
  return request(`${base}/user/${id}`, params, 'delete')
}

const removeGroup = id => {
  return request(`${base}/group/${id}`, {}, 'delete')
}

const batchRemoveUser  = params => {
  return request(`${base}/users`, params, 'delete')
}

const batchRemoveGroup  = params => {
  return request(`${base}/groups`, params, 'delete')
}

const addUser = params => {
  return request(`${base}/user/${params.wxid}`, params, 'put')
}

const addUsers = params => {
  return request(`${base}/users`, params, 'put')
}

const addGroup = params => {
  return request(`${base}/groups`, params, 'put')
}

const getAllUsers = (puid) => {
  return request(`${base}/all_users/${puid}`)
}

const sendMessage = params => {
  return request(`${base}/send_message`, params, 'post')
}

const getAllGroups = (puid) => {
  return request(`${base}/all_groups/${puid}`)
}

const getMsgList = params => {
  return request(`${base}/messages`, params)
}

const readAll = (puid) => {
  return request(`${base}/readall/${puid}`, {}, 'post')
}

const flushData = params => {
  return request(`${base}/flush`, params, 'post')
}

module.exports = {
  requestLogin,
  requestLogout,
  getUserList,
  removeUser,
  addUser,
  addUsers,
  batchRemoveUser,
  getGroupList,
  batchRemoveGroup,
  removeGroup,
  getAllUsers,
  getGroupSetings,
  updateGroupSetings,
  sendMessage,
  getAllGroups,
  addGroup,
  getMsgList,
  readAll,
  flushData
};
