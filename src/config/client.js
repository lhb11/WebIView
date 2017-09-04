/**
 *
 * 平台菜单权限及路由配置说明
 *
 * 1、clientPages 整个client用户的所有页面 需要用户登陆才能使用的所有页面
 * 2、定义在clientPages的每个对象都会生成对应路由，否则未定义，则找不到页面
 * 3、路由规则 client/company/companyAuditInfo 匹配为  client 平台 category = 'company' 菜单 children 中 url 为 companyAuditInfo 或子 children 中的 路由
 * 4、匹配 对应 view 为 client 目录下 category 目录下 companyAuditInfo
 */
const client = {
  title: '客户管理中心',
  pages: {
    // 定义菜单页面
    menu: [
      {
        title: '门店管理',
        url: 'company',
        icon: '',
        role: ['admin'],
        children: [
          {
            title: '门店信息',
            url: 'companyAuditInfo',
            children: [
              {
                title: '新增员工',
                url: 'adduser'
              }
            ]
          }, {
            title: '员工列表',
            url: 'userList'
          }, {
            title: '售货柜管理',
            url: 'devices'
          }
        ]
      }, {
        title: '商品管理',
        url: 'shop',
        icon: '',
        role: ['admin'],
        children: [
          {
            title: '商品设置',
            url: 'sku'
          }, {
            title: '摆放模板',
            url: 'skuPlacedTemplate'
          }, {
            title: '摆放管理',
            url: 'skuPlacedRule'
          }
        ]
      }, {
        title: '订单中心',
        url: 'order',
        icon: '',
        role: ['admin'],
        children: [
          {
            title: '前台待送订单',
            url: 'order'
          }, {
            title: '房间消费查询',
            url: 'roomConsume'
          }, {
            title: '货柜历史订单',
            url: 'boxOrder'
          }, {
            title: '前台历史订单',
            url: 'orderHistory'
          }
        ]
      }, {
        title: '财务中心',
        url: 'finance',
        icon: '',
        role: ['admin'],
        children: [
          {
            title: '货柜销售汇总',
            url: 'userList'
          }, {
            title: '前台销售汇总',
            url: 'userList'
          }
        ]
      }
    ],
    // 不放在菜单里面的页面
    pages: [
      {
        title: '帮助中心'
      }
    ]
  },
  filter(user) {
    return client
      .pages
      .menu
      .filter(item => !item.role || (item.role.indexOf('admin') > -1 && user.company && user.company.adminClientUser === user.id) || user.rolesArrayJson && user.rolesArrayJson.some(role => item.role.indexOf(role) > -1))
  }
}

export default client
