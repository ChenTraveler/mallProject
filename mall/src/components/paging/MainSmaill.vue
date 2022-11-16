<template>
  <div class="banner">
    <ul>
      <li
      v-for="(emit,index) in list"
      :key="index"
      >
        <!-- 图片 -->
        <a href="javascript:;" class="pic">
          <img src="../../../public/images/paging/all01.jpg" alt="">
        </a>
        <!-- 商品介绍 -->
        <p class="details">
          <a href="javascript:;">
            【会员尊享】施华洛世奇官方旗舰店专属购物金 购物享折上折
          </a>
        </p>
        <!-- 价格 -->
        <p class="price">￥2000.00</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const list = reactive([
      {src:'../../../public/images/paging/all01.jpg'},{src:'../../../public/images/paging/all02.jpg'},
      {src:'../../../public/images/paging/all03.jpg'},{src:'../../../public/images/paging/all04.jpg'},
      {src:'../../../public/images/paging/all05.jpg'},{src:'../../../public/images/paging/all06.jpg'},
      {src:'../../../public/images/paging/all07.jpg'},{src:'../../../public/images/paging/all08.jpg'},
      {src:'../../../public/images/paging/all09.jpg'},{src:'../../../public/images/paging/all010.jpg'},
    ])
    return {
      list
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner
  width 790px
  margin 0 auto
  ul
    width 100%
    margin 0 auto
    display flex
    flex-wrap wrap
    list-style none
    li 
      width 100%
      height 90px
      padding-bottom 5px
      list-style none
      display flex
      align-items center
      margin-top 10px
      border-bottom 2px dotted #999
      .pic 
        width 80px
        height 80px
        img 
          width 80px
          height 80px
      .details
        margin-left 10px
      a
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        color #666
        width 400px
        font-size 12px
        text-decoration none
      a:hover
        text-decoration underline
      .price 
        color #c00
        font-size 14px
        font-weight 700
     
      
</style>