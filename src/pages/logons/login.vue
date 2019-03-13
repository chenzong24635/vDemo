<template>
  <div class="">
    <div class="login">
      <router-link class="close" to="/index"><img src="../../assets//images/common/login-close.jpg" /></router-link>
      <router-link  class="logo " to="/index"><img src="../../assets//images/common/login-logo.jpg" /></router-link>
      <form action="">
        <group class="form-list">
          <x-input title="用户名" type="text" placeholder="请输入用户名、邮箱、手机" v-model="json.username"></x-input>
        </group>
        <group class="form-list">
          <x-input title="密码" type="password" placeholder="请输入密码" v-model="json.password"></x-input>
        </group>
        <p class="reset tar"><router-link  to="/resetPassword">忘记密码？</router-link></p>
        <x-button @click.native="submit" type="primary" action-type="button">登录</x-button>
        <p class="register">
          <span>还没有璧丽账户？</span>
          <router-link to="/register">立即注册</router-link>
        </p>
      </form>
    </div>
    <toast v-model="showPositionValue" type="warn" width="130px" :time="1000" :is-show-mask="true" :text="errMsg" position="middle"></toast>
  </div>
</template>
<script>
import {Group, XInput, XButton, Toast} from 'vux'
import {cookie} from '../../utils/index.js'

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
      showPositionValue: false,
      errMsg: '',
      json: {
        username: '',
        password: ''
      }
    }
  },
  destroyed () { //销毁时显示
    this.componentsShow(true)
  },
  created () { //隐藏头部、底部内容、底部导航
    this.componentsShow(false)
    console.log(cookie)
  },
  methods: {
    componentsShow(bool) {
      this.$store.state.headerShow = bool
      this.$store.state.bottomShow = bool
      this.$store.state.footerShow = bool
    },
    async submit () {
      if (!this.json.username) {
        this.showPositionValue = true
        this.errMsg = '用户名不能为空'
        return false
      }
      if (!this.json.password) {
        this.showPositionValue = true
        this.errMsg = '密码不能为空'
        return false
      }
      let result = await this.axios.post(this.base_url + 'member/login', this.json)
      let data = result.data
      console.log(result)
      if (result.status !== 200) {
        this.showPositionValue = true
        this.errMsg = result.message
        return false
      }
      if (result.success) {
        cookie.set('accessToken', data.accessToken)
        sessionStorage.setItem('id', data.id)
        sessionStorage.setItem('username', data.username)
        this.$router.push({name: 'my'})
      }
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.vux-1px-b:after{
  border-bottom-color: @color;
}
.login{
  padding: 20px;
}
.close{
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  img{
    width: 15px;
  }
}
.logo{
  display: block;
  margin: 50px auto;
  text-align: center;
  img{
    width: 60%;
  }
}
.form-list{
  font-size: 30px;
  padding: 2px 0;
  /deep/ .weui-cells{
    margin-top: 10px;
    font-size: 15px;
    &:before{border-top: none;}
    &:after{
      border-bottom-color:@color1;
    }
    .weui-label{
      color:#595959;
    }
    .weui-cell{
      padding-left: 0;
      padding-right: 0;
    }
    .weui-input,.weui-input:focus{
      border: none;
      color:#595959;
    }
  }
}
.reset{
  font-size: 15px;
  margin: 15px 0;
  a{color:#a6a6a6;}
}
.weui-btn_primary{
  background-color: @color;
  &:not(.weui-btn_disabled):active{
    background-color: @color;
  }
}
.register{
  margin-top: 10px;
  span{
    color:#595959;
    font-size: 14px;
  }
  a{
    color:@color;
    font-size: 14px;
    border-bottom: 1px solid #4b376e;
  }
}
</style>
