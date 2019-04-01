<template>
  <div class="">
    <section class="faq">
      <ul>
        <li class="list" v-for="item in lists" :key="item.id">
          <h1 :id="item.id" class="title1 vux-1px-b">{{item.title}}</h1>
          <ul>
            <li v-for="item1 in item.lists" :key="item1.id"  :class="[item1.checked ? 'active' : '', 'list1']">
              <div v-if="item1.cid === item.id">
                <h2 @click="expand(item1.cid, item1.id)"  :id="item1.id" class="title2 clearfix">
                  <span class="fl">{{item1.title}}</span>
                  <span v-if="item1.checked" class="fr"><x-icon  type="ios-minus-empty" size="22"></x-icon></span>
                  <span v-else class="fr"><x-icon  type="ios-plus-empty" size="22"></x-icon></span>
                </h2>
                <div v-show="item1.checked" class="cnt" v-html="item1.context"></div>
              </div>
            </li>
          </ul>
          <!-- <ul>
            <li v-for="item1 in lists1" :key="item1.id"  :class="[item1.checked ? 'active' : '', 'list1']">
              <div v-if="item1.cid === item.id">
                <h2 @click="expand(item1.cid, item1.id)"  :id="item1.id" class="title2 clearfix">
                  <span class="fl">{{item1.title}}</span>
                  <span v-if="item1.checked" class="fr"><x-icon  type="ios-minus-empty" size="22"></x-icon></span>
                  <span v-else class="fr"><x-icon  type="ios-plus-empty" size="22"></x-icon></span>
                </h2>
                <div v-show="item1.checked" class="cnt" v-html="item1.context"></div>
              </div>
            </li>
          </ul> -->
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      pid: 0,
      title: '',
      lists: [],
      lists1: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === from.name && to.path !== from.path) {
      this.getBase()
      next()
    }
  },
  created () {
    this.getBase()
    // document.documentElement.scrollTop
    // this.lists1 = this.$store.state.lists1
    // console.log(this.lists)
    // console.log(this.lists1)
    // this.getLists()
  },
  methods: {
    getBase () {
      let pid = this.$route.params.pid / 1
      let title = ''
      let targetId = ''
      this.pid = pid
      switch (pid) {
        case 0:
          title = ''
          break
        case 1:
          title = '售后服务'
          targetId = 'f28c9010f2d54efdbae9491f9e548410'
          break
        case 2:
          title = '配送服务'
          targetId = '2681f91e2b5449fc875bd21558f53da7'
          break
        case 3:
          title = '帮助中心'
          targetId = ''
          break
        case 4:
          title = '隐私条款'
          targetId = '8ab9058117a84b10859aee3f97b359ba'
          break
        case 5:
          title = '条款条件'
          targetId = 'd9508c276a944adc9c6ce2600774dfbd'
          break
        case 6:
          title = '法律声明'
          targetId = ''
          break
        default:
          title = ''
          targetId = '79f950872c414cda9b7bbff50b29a3de'
          break
      }
      this.title = title
      this.lists = this.$store.state.lists
      setTimeout(() => {
        this.lists.map((item, index) => {
          if (pid ===1 || pid ===2 && item.id === targetId){
            console.log('pid', pid)
            console.log('targetId', targetId)
          } else {
            console.log(item)
            item.lists.map((item1, index1) => {
              if (item1.id === targetId) {
                item1.checked = true
              }
            })
          }
        })
        console.log(document.querySelector('#' + targetId))
        let myPosition = document.querySelector('#' + targetId).getBoundingClientRect()
        document.documentElement.scrollTop = myPosition.top - myPosition.height
        console.log(myPosition)
      }, 200)
    },
    expand (cid, id) { // 展开
      console.log(cid, id, this.title)
      this.lists.map((item, index) => {
        if (item.id === cid) {
          console.log('item.id', item.id, item.id === cid)
          item.lists.map((item1, index1) => {
            console.log('item1.id', item1.id, item1.id === id)
            if (item1.id === id) {
              console.log('ck')
              item1.checked = !item1.checked
              console.log(this.lists)
              // this.$store.commit('getLists', this.lists)
            }
          })
          // console.log('item.show ', item1.checked)
        }
      })
    },
    async getLists () {
      let _this = this
      await this.axios.get('web/fagclasslist').then(res => {
        if (res.success) {
          this.lists = res.data
          this.lists.map((item, index) => {
            item.show = false
          })
          this.lists = res.data
          return res.data
        }
      }).then((dataLists) => {
        dataLists.map((item, index) => {
          this.getFaqList(item.id)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getFaqList (id) {
      let _this = this
      await this.axios.get('web/faqlist/' + id).then(res => {
        if (res.success) {
          let lists = res.data
          lists.map((item, index) => {
            item.checked = false
            if (this.title === item.title) {
              item.checked = true
            }
            _this.lists1.push(item)
          })
        }
      })
      console.log(_this.lists1, this.title)
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.faq{
  padding: 20px;
  .list{margin-bottom: 20px;}
  .title1{
    font-size: 20px;
    padding: 4px 0;
  }
  .title2{
    font-weight: normal;
    font-size: 16px;
    padding: 5px;
    color: #717171;
    border-bottom: 1px solid #eee;
  }
  .cnt{
    font-size: 15px;
    line-height: 1.5;
    padding: 10px 16px;
    color:#717171;
    // border-bottom: 1px solid #eee;
  }
  .list1{
    &.active{
      svg{
        fill: @color;
      }
      .title2{
        border-bottom-color: transparent;
        color:@color;
      }
    }
  }
}
</style>
