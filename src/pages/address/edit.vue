<template>
  <div class="">
      <div class="form">
        <group class="form-list">
          <x-input title="收货人" v-model="json.recive" required type="text" placeholder="请输入收件人名称"  autofocus></x-input>
        </group>
        <group class="form-list">
          <x-address @on-hide="hide" @on-show="show" title="地址选择" v-model="addressValue"
          :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" ></x-address>
        </group>
        <group class="form-list">
          <x-textarea  title="详细地址" v-model="json.address" required placeholder="请输入详细地址信息，如街道、门牌号、小区、楼号等等" ></x-textarea>
        </group>
        <group class="form-list">
          <x-input title="手机号码"  v-model.number="json.mobile" required type="tel" placeholder="请输入手机号" ></x-input>
        </group>
        <div id="check" class="tac"><check-icon class="flex01" :value.sync="json.default">设置为默认地址</check-icon></div>
        <div class="btn-link"><x-button @click.native="save" type="primary" >保存</x-button></div>
      </div>
      <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="130px" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import {Group, XInput, XButton, XTextarea, Toast, ChinaAddressData, XAddress, CheckIcon} from 'vux'
export default {
  name: '',
  components: {
    Group,
    XInput,
    XButton,
    XTextarea,
    Toast,
    XAddress,
    CheckIcon
  },
  data () {
    return {
      type: '',
      detail: {},
      toastData: {
        isShow: false,
        type: 'warn',
        text: ''
      },
      addressData: ChinaAddressData,
      addressValue: [],
      onLoadShow: true,
      json: {
        address: '',
        pname: '',
        cname: '',
        rname: '',
        mobile: null,
        recive: '',
        default: true
      }
    }
  },
  created () {
    let id = this.$route.params.id
    this.type = this.$route.params.type
    if (id && id !== 'null') {
      this.json.id = id
      this.getDetail(id)
    }
  },
  methods: {
    getDetail (id) {
      let _this = this
      this.axios.post(this.base_url + 'member/addresslist', {
        order: 'ASC',
        pageNum: 1,
        pageSize: 100
      }).then((response) => {
        response.data.some((item, index) => {
          if (item.id === id) {
            _this.addressValue = [item.pname, item.cname, item.rname]
            _this.json.address = item.address
            _this.json.pname = item.pname
            _this.json.cname = item.cname
            _this.json.rname = item.rname
            _this.json.id = item.id
            _this.json.mobile = item.mobile
            _this.json.recive = item.recive
            console.log(_this.detail)
          }
        })
      })
    },
    onShadowChange (ids, names) { // 省市区改变
      this.json.pname = names[0]
      this.json.cname = names[1]
      this.json.rname = names[2]
      this.addressValue = [names[0], names[1], names[2]]
    },
    hide (bool) {
      if (!bool && (this.json.pname === '省')) { // 如果取消
        this.onLoadShow = true
      }
    },
    show () {
      console.log('show')
    },
    save () {
      let json = this.json
      let text = ''
      if (!json.recive) {
        text = '请填写收货人'
      } else if (JSON.stringify(this.addressValue) === '[]') {
        text = '请选择地址'
      } else if (!json.address) {
        text = '请填写详细地址'
      } else if (!json.mobile) {
        text = '请填写手机号'
      } else {
        console.log(this.json.id)
        if (this.json.id) { // 修改地址
          console.log('c')
          this.axios.post(this.base_url + 'member/addressedit', this.json).then((response) => {
            if (response.success) {
              text = '修改成功'
              this.link(text)
            }
          })
        } else { // 添加地址
          console.log('add')
          this.axios.post(this.base_url + 'member/addressadd', json).then((response) => {
            if (response.success) {
              text = '添加成功'
              this.link(text)
            }
          })
        }
        return false
      }
      this.toastData.type = 'warn'
      this.toastData.text = text
      this.toastData.isShow = true
      console.log('save', text)
    },
    link (text) {
      let _this = this
      _this.toastData.text = text
      _this.toastData.isShow = true
      _this.toastData.type = 'success'
      let timer = setTimeout(() => {
        this.$router.push({name: 'address', params: {type: this.type}})
        clearTimeout(timer)
        return false
      }, 1000)
    }
  }
}
</script>
<style scoped lang="less">
.form{
  padding: 0 20px;
}
#check{
  font-size: 15px;
}
.btn-link{
  margin-bottom: 50px;
}
</style>
