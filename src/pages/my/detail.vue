<template>
  <div class="">
    <div class="form">
      <div class="avatar tac">
        <img class="avatar-img" :src="json.pic ? json.pic : avatar" alt="" ref="upload_img">
        <input class="avatar-ipt" @change="uploadImg($event)" ref="upload" type="file"/>
      </div>
      <group class="form-list">
        <x-input title="会员级别" v-model="json.gradeName" readonly type="text" placeholder="请填写昵称"  ></x-input>
      </group>
      <group class="form-list">
        <x-input title="真实姓名" v-model="json.realname"   required type="text" placeholder="请填写真实姓名"  autofocus></x-input>
      </group>
      <group class="form-list">
        <datetime title="出生日期" @on-change="dateChange" v-model="json.birthday" required value-text-align="left"></datetime>
        <!-- <x-input title="出生日期"  v-model="json.birthday" required type="text" placeholder="请输入手机号" ></x-input> -->
      </group>
      <group class="form-list">
        <x-input title="手机号码"  v-model.number="json.mobile" required type="tel" placeholder="请输入手机号" ></x-input>
      </group>
      <group class="form-list">
        <x-input title="电子邮箱"  v-model="json.email" required type="email" placeholder="请输入电子邮箱" ></x-input>
      </group>
      <group class="form-list">
        <x-address @on-hide="hide" @on-show="show" title="地址" v-model="addressValue"
        :list="addressData" @on-shadow-change="onShadowChange" value-text-align="left" placeholder="请选择地址" ></x-address>
      </group>
      <div class="btn-link"><x-button @click.native="save" type="default" >保存</x-button></div>
    </div>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="45vw" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import {dateFormat, Group, XInput, XButton, Toast, ChinaAddressData, XAddress, Datetime} from 'vux'
import {verifyPhone, verifyEmail} from '../../utils/index.js'
export default {
  name: '',
  components: {
    Group,
    XInput,
    XButton,
    Toast,
    XAddress,
    Datetime
  },
  data () {
    return {
      toastData: {
        isShow: false,
        type: 'warn',
        text: ''
      },
      addressData: ChinaAddressData,
      addressValue: ['黑龙江省', '哈尔滨市', '道里区'],
      onLoadShow: true,
      json: {
        pname: '',
        cname: '',
        rname: '',
        email: '',
        mobile: '',
        birthday: '',
        gradeName: '',
        realname: '',
        sex: 1,
        pic: ''
      },
      avatar: require('../../assets/images/my/avatar.png'),
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      }
    }
  },
  created () {
    console.log(this.addressValue)
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.axios.post('member/detail').then((response) => {
        if (response.success) { // dateFormat(66182400000, 'YYYY-MM-DD')
          let data = response.data
          this.addressValue = [data.pname, data.cname, data.rname]
          this.json = {
            address: data.address,
            pname: data.pname,
            cname: data.cname,
            rname: data.rname,
            email: data.email,
            mobile: data.mobile,
            birthday: dateFormat(data.birthday, 'YYYY-MM-DD'),
            gradeName: data.gradeName,
            realname: data.realname,
            sex: 1,
            pic: data.pic
          }
          console.log('getrdetail', this.addressValue, this.json)
        }
      })
    },
    uploadImg (event) {
      let file = event.target.files[0]
      // let file = this.$refs.upload.files[0]
      let reader = new FileReader()
      let dataURL = ''
      reader.onloadend = () => {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        dataURL = reader.result
        this.json.pic = dataURL // 插入到 DOM 中预览
        console.log('dataURL', dataURL)
      }
      reader.readAsDataURL(file) // 读出 base64
    },
    onShadowChange (ids, names) { // 省市区改变
      this.json.pname = names[0]
      this.json.cname = names[1]
      this.json.rname = names[2]
      this.addressValue = [names[0], names[1], names[2]]
      console.log('onShadowChange', this.json, names, this.addressValue)
    },
    hide (bool) {
      if (!bool && (this.json.pname === '省')) { // 如果取消
        this.onLoadShow = true
      }
    },
    show () {
      console.log('show')
    },
    dateChange (value) {
      this.json.birthday = value
      console.log('dateChange', this.json, value)
    },
    save () {
      let _this = this
      let file = this.$refs.upload.files[0]
      console.log(verifyPhone, typeof this.json.mobile)
      if (!this.json.mobile || !verifyPhone(this.json.mobile)) {
        this.toastData = {
          isShow: true,
          type: 'warn',
          text: '请填写正确的手机号'
        }
        return false
      }
      if (!this.json.email || !verifyEmail(this.json.email)) {
        this.toastData = {
          isShow: true,
          type: 'warn',
          text: '请填写正确的邮箱'
        }
        return false
      }
      if (file) {
        let formData = new FormData()
        formData.append('file', file)
        console.log(formData)
        this.axios.post('file/uploadImage', formData).then((response) => {
          if (response.success) {
            console.log('图片上传成功')
            this.json.pic = response.data
          } else {
            this.json.pic = ''
          }
        }).then(() => {
          this.axios.post('member/memberedit', this.json).then((response) => {
            _this.toastFunc(response.success)
            let timer = setTimeout(() => {
              this.$router.push({name: 'my'})
              clearTimeout(timer)
            }, 1000)
          })
        })
      } else {
        this.axios.post('member/memberedit', this.json).then((response) => {
          _this.toastFunc(response.success)
          let timer = setTimeout(() => {
            this.$router.push({name: 'my'})
            clearTimeout(timer)
          }, 1000)
        })
      }
    },
    toastFunc (bool) {
      if (bool) {
        this.toastData = {
          isShow: true,
          type: 'success',
          text: '编辑成功'
        }
      } else {
        this.toastData = {
          isShow: true,
          type: 'warn',
          text: '保存失败'
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.form{
  padding: 20px;
  /deep/ .vux-datetime{color:#595959}
  /deep/ .vux-cell-value{margin-left: 20px;color:#595959;}
}
.avatar{
  position: relative;
  width: 85px;
  height: 85px;
  margin: 10px auto;
  .avatar-img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .avatar-ipt{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.btn-link{margin: 20px auto;}

</style>
