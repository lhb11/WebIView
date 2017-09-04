import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import store from '../modules/user'
import '../modules/iview'
import '../modules/sysUser'
import iView from 'iview'
import {util} from '../libs'

Vue.use(Router)

// 路由配置
const RouterConfig = {
  mode: 'hash',
  routes: routers
}
const router = new Router(RouterConfig)
// 路由跳转的时候过滤是否登录
router.beforeEach((to, from, next) => {
  iView
    .LoadingBar
    .start()
  util.title(to.meta.title)
  if (to.matched.some(item => item.meta.login === 'client') || (to.path.indexOf('/client/') > -1 && to.path !== '/client/login')) {
    const userStore = store.state.user
    const loginClientPath = {
      path: '/client/login',
      query: {
        redirect: to.fullPath
      }
    }
    if (!userStore.loginCheck) {
      if (userStore.token || to.query.token) {
        store
          .dispatch('loginClientCheck', userStore.token || to.query.token)
          .then(res => {
            router.addRoutes(userStore.routers)
            next({path: to.path, query: to.query, params: to.params})
          }, res => next(loginClientPath))
      } else {
        next(loginClientPath)
      }
    } else {
      next()
    }
  } else if (to.matched.some(item => item.meta.login === 'sys') || (to.path.indexOf('/system/') > -1 && to.path !== '/system/login')) {
    const userStore = store.state.sysUser
    const loginSysPath = {
      path: '/system/login',
      query: {
        redirect: to.fullPath
      }
    }
    if (!userStore.loginCheck) {
      if (userStore.token || to.query.token) {
        store
          .dispatch('sysUser/loginSysCheck', userStore.token || to.query.token)
          .then(res => {
            router.addRoutes(userStore.routers)
            next({path: to.path, query: to.query, params: to.params})
          }, res => next(loginSysPath))
      } else {
        next(loginSysPath)
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  iView
    .LoadingBar
    .finish()
  window.scrollTo(0, 0)
  if (to.matched.length > 0) {
    store.commit('SET_BREADCRUMB_DATA', to)
  } else {
    router.push({path: '/noPage/404'})
  }
})

export default router
