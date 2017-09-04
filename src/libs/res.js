/**
 * 主要网络请求和路由过滤
 */
import apiDefine from './apiDefine'
import axios from 'axios'
import Vue from 'vue'
import iView from 'iview'
Vue.use(iView)
import store from '../modules'

const res = axios.create({baseURL: apiDefine.baseUrl, timeout: 30000})
res
  .interceptors
  .request
  .use(config => {
    // url中的以:为参数的项目替换
    const url = config
      .url
      .match(/\/:(\w+)/g)
    const param = config.params || config.data
    if (url && url.length) {
      url.map((item) => {
        config.url = config
          .url
          .replace(item, '/' + param[item.substr(2)])
      })
    }

    // 登录token拦截
    if (Vue.user && config.url.indexOf('.cli') > -1) {
      config.url = config.url + '?token=' + Vue.user.token
    }

    if (Vue.sysUser && config.url.indexOf('.sys') > -1) {
      config.url = config.url + '?token=' + Vue.sysUser.token
    }

    // 发送数据 json 处理
    if (config.method === 'post' && config.data && typeof config.data === 'object') {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      config.data = resTools.paramToJson(config.data)
      let ret = ''
      for (let it in config.data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(JSON.stringify(config.data[it])) + '&'
      }
      config.data = ret
    }
    iView
      .LoadingBar
      .start()
    return config
  }, (error) => {
    return Promise.reject(error)
  })

// 接收拦截器
res
  .interceptors
  .response
  .use(response => {
    // post操作
    if (response.config.method === 'post') {
      iView
        .Message
        .success('操作成功')
    }
    iView
      .LoadingBar
      .finish()
    response.data = resTools.fromJson(response.data)
    return response.data
  }, (error) => {
    if (error.response) {
      console.log(iView)
      // 错误处理
      if (error.response.data && error.response.data.error_message) {
        iView
          .Message
          .warning(error.response.data.error_message)
      }

      // 登录
      if (error.response.status === 401) {
        if (error.config.url.indexOf('api.cli') > -1) {
          store.commit('SET_USER_LOGIN_OUT')
        } else if (error.config.url.indexOf('api.sys') > -1) {
          store.commit('SET_USER_INFO')
        }
      }
    }
    iView
      .LoadingBar
      .finish()
    return Promise.reject(error)
  })

const resTools = {
  // 获取到的数据进行 json字符串解析
  fromJson: obj => {
    if (typeof obj === 'string' && isNaN(parseInt(obj))) {
      try {
        obj = JSON.parse(obj)
      } catch (e) {}
    }
    if (obj instanceof Array) {
      obj
        .forEach(function(item) {
          item = resTools.fromJson(item)
        })
    }
    if (obj instanceof Object) {
      for (var i in obj) {
        obj[i] = resTools.fromJson(obj[i])
      }
    }
    return obj
  },
  // 发送到服务器的数据进行 json字符串转换
  paramToJson: data => {
    let objDeal = function(obj) {
      for (var key in obj) {
        if (typeof obj[key] === 'object' && key !== '$promise') {
          searchObject(obj[key])
        }
        if (obj[key] && key.substr(-4, 4) === 'Json' && typeof obj[key] === 'object') {
          obj[key] = JSON.stringify(obj[key])
        }
      }
    }
    let searchObject = function(object) {
      if (object instanceof Array && object.length > 0) {
        object
          .forEach(function(item) {
            searchObject(item)
          })
      } else if (object instanceof Object) {
        objDeal(object)
      }
    }
    for (var key in data) {
      searchObject(data[key])
      if (typeof data[key] === 'object') {
        data[key] = resTools.paramToJson(data[key])
      }
    }
    return data
  }
}

export default res
