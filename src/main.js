// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入辅辅助工具 ,详解（http://www.jianshu.com/p/7436e40ac5d1）
import lodash from 'lodash'
// 引入网络请求和过滤器
import {res, filters} from './libs'
Vue.http = res
lodash.mapKeys(filters, (fun, key) => Vue.filter(key, fun))
// 引入iview
import iView from 'iview'
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
