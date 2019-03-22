<template>
  <div class="">
    <form class="form" action="">
      <group class="form-list">
        <x-input title="手机号" v-model="json.mobile" type="text" placeholder="请输入手机号"></x-input>
      </group>
      <group class="form-list">
        <x-input title="新密码" v-model="json.password" type="text" placeholder="请输入新密码"></x-input>
      </group>
      <group class="form-list">
        <x-input title="验证码" v-model="json.captcha" type="text" placeholder="请输入验证码"></x-input>
        <x-button :disabled="buttonStatus" @click.native="sendCode" id="sendCode" type="primary" action-type="button" >
          <span v-if="!buttonStatus">发送验证码</span>
          <span v-else>{{counts}}s</span>
        </x-button>
      </group>
      <x-button @click.native="submit" id="sure" type="primary" action-type="button" >确认修改</x-button>
    </form>
    <toast v-model="showToast" type="success" width="130px" :time="1000" :is-show-mask="true" :text="toastText" position="middle"></toast>
    <toast v-model="showToast1" type="warn" width="130px" :time="1000" :is-show-mask="true" :text="toastText1" position="middle"></toast>
  </div>
</template>
<script>
import {Group, XInput, XButton, Toast, Countup} from 'vux'
export default {
  name: '',
  components: {
    Group,
    XInput,
    XButton,
    Toast,
    Countup
  },
  data () {
    return {
      showToast: false,
      toastText: '',
      showToast1: false,
      toastText1: '',
      buttonStatus: false,
      counts: 60,
      json: {
        captcha: '',
        mobile: '',
        password: ''
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
      this.$store.state.bottomShow = bool
    },
    async sendCode () {
      let mobile = this.json.mobile
      if (!mobile) {
        this.toast1('请填写手机号')
        return false
      }
      let result = await this.axios.post('common/sendMessageAnd', {
        mobile: this.json.mobile,
        type: 3
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
        text = '请填写新密码'
      } else if (!this.json.captcha.trim()) {
        text = '请填写验证码'
      } else {
        status = 1
      }
      if (status) { // 修改成功时
        this.reset()
      } else {
        this.toast1(text)
      }
    },
    async reset () {
      let result = await this.axios.post('member/pwdedit', this.json)
      // let data = result.data
      if (result.success) {
        this.toast('已成功重置')
        let timer = setTimeout(() => {
          this.$router.push({name: 'my'})
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
#sure{
  margin-top: 40px;
}
</style>
