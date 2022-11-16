<template>
  <div class="banner">
    <ul class="big_ul">
      <li class="big_li"
      v-for="(emit,index) in list"
      :key="index"
      >
        <!-- 大图 -->
        <a href="javascript:;">
          <img 
          :src=emit.src  
          alt=""/>
        </a>
       <!-- 小图 -->
       <ul class="small_ul"
       @click="smail(index)"
       >
          <li class="small_li"
          v-for="(emit,index) in emit.smaill"
          :key="index"
          >
            <img 
            :src=emit 
            alt=""
            @click="pic(emit)"
            />
          </li>
        </ul>
       <!-- <PicSmaill></PicSmaill> -->
        <!-- 价格 -->
        <p class="price">￥2000.00</p>
        <!-- 商品介绍 -->
        <p class="details">
          <a href="javascript:;">
            【会员尊享】施华洛世奇官方旗舰店专属购物金 购物享折上折
          </a>
        </p>
        <!-- 销量 -->
        <p class="sales">总销量:<span>7000+</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  components:{
    
  },
  setup() {
    const list = reactive([
      {src:'../../../public/images/paging/all01.jpg',smaill:['../../../public/images/paging/smaill01.jpg','../../../public/images/paging/smaill02.jpg','../../../public/images/paging/smaill03.jpg']},
      {src:'../../../public/images/paging/all02.jpg',smaill:['../../../public/images/paging/smaill01.jpg','../../../public/images/paging/smaill02.jpg',]},
      {src:'../../../public/images/paging/all03.jpg',smaill:['../../../public/images/paging/smaill01.jpg','../../../public/images/paging/smaill02.jpg',]},
      {src:'../../../public/images/paging/all04.jpg',smaill:['../../../public/images/paging/smaill01.jpg','../../../public/images/paging/smaill02.jpg',]},
      {src:'../../../public/images/paging/all05.jpg',smaill:['../../../public/images/paging/all05.jpg',]},
    ])
   
    // 点小图换图片
    let print = reactive('')
    function pic(v){
      console.log(v);
      print=v
    }
    function smail(v){
      if(print===''){
console.log(1);
      }else{
        list[v].src=print
        print=''
      }
    
    }

    return {
      list,
      pic,
      smail
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner
  width 790px
  margin 0 auto
.big_ul
  display flex
  flex-wrap wrap
  width 100%
  margin 0 auto
  list-style none
  .big_li
    width 180px
    height 340px
    display flex
    flex-direction column
    justify-content space-between
    margin-top 20px
    margin-left 16px
    .small_ul
      display flex
    .small_li
      width 30px
      height 30px
      margin-top 10px
      margin-left 6px
      list-style none
      img
        width 30px
        height 30px
    .price
      color #c00
      font-size 14px
      font-weight 700
      height 20px
      line-height 20px
      margin 5px 0 0 0
    .details
      margin 0;
      margin-top 22px
      a
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
        color #666
        line-height 1.5
        height 36px
        width 180px
        font-size 12px
        text-decoration none
      a:hover
        text-decoration underline
    .sales
      color #999
      font-size 12px
      height: 20px
      line-height 20px
      margin 0
      span 
        color #c49173
        font-weight bolder
  
</style>