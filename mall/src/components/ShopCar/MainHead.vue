<template>
  <div class="banner">
    <div class="left">
      购物车(全部<span>{{chang}}</span>)
    </div>
    <div class="right">
      <p class="selected">已选商品（不含运费）</p>
      <p class="price"><span>￥</span>{{sum}}</p>
      <p :class="sum===0 ?  'close_01' : 'close' "
      @click="account(sum)"
      >结算</p>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted,onUpdated,ref} from 'vue'
import {useStore} from 'vuex'
import bus  from '../../bus.js'
export default {
  components: {
   
  },
  setup() {
      const store = useStore()
      // 获取数量
      const chang = computed(()=>{
        return store.state.data.length
      })
    // 获取总价
    const sum = computed(()=>{
      return store.state.sum*1
    })
   
    // 结算
    function account(v){
      if(v!==0){
        store.commit('ACCOUNT')
        // console.log(store.state.ids);
        // 向结算页传送总价和选中商品的id
        setTimeout(()=>{
          bus.emit('account',[sum,store.state.ids])
        })
      }
    }
 
   
  return {
    chang,
    sum,
    account,

  }
  },
}
</script>

<style lang="stylus" scoped>
.banner
  width 1200px
  height 75px
  margin 0 auto
  background-color #fff
  display flex 
  justify-content space-between
  align-items center
  padding 0 20px
  border-bottom 1px solid #999
  border-top-left-radius 25px 
  border-top-right-radius 25px 
  .left
    font-size 18px
    font-weight 600
  .right
    display flex
    justify-content space-between
    align-items center
    p 
      margin-left 20px
    .selected
      font-size 14px
    .price
      width 180px
      color #ff5000
      font-size 22px
      font-weight 500
    .close
      width 74px
      height 42px
      line-height 42px
      color #fff
      background #FF5000
      border-radius 21px
      text-align center
      font-size 16px
    .close_01
      width 74px
      height 42px
      line-height 42px
      color #fff
      background #aaa
      border-radius 21px
      text-align center
      font-size 16px
</style>

