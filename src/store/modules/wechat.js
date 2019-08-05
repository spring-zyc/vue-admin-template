import { login, logout, list } from '@/api/wechat'
import { setToken, removeToken } from '@/utils/auth'


/*
每个微信账户对应一个对象：
{
'id': id,//puid
'avatar': url,
'name': user_.nick_name,
'new': False
}
*/
const state = {
  weChat: [],
  tabName: '',//当前tab name
  tabIndex: -1, //当前tab index
  loginning: false //正在登录
}

const mutations = {
  ADD_WECHAT: (state, wechat) => {
    state.weChat.push(wechat)
  },
  UPD_WECHAT: (state, wechat) => {
    state.weChat.splice(state.tabIndex, 1, wechat)
  },
  SET_WECHAT: (state, wechats) => {
    state.weChat = wechats
  },
  SET_TABNAME: ( state, tabName) => {
    state.tabName = tabName
  },
  SET_TABINDEX: ( state, tabIndex) => {
    state.tabIndex = tabIndex
  },
  SET_LOGIN: ( state, loginning) => {
    state.loginning = loginning
  }
}

const actions = {
  // init wechats
  login({ commit, state }) {
    const newTabName = ++state.tabIndex + ''
    state.tabName = newTabName
    commit('ADD_WECHAT', {
      name: newTabName,
      nick: '新微信登录',
      id: null,
      avatar: null
    })
    return new Promise((resolve, reject) => {

      login().then(response => {
        const { data } = response
        console.log('login finished ----',data)
        state.tabName = data.nick
        commit('UPD_WECHAT', data)
        state.loginning = false
        resolve(data)
      }).catch(error => {
        state.loginning = false
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
  logout({ commit, state }, tabName) {

    const tabs = state.weChat
    let activeName = state.tabName
    if (activeName === tabName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    state.tabName = activeName
    state.weChat = tabs.filter(tab => tab.name !== targetName)
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

