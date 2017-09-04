import Vue from 'vue'
import {apiDefine} from '../libs'
import config from '../config/config'
import system from '../config/system'
import store from './index'

store.registerModule('sysUser', {
  namespaced: true,
  state: {
    wxAutoReg: true,
    loginCheck: false,
    token: localStorage.getItem('sysUserToken'),
    userPromise: null,
    menu: []
  },
  mutations: {
    // 修改用户信息
    SET_USER_INFO(state, sysUser) {
      localStorage.setItem('sysUserToken', sysUser.token)
      state.sysUser = sysUser
      state.loginCheck = true
      state.menu = system.filter(sysUser)
      if (!state.routers) {
        state.routers = config.createRouter({
          menu: state.menu,
          pages: system.pages.pages,
          title: system.title
        }, 'system')
      }
    },

    // 注销用户
    SET_USER_LOGIN_OUT(state) {
      localStorage.removeItem('sysUserToken')
      state.sysUser = null
      state.loginCheck = false
    }

  },
  actions: {

    // 登录验证
    loginSysCheck(store, token) {
      return Vue
        .http
        .get(apiDefine.sysUserMine.info, {
          params: {
            token: token
          }
        })
        .then(res => store.commit('SET_USER_INFO', res))
    },

    // 使用用户名密码登陆
    loginSysRegName(store, param) {
      return Vue
        .http
        .get(apiDefine.sysUserMine.loginPass, {params: param})
        .then(res => store.commit('SET_USER_INFO', res))
    },

    // 使用手机号验证码登陆
    loginSysSmsCode(store, param) {
      return Vue
        .http
        .get(apiDefine.sysUserMine.loginSms, {params: param})
        .then(res => store.commit('SET_USER_INFO', res))
    }

  }
})

export default store
