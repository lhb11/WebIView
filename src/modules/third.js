
import {apiDefine} from '../libs'
import store from './index'
import Vue from 'vue'

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
      debugger
      state.countDown.second = second
      state.countDown.text = second === 0 ? '再次发送' : '请稍等 ' + second
      state.countDown.disable = second < 0
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
export default store
