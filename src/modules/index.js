/* ==========================================================
 *        Vuex 状态管理
 * 简介：
 *  APP灵魂所在，在这里使用Vuex统一管理页面切换动画，状态信息，数据等，
 * 所有对于数据的操作都通过Vuex来进行全局管理，然后对相应的变化做出全局改变。
 * ========================================================== */
import Vue from 'vue'

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({})

export default store
