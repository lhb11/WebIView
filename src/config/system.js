/**
 *
 * 平台菜单权限及路由配置说明
 *
 * 1、systemPages 整个system用户的所有页面 需要用户登陆才能使用的所有页面
 * 2、定义在systemPages的每个对象都会生成对应路由，否则未定义，则找不到页面
 * 3、路由规则 system/company/companyList 匹配为  system 平台 category = 'company' 菜单 children 中 url 为 companyList 或子 children 中的 路由
 * 4、匹配 对应 view 为 system 目录下 category 目录下 companyList
 */

const system = {

  title: '系统管理平台',

  pages: {
    menu: [
      {
        title: '酒店管理',
        url: 'company',
        icon: 'crmFontIcon crm_pc-mendian',
        children: [
          {
            title: '酒店管理',
            url: 'companyList',
            right: 'menu.sys.company.companyList'
          }, {
            title: '员工管理',
            url: 'userList',
            right: 'menu.sys.company.userList'
          }
        ]
      }, {
        title: '商品管理',
        url: 'shop',
        icon: 'iconfont icon-xinwen',
        children: [
          {
            title: '分类管理',
            url: 'category',
            right: 'menu.sys.shop.category'
          }, {
            title: '模板管理',
            url: 'skuTemplate',
            right: 'menu.sys.shop.skuTemplate'
          }, {
            title: '商品临期提醒',
            url: 'goodsNotify',
            right: 'menu.sys.shop.goodsNotify'
          }
        ]
      }, {
        title: '售货柜',
        icon: 'iconfont icon-xinwen',
        url: 'salesCounter',
        children: [
          {
            title: '设备管理',
            url: 'deviceManagement',
            right: 'menu.sys.salesCounter.deviceManagement'
          }
        ]
      }, {
        title: '新闻动态',
        icon: 'iconfont icon-xinwen',
        url: 'info',
        children: [
          {
            title: '文章专题',
            url: 'articleList',
            query: {
              type: 'LAW'
            },
            right: 'menu.sys.info.articleList'
          }, {
            title: '职员消息',
            url: 'noticeList',
            right: 'menu.sys.info.noticeList'
          }, {
            title: '意见投诉',
            url: 'complaintList',
            right: 'menu.sys.suspect.alarmList'
          }
        ]
      }, {
        title: '订单中心',
        icon: 'iconfont icon-xinwen',
        url: 'order',
        children: [
          {
            title: '房间消费查询',
            url: 'roomConsume',
            right: 'menu.sys.order.roomConsume'
          }, {
            title: '历史售货柜订单',
            url: 'deviceOrder',
            right: 'menu.sys.order.deviceOrder'
          }, {
            title: '历史前台订单',
            url: 'shopOrder',
            right: 'menu.sys.order.shopOrder'
          }
        ]
      }, {
        title: '系统管理',
        icon: 'crmFontIcon crm_pc-xitongguanli-copy',
        url: 'security',
        children: [
          {
            title: '部门',
            url: 'branch',
            right: 'menu.sys.security.branch'
          }, {
            title: '角色',
            url: 'role',
            right: 'menu.sys.security.role'
          }, {
            title: '系统用户',
            url: 'user',
            right: 'menu.sys.security.user'
          }, {
            title: '系统设置',
            url: 'sysSet',
            right: 'menu.sys.security.sysSet'
          }, {
            title: '修改词典',
            url: 'dictionary',
            right: 'menu.sys.security.dictionary'
          }
        ]
      }
    ]
  },

  filter(user) {
    return system
      .pages
      .menu
      .filter(item => user.menuArrayJson && user.menuArrayJson.indexOf('admin') > -1 || (item.children = item.children.filter(node => user.roles.some(role => role.rightsArrayJson.indexOf(node.right) > -1) || user.rightsArrayJson && user.rightsArrayJson.indexOf(node.right) > -1)).length > 0)
  }
}

export default system
