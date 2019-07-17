import { login, logout, list } from '@/api/wechat'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  weChat: []
}

const mutations = {
  ADD_WECHAT: (state, wechat) => {
    state.weChat.push(wechat)
  },
  SET_WECHAT: (state, wechats) => {
    state.weChat = wechats
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get all wx bot
  list({ commit }) {
    return new Promise((resolve, reject) => {
      list().then(response => {
        const { data } = response
        if (!data) {
          reject('微信bot列表空！')
        }
        commit('SET_WECHAT', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

