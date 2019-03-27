<template>
  <div class="">
    <div>
      <img :src="banner" alt="" :onerror="errorImg" class="img-title">
    </div>
    <div class="one tac">
      <p class="one-title tal vux-1px-b">正品验证</p>
      <img class="img-code" img src="../../assets/images/test/test-1.jpg" alt="">
      <p class="use-time">使用时间：2016.5.1（开始使用）</p>
      <p class="use-way">印制方法：印刷
        <br>防伪码位数：22位
        <br>扫描方式：刮开涂层后进行扫码查看数字
        <br>请刮开涂层，输入22位防伪编码
      </p>
      <group class="form-list">
        <x-input id="iptVal" v-model="code" type="text" placeholder="请输入验证码" ></x-input>
      </group>
      <group class="form-list">
        <x-button @click.native="test" type="primary" action-type="button">验证</x-button>
      </group>
      <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" :time="2000" width="50vw" :is-show-mask="true" position="middle"></toast>
    </div>
  </div>
</template>
<script>
import { Group, XButton, XInput, Toast } from 'vux'
export default {
  name: '',
  components: {
    Group,
    XButton,
    XInput,
    Toast
  },
  data () {
    return {
      toastData: {
        isShow: false,
        type: 'warn',
        text: ''
      },
      banner: '',
      errorImg: 'this.src="' + require('../../assets/images/test/test-banner.jpg') + '"',
      code: ''
    }
  },
  created () {
    this.axios.post('web/adlist', {
      code: 'b3'
    }).then(response => {
      this.banner = this.base_img + response.data[0].img
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    test () {
      if (!this.code) {
        this.toastData = {
          isShow: true,
          type: 'warn',
          text: '请输入验证码'
        }
        return false
      }
      this.axios.get('/web/isfake/' + this.code).then(res => {
        let text = ''
        let type = 'success'
        if (res.success === true) {
          if (res.data) {
            type = 'success'
            text = '经系统验证,您所查询的防伪编码(' + this.code + ')存在.谢谢您的查询!'
          } else {
            type = 'warn'
            text = '经系统验证,您所查询的防伪编码(' + this.code + ')不存在,请核实后再试.谢谢您的查询!'
          }
        } else {
          type = 'warn'
          text = res.errMsg
        }
        this.toastData = {
          isShow: true,
          type: type,
          text: text
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.one{
  padding: 5px 10px;
  .one-title{
    padding: 4px 0;
    color: @color1;
  }
  .img-code{
    width: 40%;
  }
  .form-list{
    #iptVal{padding: 8px 15px;}
    /deep/ .weui-cells{
      &:before{
        border:1px solid @color;
        height: 200%;
      }
      // .weui-input{text-indent: 12px;}
    }
  }
}
</style>
