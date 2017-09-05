import Vue from 'vue'
import {apiDefine} from '../libs'
import config from '../config/config'
import client from '../config/client'
import store from './index'

store.registerModule('user', {
  state: {
    wxAutoReg: true,
    loginCheck: false,
    token: localStorage.getItem('token'),
    userPromise: null,
    menu: []
  },
  mutations: {
    // 修改用户信息
    SET_USER_INFO(state, user) {
      debugger
      localStorage.setItem('token', user.token)
      state.user = user
      state.loginCheck = true
      state.menu = client.filter(user)
      if (!state.routers) {
        state.routers = config.createRouter({
          menu: state.menu,
          pages: client.pages.pages,
          title: client.title
        }, 'client')
      }
    },

    // 注销用户
    SET_USER_LOGIN_OUT(state) {
      localStorage.removeItem('token')
      Vue.user = state.user = null
      state.loginCheck = false
    }

  },
  actions: {

    // 登录验证
    loginClientCheck(store, token) {
      return Vue
        .http
        .get(apiDefine.clientUserMine.loginToken, {
          params: {
            token: token
          }
        })
        .then(res => store.commit('SET_USER_INFO', res))
    },

    // 使用用户名密码登陆
    loginClientRegName(store, param) {
      return Vue
        .http
        .get(apiDefine.clientUserMine.loginPass, {params: param})
        .then(res => store.commit('SET_USER_INFO', res))
    },

    // 使用手机号验证码登陆
    loginClientSmsCode(store, param) {
      return Vue
        .http
        .get(apiDefine.clientUserMine.loginSms, {params: param})
        .then(res => store.commit('SET_USER_INFO', res))
    }
  }
})

export default store
