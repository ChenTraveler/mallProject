<template>
  <div class="shops">
    <!-- {{data.shops}} -->
    <div class="header">
      <div>店铺宝贝</div>
      <div>商品属性</div>
      <div>单价</div>
      <div>数量</div>
      <div>优惠方式</div>
      <div>小计</div>
    </div>
    <div class="main">
      <div class="shop"
           v-for="(item,i) in data.shops"
           :key="i">
        <div>
          <div class="left">
            <img :src="url + item.img"
                 alt="">
          </div>
          <div class="right">
            <p>{{item.title}}</p>
          </div>
        </div>
        <div>
          <p>颜色分类:{{item.guige}}</p>
        </div>
        <div>
          {{item.price}}.00
        </div>
        <div>
          {{item.num}}
        </div>
        <div>
          无优惠
        </div>
        <div>{{item.num*item.price}}.00</div>
      </div>
      <div class="price">总价格：￥{{data.zongSum}}</div>

    </div>
    <router-link to=""
                 class="ding"
                 @click="hint">立即支付</router-link>
    <!-- 遮罩层提示框 -->
    <div class="zhe"
         :style="zhe === true ? 'display:block' : 'display:none' ">
      <div class="hint">
        <div class="hint_font">
          <span>
            是否购买该商品
          </span>
        </div>
        <div class="anniu">
          <p class="oks"
             @click="del()">确定</p>
          <p class="nos"
             @click="nos">取消</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import bus from '../../bus.js'
