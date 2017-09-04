<template>
  <div class="index">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
      <h1>
        <img src="https://raw.githubusercontent.com/iview/iview/master/assets/logo.png">
      </h1>
      <div class="login_form">
        <Tabs v-model="tabType">
          <Tab-pane label="用户名密码" name="1">
            <Form ref="accountForm" :model="accountForm" :rules="accountFormRule">
              <Form-item prop="regAccount">
                <Input type="text" v-model="accountForm.regAccount">
                <Icon type="ios-person-outline" class="p-l-10 p-r-10" slot="prepend"></Icon>
                </Input>
              </Form-item>
              <Form-item prop="pass">
                <Input type="password" v-model="accountForm.pass">
                <Icon type="ios-locked-outline" class="p-l-10 p-r-10" slot="prepend"></Icon>
                </Input>
              </Form-item>
            </Form>
          </Tab-pane>
          <Tab-pane label="手机号验证码" name="2">
            <Form ref="mobileForm" :model="mobileForm" :rules="mobileFormRule">
              <Form-item prop="regMobile">
                <Input type="text" v-model="mobileForm.regMobile">
                <Icon type="ios-person-outline" class="p-l-10 p-r-10" slot="prepend"></Icon>
                </Input>
              </Form-item>
              <Form-item prop="smsCode">
                <Row>
                  <Col span="18">
                  <Input type="text" v-model="mobileForm.smsCode">
                  <Icon type="ios-locked-outline" class="p-l-10 p-r-10" slot="prepend"></Icon>
                  </Input>
                  </Col>
                  <Col span="6">
                  <Button type="ghost" @click.native="sendSms" :disabled="countDown.disable">{{countDown.text}}</Button>
                  </Col>
                </Row>
              </Form-item>
            </Form>
          </Tab-pane>
        </Tabs>
        <Form>
          <Form-item>
            <Button type="primary" @click="login">登录</Button>
            <a href="#/client/reg">
              <Button type="ghost" style="margin-left: 8px">立即注册</Button>
            </a>
          </Form-item>
        </Form>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import md5 from 'md5'
import {
  mapState
} from 'vuex'
import store from '../../../modules/third'
console.log(store)
export default {
  data() {
    return {
      tabType: '1',
      accountForm: {
        regAccount: '',
        pass: ''
      },
      mobileForm: {
        regMobile: '',
        smsCode: ''
      },
      accountFormRule: {
        regAccount: [{
          required: true,
          trigger: 'blur',
          message: '请输入登陆用户名'
        }],
        pass: [{
          required: true,
          trigger: 'blur',
          message: '请输入登陆密码'
        }]
      },
      mobileFormRule: {
        regMobile: [{
          required: true,
          trigger: 'blur',
          message: '请输入正确的手机号'
        }],
        smsCode: [{
          required: true,
          trigger: 'blur',
          message: '请输入正确的验证码'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      countDown: state => state.third.countDown
    }),
    countDown() {
      debugger
      console.log(this.$store.state.third.countDown)
    }
  },
  methods: {
    loginSuccess(res) {
      this.$router.addRoutes(this.$store.state.user.routers)
      this.$router.push({
        path: this.$route.query.redirect || '/client/index'
      })
    },
    login() {
      if (this.tabType === 1) {
        this.$refs.accountForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('loginClientRegName', {
              regAccount: this.accountForm.regAccount,
              regMd5Pass: md5(this.accountForm.pass)
            }).then(this.loginSuccess)
          }
        })
      } else {
        this.$refs.mobileForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('loginClientSmsCode', {
              regMobile: this.mobileForm.regMobile,
              smsCode: this.mobileForm.smsCode
            }).then(this.loginSuccess)
          }
        })
      }
    },
    sendSms() {
      debugger
      if (this.mobileForm.regMobile) {
        this.$store.dispatch('thirdSmsCodeSend', {
          mobile: this.mobileForm.regMobile
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  h1 {
    height: 80px;
    img {
      height: 100%;
    }
  }
  .ivu-row-flex {
    height: 100%;
  }
  .login_form {
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
