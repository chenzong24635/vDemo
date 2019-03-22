<template>
  <div class="">
    <form class="form" action="">
      <group class="form-list">
        <x-input title="旧密码" v-model="json.refpassword" required type="password" placeholder="请输入旧密码"></x-input>
      </group>
      <group class="form-list">
        <x-input title="新密码" v-model="json.password" required type="password" placeholder="请输入新密码"></x-input>
      </group>
      <group class="form-list">
        <x-input title="确认密码" v-model="json.password1" required type="password" placeholder="请再次输入密码"></x-input>
      </group>
      <x-button @click.native="submit" id="sure" type="primary" action-type="button" >确认修改</x-button>
    </form>
    <toast v-model="showToast" type="success" width="130px" :time="1000" :is-show-mask="true" :text="toastText" position="middle"></toast>
    <toast v-model="showToast1" type="warn" width="130px" :time="1000" :is-show-mask="true" :text="toastText1" position="middle"></toast>
  </div>
</template>
<script>
import {Group, XInput, XButton, Toast} from 'vux'
export default {
  name: '',
  components: {
    Group,
    XInput,
    XButton,
    Toast
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
        refpassword: '',
        password: '',
        password1: ''
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
    submit () {
      console.log('s')
      let text = ''
      let status = 0
      if (!this.json.refpassword.trim()) {
        text = '请填写旧密码'
      } else if (!this.json.password.trim()) {
        text = '请填写新密码'
      } else if (!this.json.password1.trim()) {
        text = '请确认新密码'
      } else if (this.json.password.trim() !== this.json.password1.trim()) {
        text = '两次密码不一致'
      } else {
        status = 1
      }
      if (status) { // 修改成功时
        this.reset()
      } else {
        console.log('fail')
        this.toast1(text)
      }
    },
    async reset () {
      let result = await this.axios.post('member/memberpwdedit', this.json)
      // let data = result.data
      if (result.success) {
        this.toast('已成功修改')
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
