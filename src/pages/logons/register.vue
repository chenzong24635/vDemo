<template>
  <div class="">
    <router-link to="/login" class="return"> <x-icon type="ios-arrow-left" size="30"></x-icon></router-link>
    <form class="form" action="">
      <group class="form-list">
        <x-input title="手机号" v-model="json.mobile" type="text" placeholder="请输入手机号"></x-input>
      </group>
      <group class="form-list">
        <x-input title="密码" v-model="json.password" type="text" placeholder="请输入密码"></x-input>
      </group>
      <group class="form-list">
        <x-input title="确认密码" v-model="password1" type="text" placeholder="请再次输入密码"></x-input>
      </group>
      <group class="form-list">
        <x-input title="验证码" v-model="json.code" type="text" placeholder="请输入验证码"></x-input>
        <x-button :disabled="buttonStatus" @click.native="sendCode" id="sendCode" type="primary" action-type="button" >
          <span v-if="!buttonStatus">发送验证码</span>
          <span v-else>{{counts}}s</span>
        </x-button>
      </group>
      <div id="check" class="check tac">
        <check-icon :value.sync="checkValue" type="plain">
          我已阅读并同意
        </check-icon>
        <router-link class="tk" to="">《Beli品牌官网条款》</router-link>
      </div>
      <x-button @click.native="submit" id="sure" type="primary" action-type="button" >创建账号</x-button>
    </form>
    <toast v-model="showToast" type="success" width="130px" :time="1000" :is-show-mask="true" :text="toastText" position="middle"></toast>
    <toast v-model="showToast1" type="warn" width="130px" :time="1000" :is-show-mask="true" :text="toastText1" position="middle"></toast>
  </div>
</template>
<script>
import {Group, XInput, XButton, Toast, Countup, CheckIcon} from 'vux'
export default {
  name: '',
  components: {
    Group,
    XInput,
    XButton,
    Toast,
    Countup,
    CheckIcon
  },
  data () {
    return {
      checkValue: true,
      showToast: false,
      toastText: '',
      showToast1: false,
      toastText1: '',
      buttonStatus: false,
      mobile: '',
      password: '',
      password1: '',
      code: '',
      counts: 60,
      json: {
        code: '',
        mobile: '',
        password: '',
        source: 2,
        username: ''
      }
    }
  },
  destroyed () { // 销毁时显示
    this.componentsShow(true)
  },
  mounted () { // 隐藏
    this.componentsShow(false)
  },
  methods: {
    componentsShow (bool) {
      this.$store.state.headerShow = bool
      this.$store.state.bottomShow = bool
      this.$store.state.footerShow = bool
    },
    async sendCode () {
      let mobile = this.json.mobile
      if (!mobile) {
        this.toast1('请填写手机号')
        return false
      }
      let result = await this.axios.post('common/sendMessageAnd', {
        mobile: this.json.mobile,
        type: 1
      })
      // let data = result.data
      if (result.success) {
        this.toast('验证码已发送')
        this.buttonStatus = true
      } else {
        this.toast1(result.message)
        return false
      }
      let timer = setInterval(() => {
        if (this.counts <= 0) {
          this.buttonStatus = false
          clearInterval(timer)
          return
        }
        this.counts--
      }, 1000)
      console.log(1)
    },
    submit () {
      let text = ''
      let status = 0
      if (!this.json.mobile.trim()) {
        text = '请填写手机号'
      } else if (!this.json.password.trim()) {
        text = '请填写密码'
      } else if (!this.password1.trim()) {
        text = '请填写新密码'
      } else if (this.json.password !== this.password1) {
        text = '两次密码不一致'
      } else if (!this.json.code.trim()) {
        text = '请填写验证码'
      } else {
        status = 1
      }
      if (status) { // 修改成功时
        this.set()
      } else {
        this.toast1(text)
      }
    },
    async set () {
      let result = await this.axios.post('member/register', this.json)
      // let data = result.data
      if (result.success) {
        this.toast('账号已创建')
        let timer = setTimeout(() => {
          console.log('login')
          this.$router.push({name: 'login'})
          clearTimeout(timer)
        }, 1000)
      } else {
        this.toast1(result.message)
        return false
      }
    },
    toast (mes) { // 成功弹窗
      this.showToast = true
      this.toastText = mes
    },
    toast1 (mes) { // 失败弹窗
      this.showToast1 = true
      this.toastText1 = mes
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.return{
  margin: 20px;
  .vux-x-icon path{
    fill: @color1;
  }
}

.form{
  padding: 20px;
  .form-list{
    position: relative;
    #sendCode{
      position: absolute;
      right: 0;
      bottom: 1px;
      color: #fff;
      background: #6a63aa;
      border: 0;
      font-family: Arial;
      padding: 0;
      font-size: 15px;
      width: 120px;
    }
  }
}

</style>
