/**
 * store的一个分支，方便管理对应的store
 */
import Vue from 'vue'
import store from './index'
import {apiDefine} from '../libs'
store.registerModule('third', {
  state: {
    countDown: {
      second: 60,
      text: '发送验证码',
      disable: false
    },
    interVals: []
  },
  mutations: {
    SET_COUNT_DOWN(state, second) {
      state.countDown.second = second
      state.countDown.text = second === 0
        ? '再次发送'
        : '请稍等 ' + second
      state.countDown.disable = second
        ? true
        : false
    },
    SET_CLEAR_INTERVAL(state) {
      state
        .interVals
        .forEach((item) => {
          clearInterval(item)
        })
      state.interVals = []
    },
    SET_PUSH_INTERVAL(state, interVal) {
      state
        .interVals
        .push(interVal)
    }
  },

  actions: {
    thirdSmsCodeSend(store, param) {
      return Vue
        .http
        .get(apiDefine.libThird.smsSend, {params: param})
        .then(() => {
          const _interVal = setInterval(() => {
            store.commit('SET_COUNT_DOWN', store.state.countDown.second - 1)
            if (store.state.countDown.second === 0) {
              clearInterval(_interVal)
            }
          }, 1000)
          store.commit('SET_PUSH_INTERVAL', _interVal)
        })
    }
  }
})
