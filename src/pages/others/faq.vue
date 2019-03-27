<template>
  <div class="">
    <section class="faq">
      <!-- {{lists1}} -->
      <ul>
        <li class="list" v-for="item in lists" :key="item.id">
          <!-- {{item.lists}} -->
          <h1  class="title1 vux-1px-b">{{item.title}}</h1>
          <!-- <ul>
            <li v-if="item.show" v-for="item1 in lists1" :key="item1.id" >
              <h2 @click="expand(item.id, item1.id)" class="title2 vux-1px-b clearfix">
                <span class="fl">{{item1.title}}</span>
                <span v-if="item1.checked" class="fr"><x-icon  type="ios-minus-empty" size="16"></x-icon></span>
                <span v-else class="fr"><x-icon  type="ios-plus-empty" size="16"></x-icon></span>
              </h2>
              <div class="cnt" v-html="item1.context"></div>
            </li>
          </ul> -->
          <ul>
            <li v-for="item1 in item.lists1" :key="item1.id"  :class="[item1.checked ? 'active' : '', 'list1']">
              <h2 @click="expand(item.id, item1.id)" class="title2 clearfix">
                <span class="fl">{{item1.title}}</span>
                <span v-if="item1.checked" class="fr"><x-icon  type="ios-minus-empty" size="22"></x-icon></span>
                <span v-else class="fr"><x-icon  type="ios-plus-empty" size="22"></x-icon></span>
              </h2>
              <div v-show="item1.checked" class="cnt" v-html="item1.context"></div>
            </li>
          </ul>
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
      lists: [],
      lists1: []
    }
  },
  mounted () {
    this.getLists()
  },
  methods: {
    getLists () {
      let _this = this
      this.axios.get('web/fagclasslist').then(res => {
        if (res.success) {
          this.lists = res.data
          this.lists.map((item, index) => {
            item.show = false
          })
          return res.data
        }
      }).then((dataLists) => {
        dataLists.map((item, index) => {
          console.log('faqlist', item.id)
          this.axios.get('web/faqlist/' + item.id).then(res => {
            if (res.success) {
              console.log('faqlist', res)
              let lists1 = res.data
              lists1.map((val, key) => {
                val.checked = false
              })
              _this.lists1.push(lists1)
              _this.lists.some((item1, index1) => {
                if (item1.id === item.id) {
                  /* result.map((item1, index1) => {
                    item1.checked = false
                  }) */
                  item1.lists1 = lists1
                  // item.lists = result
                  return true
                }
              })
            }
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    expand (id, id1) { // 展开
      console.log(id, id1)
      this.lists.map((item, index) => {
        item.show = false
        console.log(item.id === id, item.id, id)
        if (item.id === id) {
          console.log('item.show ', item.show )
          item.show = !item.show
          item.lists1.some((item1, index1) => {
            if (item1.id === id1) {
              item1.checked = !item1.checked
            }
          })
        }
      })
    },
    getFaqList (id) {
      let _this = this
      let lists = []
      this.axios.get('web/faqlist/' + id).then(res => {
        if (res.success) {
          console.log('suuccess getFaqList', res)
          lists = res.data
          console.log(id)
          lists.map((item, index) => {
            item.show = false
            console.log(item.id)
            if (item.id === id) {
              item.show = !item.show
            }
          })
          /* lists.push({
            id: result
          }) */
          /* lists.some((item, index) => {
            if (item.id === id) {
              result.map((item1, index1) => {
                item1.checked = false
              })
              item.lists = result
              return true
            }
          }) */
          this.lists1 = lists
          console.log('getFaqList', lists)
        }
      })
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
