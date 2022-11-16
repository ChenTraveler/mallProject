<template>
  <div class="banner">
    <ul>
      <li v-for="(item,index) in list.data" :key="index" :class="list.isnav==index?'lis':''" @click="list.nav(index)">
        {{item.nums}}
      </li>
    </ul>
    <div class="search">
      <input type="text" placeholder="输入订单号或者商品名称进行搜索">
      <span>
        订单搜索
      </span>
      <!-- 全选和删除已选 -->
      <div class="handleQuan">
        <div class="checkAll">
          <input type="checkbox" :checked="allChecked" @change="allSelect">
          <p>
            全选
          </p>
        </div>
        <p class="delCheck" @click="delSelect">
          删除已选
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import bus from '../../bus.js'
export default {
  components: {

  },
  setup () {

    // 头部选项卡
    const list = reactive({
      data: [
        { nums: '所有订单', },
        { nums: '待付款', },
        { nums: '待发货', },
        { nums: '待收货', },
        { nums: '待评价', },
        { nums: '已完成', },
      ],
      isnav: 0,
      nav (index) {
        list.isnav = index
        bus.emit('sizer', index)
      },
    })

    // 全选状态
    let allChecked = reactive(false)
    // 全选事件
    const allSelect = () => {
      allChecked = !allChecked
      console.log(allChecked)
      bus.emit('allSelect', allChecked)
    }

    //删除选中
    const delSelect = () => {
      bus.emit('delSelect')
    }

    return {
      list,
      allChecked,
      allSelect,
      delSelect
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner
  width 1200px
  height 115px
  margin 0 auto
  background-color #fff
  display flex
  flex-direction column
  justify-content space-between
  padding 0 0px
  border-bottom 1px solid #999
  border-top-left-radius 25px
  border-top-right-radius 25px
  overflow hidden
  ul
    list-style none
    display flex
    align-items center
    height 50px
    li
      margin-left 20px
      width 100px
      text-align center
      border-right 1px solid #333
      box-sizing border-box
      font-weight 700
    .lis
      margin-left 20px
      width 100px
      text-align center
      border-right 1px solid #333
      box-sizing border-box
      font-weight 700
      color #f40
    li:hover
      color #f40
      text-decoration underline
    li:last-child
      border-right none
  .search
    width 100%
    height 60px
    line-height 60px
    border-top 3px solid #333
    padding-left 50px
    display flex
    align-items center
    input
      height 30px
      width 220px
    span
      display inline-block
      width 80px
      height 32px
      text-align center
      line-height 32px
      background-color #f5f5f5
      border 1px solid #999
  .handleQuan
    height 60px
    display flex
    align-items center
    .checkAll
      display flex
      align-items center
      margin-left 540px
      input
        width 15px
        height 15px
    .delCheck
      margin-left 90px
      font-size 17px
      font-weigh 600
    .delCheck:hover
      color #f40
      text-decoration underline
</style>

