/**
 * store的一个分支，方便管理对应的store
 */
import store from './index'
store.registerModule('ivew', {
  state: {
    frame: JSON.parse(localStorage.getItem('frame')) || {
      layout: true,
      theme: 'light'
    },
    breadcrumb: {
      list: [],
      category: [],
      page: ''
    }
  },
  mutations: {
    // 设置面包导航数据和菜单数据
    SET_BREADCRUMB_DATA(state, to) {
      state.breadcrumb.list = to.matched
      to
        .matched
        .map(item => {
          item
            .path
            .split('/')
            .map(key => {
              if (key && state.breadcrumb.category.indexOf(key) === -1) {
                state
                  .breadcrumb
                  .category
                  .push(key)
              }
            })
        })
      state.breadcrumb.page = to.path.split('/')[to.path.split('/').length - 1]
    },

    // 设置菜单样式和宽度
    SET_FRAME_STORAGE_DATA(state, frame) {
      state.frame = frame
      localStorage.setItem('frame', JSON.stringify(frame))
    }
  },

  actions: {}
})
