<template>
  <div class="">
    <section id="lists">
      <ul>
        <li v-for="(item, index) in lists" :key="index" class="list bb10">
          <div @click="chooseAddress(item)" class="clearfix">
            <p class="clearfix"><span class="recive fl">{{item.recive}}</span>
            <span class="mobile fr">{{item.mobile}}</span></p>
            <p class="address">{{item.pname}}{{item.cname}}{{item.rname}}{{item.address}}</p>
          </div>
          <div class="btns  vux-1px-t flex01">
            <!-- <button>设为默认</button> -->
            <x-button @click.native="setDefault(item, index)" mini type="primary" >设为默认</x-button>
            <div class="edit-del flex01">
              <router-link  class="edit flex01" :to="{name: 'addressEdit', params: {id: item.id}}">
                <img src="../../assets/images/common/update.jpg" alt="">
                <span>修改</span>
              </router-link>
              <div @click="del(item.id)" class="del flex01">
                <img src="../../assets/images/common/del.jpg" alt="">
                <span>删除</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <div class="btn-link"><x-button :link="{name: 'addressEdit', params: { id: 'null'}}" type="primary">添加新地址</x-button></div>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="130px" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import { XButton, Toast } from 'vux'
import { mapMutations } from 'vuex'
export default {
  name: '',
  components: {
    XButton,
    Toast
  },
  data () {
    return {
      type: '', // 1: (结算页面的跳转)
      toastData: {
        isShow: false,
        type: 'success',
        text: '修改成功'
      },
      lists: []
    }
  },
  created () {
    this.type = this.$route.params.type / 1
    console.log(this.type)
    this.getLists()
  },
  methods: {
    ...mapMutations([
      'editAddress'
    ]),
    getLists () { // 获取所有地址
      this.axios.post('member/addresslist', {
        order: 'ASC',
        pageNum: 1,
        pageSize: 100
      }).then((response) => {
        this.lists = response.data
        localStorage.setItem('defaultAddress', JSON.stringify(response.data[0]))
        console.log(response)
      })
    },
    del (id) {
      this.axios.get(this.base_url + 'member/addressdel/' + id).then((response) => {
        if (response.success) {
          this.toastData.text = '删除成功'
          this.toastData.type = 'success'
          this.lists.some((item, index) => {
            if (item.id === id) {
              this.lists.splice(index, 1)
              return true
            }
          })
        } else {
          this.toastData.text = '删除失败'
          this.toastData.type = 'warn'
        }
        this.toastData.isShow = true
      })
    },
    setDefault (item, index) { // 设为默认 调用编辑接口（编辑后默认排到第一个）
      if (index === 0) { return false } // 第一个已经是默认地址 无需设置
      let json = {
        address: item.address,
        pname: item.pname,
        cname: item.pname,
        rname: item.rname,
        mobile: item.mobile,
        recive: item.recive,
        id: item.id
      }
      this.axios.post('member/addressedit', json).then((response) => {
        if (response.success) {
          this.toastData.text = '修改成功'
        } else {
          this.toastData.text = '修改失败'
        }
        this.toastData.isShow = true
      })
      this.lists.some((item1, index1) => {
        if (index === index1) {
          this.lists.splice(index1, 1)
          this.lists.unshift(item1)
          return true
        }
        console.log(index, index1)
      })
    },
    chooseAddress (item) { // 结算页面跳转，选择地址
      // type:1 (结算页面跳转)
      // type:0 (其他)
      if (this.type / 1 === 1) {
        this.editAddress(item)
        this.$router.push({name: 'Settle'})
      }
    }
  }
}
</script>
<style scoped lang="less">
.list{
  padding-top: 10px;
  font-size: 15px;
  &:not(:first-child){
    .weui-btn_primary, div .weui-btn_default{
      background-color: #a4a4a4;
    }
  }
  &>div{
    padding: 0 20px;
    /deep/ .weui-btn{
      margin: 0;
      font-size: 12px;
      border-radius: 4px;
      padding: 4px 7px;
      line-height: 1;
    }
  }
  .address{
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 13px;
  }
  .btns{
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 13px;
    img{
      width: 13px;
      height: 13px;
    }
    .edit{
      margin-right: 10px;
    }
  }
}
.btn-link{
  width: 90%;
  margin: 20px auto 50px;
}
</style>
