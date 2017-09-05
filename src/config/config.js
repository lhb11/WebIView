import Env from './env'

let config = {
  env: Env,
  // 动态创建路由
  createRouter({
    menu,
    pages,
    title
  }, key) {
    debugger
    // 定义路由及frame
    let route = {
      path: '/' + key,
      meta: {
        login: key
      },
      component: (resolve) => require(['../views/' + key + '/frame/frame.vue'], resolve),
      redirect: '/client/index'
    }

    // 菜单页面
    route.children = menu.map(item => {
      return {
        path: item.url,
        meta: {
          title: item.title
        },
        children: item
          .children
          .map(node => {
            return {
              path: node.url,
              meta: {
                title: node.title
              },
              component: (resolve) => require(['../views/' + key + '/' + item.url + '/' + node.url + '.vue'], resolve),
              children: node.children
                ? node
                  .children
                  .map(child => {
                    return {
                      path: child.url,
                      meta: {
                        title: child.title
                      },
                      component: (resolve) => require(['../views/' + key + '/' + item.url + '/' + node.url + '/' + child.url + '.vue'], resolve)
                    }
                  })
                : null
            }
          }),
        component: (resolve) => require(['../views/' + key + '/' + (item.frame
            ? item.url + '/frame'
            : 'frame/categoryFrame') + '.vue'], resolve)
      }
    })

    // 不在菜单里面的其它页面
    pages && pages.map(item => {
      if (item.url) {
        route
          .children
          .push({
            path: item.url,
            meta: {
              title: item.title
            },
            component: (resolve) => require(['../views/' + key + '/' + item.url + '.vue'], resolve)
          })
      }
    })

    // 控制台首页
    route
      .children
      .push({
        path: 'index',
        meta: {
          title: title + config.env
        },
        component: (resolve) => require(['../views/' + key + '/frame/index.vue'], resolve)
      })

    // 404页面
    route
      .children
      .push({
        path: '*',
        meta: {
          title: '你走错路了'
        },
        component: (resolve) => require(['../views/front/noPage.vue'], resolve)
      })
    debugger
    console.log(route)
    return [route]
  }
}
export default config