import { useRouter } from 'vue-router'
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from 'vue'
export default {
  name: 'Shops',
  setup() {
    const { uname } = jwt_decode(localStorage.getItem('token')) // 解析
    // 使用路由
    const $router = useRouter()
    // 控制遮罩层状态
    const zhe = ref(false)
    // 遮罩层弹出
    function hint() {
      // 判断地址是否填写
      let a = localStorage.getItem('list')
      console.log(a === '[]')
      if (a === '[]') {
        alert('请填写收货地址')
      } else {
        zhe.value = true
      }
    }
    // 取消
    function nos() {
      zhe.value = false
      // 如果是立即购买的取消
      if (data.leiXing.constructor === Object) {
        //随机生成12位订单编号
        function randomWord(length = 32) {
          //由以下元素组成
          let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
          let num = ''
          for (let i = 0; i < length; i++) {
            num += arr[parseInt(Math.random() * arr.length)]
          }
          return num
        }
        let key = randomWord(12)
        console.log()
        proxy.$axios
          .post('/addcart', {
            uname,
            title: data.shops[0].title,
            guige: data.shops[0].guige,
            num: data.shops[0].num,
            price: data.shops[0].price,
            number: data.shops[0].number,
            state: '未付款',
            orderid: key,
            img: data.shops[0].img,
          })
          .then((e) => {
            console.log(e)
          })
          .catch((err) => console.log(err))
        setTimeout(() => {
          $router.push('/page')
        }, 1500)
      } else {
        // 否则的话将数据状态修改为卖家未支付
        data.shops.forEach((i) => {
          //随机生成12位订单编号
          function randomWord(length = 32) {
            //由以下元素组成
            let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            let num = ''
            for (let i = 0; i < length; i++) {
              num += arr[parseInt(Math.random() * arr.length)]
            }
            return num
          }
          let key = randomWord(12)
          let id = i.id
          proxy.$axios
            .post('/updcart', {
              setStr: `submit="t",orderid=${key},stime=now(),state="未付款"`,
              id,
            })
            .then((d) => {
              // console.log(d);
            })
            .catch((err) => console.log(err))
          setTimeout(() => {
            $router.push('/order')
          }, 1500)
        })
      }
    }
    // 确定
    function del() {
      zhe.value = false
      // 如果是立即购买的话
      if (data.leiXing.constructor === Object) {
        data.shops.forEach((i) => {
          //随机生成12位订单编号
          function randomWord(length = 32) {
            //由以下元素组成
            let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            let num = ''
            for (let i = 0; i < length; i++) {
              num += arr[parseInt(Math.random() * arr.length)]
            }
            return num
          }
          let key = randomWord(12)

          let id = i.id
          proxy.$axios
            .post('/addcart', {
              uname,
              title: data.shops[0].title,
              guige: data.shops[0].guige,
              num: data.shops[0].num,
              price: data.shops[0].price,
              number: data.shops[0].number,
              state: '进行中',
              orderid: key,
              img: data.shops[0].img,
            })
            .then((e) => {
              console.log(e)
            })
            .catch((err) => console.log(err))
          setTimeout(() => {
            $router.push('/order')
          }, 1500)
        })
      } else {
        // 否则的话将数据库里面的数据进行修改
        data.shops.forEach((i) => {
          //随机生成12位订单编号
          function randomWord(length = 32) {
            //由以下元素组成
            let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            let num = ''
            for (let i = 0; i < length; i++) {
              num += arr[parseInt(Math.random() * arr.length)]
            }
            return num
          }
          let key = randomWord(12)
          let id = i.id
          proxy.$axios
            .post('/updcart', {
              setStr: `submit="t",orderid=${key},stime=now(),state="进行中"`,
              id,
            })
            .then((d) => {
              // console.log(d);
            })
            .catch((err) => console.log(err))
          setTimeout(() => {
            $router.push('/order')
          }, 1500)
        })
      }
    }
    const { proxy } = getCurrentInstance()
    const url = ref('http://localhost:3000/')
    const data = reactive({
      shops: [],
      zongSum: computed(() => {
        let sum = 0
        data.shops.forEach((i) => {
          sum += i.num * i.price
        })
        return sum
      }),
      // 哪里进来的
      leiXing: '',
    })
    data.leiXing = JSON.parse(localStorage.getItem('x'))
    onMounted(() => {
      setTimeout(() => {
        // 来获取缓存的数据
        JSON.parse(localStorage.getItem('shops')).forEach((i) => {
          data.shops.push(i)
        })
      })
      setTimeout(() => {})
    })
    // 立即购买
    bus.on('buys', (x) => {
      console.log(x)
      // x[图片，标题，分类，价格，数量]
      // localStorage.setItem('shops', [])
      localStorage.setItem('shops', JSON.stringify([x]))
      data.leiXing = x
      // console.log(data.leiXing === Array)
      localStorage.setItem('x', JSON.stringify(data.leiXing))
    })

    // 结算
    bus.on('account', (x) => {
      data.leiXing = x
      localStorage.setItem('x', JSON.stringify(data.leiXing))
      // localStorage.setItem('sum', x[0])
      // console.log(data.leiXing === Array)
      localStorage.setItem('shops', [])
      x[1].forEach((i) => {
        // 查找并获取数据
        proxy.$axios
          .post('/seldata', {
            table: 'cart',
            other: `where cart.id=${i} `,
          })
          .then((pics) => {
            data.shops.push(pics.data[0])
            localStorage.setItem('shops', JSON.stringify(data.shops))
            console.log(111)
          })
          .catch((err) => console.log(err))
      })
    })
    return {
      data,
      url,
      zhe,
      hint,
      del,
      nos,
    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.shops {
  width: 100%;
  padding: 0 17px;
  margin-top: 20px;
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #6c6c6c;
    div:nth-child(1) {
      width: 240px;
      text-align: center;
      border-bottom: 3px solid #b2d1ff;
      margin: 0 1px;
    }
    div:nth-child(2) {
      width: 180px;
      text-align: center;
      border-bottom: 3px solid #b2d1ff;
      margin: 0 1px;
    }
    div:nth-child(3) {
      width: 120px;
      text-align: center;
      border-bottom: 3px solid #b2d1ff;
      margin: 0 1px;
    }
    div:nth-child(4) {
      width: 120px;
      text-align: center;
      border-bottom: 3px solid #b2d1ff;
      margin: 0 1px;
    }
    div:nth-child(5) {
      width: 180px;
      text-align: center;
      border-bottom: 3px solid #b2d1ff;
      margin: 0 1px;
    }
    div:nth-child(6) {
      width: 120px;
      text-align: center;
      border-bottom: 3px solid #b2d1ff;
      margin: 0 1px;
    }
  }
  .main {
    width: 100%;
    border-top: 1px dotted #80b2ff;
    border-bottom: 1px dotted #80b2ff;
    margin-top: 20px;
    .shop {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #6c6c6c;
      padding: 10px;
      > div:nth-child(1) {
        width: 240px;
        margin: 0 1px;
        display: flex;
        padding-top: 10px;

        .left {
          img {
            width: 50px;
            height: 50px;
          }
        }
        .right {
          p {
            width: 190px;
            /* 第一步 ：文字强制换行 */
            white-space: nowrap;
            /* 第二部：溢出部分隐藏 */
            overflow: hidden;
            /* 第三步：溢出文本转换为3个点 */
            text-overflow: ellipsis;
            text-align: left;
            font-size: 14px;
          }
          p:hover {
            color: red;
          }
        }
      }
      div:nth-child(2) {
        width: 180px;
        text-align: center;
        margin: 0 1px;
      }
      div:nth-child(3) {
        width: 120px;
        text-align: center;
        margin: 0 1px;
      }
      div:nth-child(4) {
        width: 120px;
        text-align: center;
        margin: 0 1px;
      }
      div:nth-child(5) {
        width: 180px;
        text-align: center;
        margin: 0 1px;
      }
      div:nth-child(6) {
        width: 120px;
        text-align: center;
        margin: 0 1px;
        font-size: 16px;
        color: red;
      }
    }
    .price {
      width: 200px;
      height: 60px;
      float: right;
      margin-top: 20px;
      border: 2px solid red;
      text-align: right;
      padding: 10px 10px 0 0;
    }
  }
  .ding {
    float: right;
    width: 200px;
    height: 40%;
    text-align: center;
    line-height: 40px;
    background-color: red;
    transform: translate(200px, 100px);
    text-decoration: none;
    color: #fff;
    font-weight: 700;
  }
  .zhe {
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    z-index: 999;

    .hint {
      width: 300px;
      height: 200px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -150px;
      margin-top: -100px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .hint_font {
        height: 90px;
        line-height: 140px;
        font-size: 20px;
      }

      .anniu {
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        p {
          width: 90px;
          height: 40px;
          background-color: #ececec;
          border-radius: 20px;
          line-height: 40px;
          text-align: center;
        }

        p:hover {
          width: 90px;
          height: 40px;
          background-color: #f40;
          border-radius: 20px;
          line-height: 40px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
</style>