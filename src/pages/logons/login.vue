<template>
  <div class="">
    <div class="login">
      <router-link class="close" to="/index"><img src="../../assets//images/common/login-close.jpg" /></router-link>
      <router-link  class="logo " to="/index"><img src="../../assets//images/common/login-logo.jpg" /></router-link>
      <form class="form">
        <group class="form-list">
          <x-input title="手机号" type="tel" placeholder="请输入手机号" v-model="json.username" autofocus></x-input>
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
    <toast v-model="showPositionValue" type="warn" width="45vw" :time="1000" :is-show-mask="true" :text="errMsg" position="middle"></toast>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {cookie, Group, XInput, XButton, Toast} from 'vux'
import {verifyPhone} from '../../utils/index.js'

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
  destroyed () { // 销毁时显示
    this.components([true, true, true])
    // this.componentsShow(true)
  },
  mounted () { // 隐藏头部、底部内容、底部导航
    // this.componentsShow(false)
    this.components([false, false, false])
  },
  methods: {
    ...mapMutations([
      // 将 `this.changeToken(args)` 映射为 `this.$store.commit('changeToken', args)`
      // 对应store/index.js的mutations方法
      'changeToken',
      'components'
    ]),
    componentsShow (bool) {
      this.$store.state.headerShow = bool
      this.$store.state.bottomShow = bool
      this.$store.state.footerShow = bool
    },
    async submit () {
      if (!this.json.username || !verifyPhone(this.json.username)) {
        this.showPositionValue = true
        this.errMsg = '请填写正确手机号'
        return false
      }
      if (!this.json.password) {
        this.showPositionValue = true
        this.errMsg = '密码不能为空'
        return false
      }
      let result = await this.axios.post('member/login', this.json)
      let data = result.data
      console.log(result)
      if (result.success) {
        // 设置cookie
        cookie.set('accessToken', data.accessToken)
        console.log(this.changeLogin)
        // 将用户token保存到vuex中
        this.changeToken({accessToken: data.accessToken})
        localStorage.setItem('id', data.id)
        localStorage.setItem('username', data.username)
        localStorage.setItem('mobile', data.mobile)
        localStorage.setItem('password', data.password)
        this.$router.push({name: 'my'})
      } else {
        this.showPositionValue = true
        this.errMsg = result.message
        return false
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
.form{
  padding: 20px;
}
.close{
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 20px;
  text-align: center;
  img{
    width: 18px;
  }
}
.logo{
  display: block;
  margin: 40px auto;
  text-align: center;
  img{
    width: 60%;
  }
}

.reset{
  font-size: 15px;
  margin: 15px 0;
  a{color:#a6a6a6;}
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
