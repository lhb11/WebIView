const routers = [
  {
    path: '/',
    component: (resolve) => require(['../views/front/index.vue'], resolve)
  }, {
    path: '/client/login',
    meta: {
      title: '用户登陆'
    },
    component: (resolve) => require(['../views/client/frame/login.vue'], resolve)
  }, {
    path: '/system/login',
    meta: {
      title: '系统管理用户登陆'
    },
    component: (resolve) => require(['../views/system/frame/login.vue'], resolve)
  }, {
    path: '/noPage/404',
    meta: {
      title: '找不到当前页面'
    },
    component: (resolve) => require(['../views/front/noPage.vue'], resolve)
  }

]
export default routers
