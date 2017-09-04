export default {
  // 接口地址,所有的接口地址
  baseUrl: 'http://ezshop.cn/sugou',

  // 图片地址
  photoUrl: 'https://img.sugou.org/',

  // LIB-THIRD-第三方平台转接

  libThird: {
    // 发送短信验证码
    smsSend: '/api/v1/lib/third/sms/send',

    // wxRedirctState
    wxRedirctState: '/api/v1/client/wx/redirect',

    // 根据参数生成微信重定向URL的链接
    wxRedirectUrl: '/api/v1/lib/third/wxRedirectUrl'
  },

  // CLIENT-无需登录公共查看
  client: {
    user: '/api/v1/client/user'
  },

  // CLIENT-个人用户-本人操作
  clientUserMine: {

    // 用户登录-使用token
    loginToken: '/api/v1/client/user/op/login/token',

    // 用户登录-使用微信unionId
    loginUnionId: '/api/v1/client/user/op/login/unionId',

    // 用户登录-使用微信openID
    loginOpenId: '/api/v1/client/user/op/login/openId',

    // 用户登录-使用账号密码
    loginPass: '/api/v1/client/user/op/login/pass',

    // 用户登录-使用短信验证码
    loginSms: '/api/v1/client/user/op/login/sms',

    // 用户注销
    loginOut: '/api.cli/v1/client/user/op/logout',

    // 微信用户自动注册,并绑定手机号
    regOpenId: '/api/v1/client/user/op/register/openId'

  },

  // SUGOU-酒店管理
  sugouManage: {

    // SKU-列表, 不返回设置删除位的sku
    sku: '/api.cli/v1/sugou/manage/sku',

    // 设置SKU的有货断货状态
    skuState: '/api.cli/v1/sugou/manage/op/sku/state/:id'
  },

  // SUGOU-酒店管理-订单
  sugouManageOrder: {

    // 店内购物订单-活动
    current: '/api.cli/v1/sugou/manage/order/query/order/current',

    // 店内购物订单-确认订单
    confirm: '/api.cli/v1/sugou/manage/order/op/order/confirm/:id',

    // 店内购物订单-完成送货
    deliver: '/api.cli/v1/sugou/manage/order/op/order/deliver/:id',

    // 店内购物订单-历史
    history: '/api.cli/v1/sugou/manage/query/order/history'
  },

  // SYS-用户-本人操作

  sysUserMine: {

    // 修改用户自己的密码
    changePass: '/api.sys/v1/sys/user/mine/op/changePass',

    // 获取用户自己的详情  修改用户自己的信息
    info: '/api.sys/v1/sys/user/mine/op/data',

    // 系统用户注销
    loginOut: '/api.sys/v1/sys/user/mine/op/logout',

    // 用户登录-使用密码
    loginPass: '/api/v1/sys/user/mine/op/login/pass',

    // 用户登录-手机号+验证码
    loginSms: '/api/v1/sys/user/mine/op/login/sms'

  },

  libUtil: {

    // 防暴力破解-图片生成
    kaptchaImg: '/api/v1/lib/util/kaptcha/'
  }
}

