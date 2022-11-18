<template>
  <div class="banner">
    <ul class="big_ul">
      <li class="big_li"
          v-for="(emit,index) in data.data"
          :key="index">
        <!-- 大图 -->
        <router-link to="/zoom/product"
                     @click="detailsCliK(emit.number)"><img :src="url + emit.imgs"
               alt=""></router-link>

        <!-- 小图 -->
        <ul class="small_ul"
            @click="smail(index)">
          <li class="small_li"
              v-for="(emit,index) in emit.smaill"
              :key="index">
            <img :src=emit
                 alt=""
                 @click="pic(emit)" />
          </li>
        </ul>
        <!-- <PicSmaill></PicSmaill> -->
        <!-- 价格 -->
        <p class="price">￥{{emit.price}}</p>
        <!-- 商品介绍 -->
        <p class="details">
          <router-link to="/zoom/product"
                       @click="detailsCliK(emit.number)">{{emit.title}}</router-link>
        </p>
        <!-- 销量 -->
        <p class="sales">总销量:<span>{{data.nzs(emit.sales)}}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue'
import bus from '../../bus.js'

export default {
  components: {},
  setup(prop) {
    const { proxy } = getCurrentInstance()
    const data = reactive({
      data: [],
      nzs(n) {
        return n < 100
          ? n
          : n < 1000
          ? parseInt(n / 100) + '00+'
          : n < 10000
          ? parseInt(n / 1000) + '000+'
          : parseInt(n / 10000) + '万+'
      },
    })
    // bus.on('data', (d) => {
    //   data.data = d
    // })
    proxy.$axios
      .post('/seldata', { table: 'goods' })
      .then((d) => {
        data.data = d.data
        console.log(data.data)
      })
      .catch((err) => console.log(err))
    // data.data = inject('data')
    bus.on('data', (i) => {
      data.data = i
    })
    // console.log(data.data)
    //详情传输数据
    function detailsCliK(v) {
      setTimeout(() => {
        bus.emit('detailsClick', v)
      })
    }
    // 点小图换图片
    // let print = reactive('')
    function pic(v) {
      print = v
    }
    function smail(v) {
      if (print === '') {
      } else {
        list[v].src = print
        print = ''
      }
    }

    const url = ref('http://192.168.3.21:3000/')

    return {
      pic,
      smail,
      data,
      url,
      detailsCliK,
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner {
  width: 990px;
  margin: 0 auto;
}

.big_ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  list-style: none;
  padding: 0;

  .big_li {
    width: 180px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 16px;

    img {
      width: 180px;
      height: 180px;
    }

    .small_ul {
      display: flex;
      padding: 0;
    }

    .small_li {
      width: 30px;
      height: 30px;
      margin-top: 10px;
      margin-left: 6px;
      list-style: none;

      img {
        width: 30px;
        height: 30px;
      }
    }

    .price {
      color: #c00;
      font-size: 14px;
      font-weight: 700;
      height: 20px;
      line-height: 20px;
      margin: 5px 0 0 0;
    }

    .details {
      margin: 0;
      margin-top: 22px;

      a {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #666;
        line-height: 1.5;
        height: 36px;
        width: 180px;
        font-size: 12px;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    }

    .sales {
      color: #999;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      margin: 0;

      span {
        color: #c49173;
        font-weight: bolder;
      }
    }
  }
}
</style>