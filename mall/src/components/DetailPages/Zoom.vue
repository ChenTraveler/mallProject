<template>
  <!-- 详情页 -->
  <div class="zoom">
    <!-- {{data.data}} -->
    <!-- 头部 -->
    <HeaderVue />
    <!-- 版心 -->
    <div class="ban">
      <!-- 中间的内容 -->
      <div class="banner"
           v-for="item in data.data"
           :key="item.number">
        <!-- 左边的放大镜和下面的图片 -->
        <div class="left">
          <!-- 鼠标悬浮时的东西 -->
          <div class="left">
            <img class="leftImg"
                 :src="qie.src"
                 alt="">
            <!-- 鼠标层罩 -->
            <div v-show="top.topShow"
                 class="top"
                 :style="top.topStyle"></div>
            <!-- 最顶层覆盖了整个原图空间的透明层罩 -->
            <div class="maskTop"
                 @mouseenter="top.enterHandler"
                 @mousemove="top.moveHandler"
                 @mouseout="top.outHandler"></div>
          </div>
          <div v-show="top.rShow"
               class="right">
            <img :style="top.r_img"
                 class="rightImg"
                 :src="qie.src"
                 alt="">
          </div>

          <!-- 底部的图片 -->
          <div class="bottom">
            <div v-for="(item,index) in item.swiper"
                 :key="index"
                 @click="qie.fn(item,index)"
                 :class="qie.style===index? 'boder':''">
              <img :src="item"
                   alt="">
            </div>
          </div>
        </div>
        <!-- 右边的内容区域 -->
        <div class="right">
          <!-- 标题 -->
          <div class="title">
            <h2>{{item.title}}</h2>
          </div>
          <!-- 销量 -->
          <p>月销{{item.monthsales}}+</p>
          <div class="bg">
            <p>天猫双11狂欢</p>
            <p>11月10日 20:00开卖</p>
          </div>
          <!-- 价格 -->
          <div class="price">
            <p>折后￥<span>{{item.price[0]}}</span></p>
            <p>双十一折后￥{{item.price[0]}}</p>
          </div>

          <div class="nav">
            <p>优惠</p>
            <p>活动</p>
            <p>保障</p>
            <p>参数 <img src="../../../public/images/DetailPages/a9.png"
                   alt=""></p>
            <div class="la">
              <div class="xia">
                <div class="left">
                  <div>
                    <h3>优惠: </h3><span>{{item.discount}}</span>
                  </div>
                  <div>
                    <h3>活动: </h3><span>{{item.activity}}</span>
                  </div>
                  <div>
                    <h3>保障: </h3><span>{{item.guarantee}}</span>
                  </div>
                  <h3>宝贝参数:</h3>
                  <div>
                    <div>
                      <p v-for="(item,i) in item.parameter"
                         :key="i">{{item}}</p>
                    </div>
                    <!-- <div>
                      <p>链子材质:合金/镀银/镀金</p>
                      <p>适用性别:女</p>
                      <p>货号:{{item.number}}</p>
                    </div>
                    <div>
                      <p>图案:天鹅</p>
                      <p>颜色分类:镀玫瑰金色链子 镀...</p>
                      <p>是否商场同款:是</p>
                    </div> -->
                  </div>
                </div>
                <div class="right">
                  <img src="../../../public/images/DetailPages/a6.png"
                       alt="">
                  <p>扫一扫看更多</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pei">
            <span>配送：{{item.delivery}}</span>
          </div>
          <div class="fen"
               v-if="item.colorimg">
            <span>颜色分类:</span>
            <div @click="qie.fn1(i,index)"
                 :class="qie.sum===index? 'boder' : ''"
                 v-for="(i,index) in item.colorimg"
                 :key="index">
              <img :src="i"
                   alt="">
              <p>{{item.colortext[index]}}</p>
            </div>
          </div>
          <div class="sum">
            <span>数量:</span>
            <p @click="sum.fn1(1)">-</p>
            <p>{{sum.sum}}</p>
            <p @click="sum.fn2(1)">+</p>
            <span>有货(限购10件)</span>
          </div>
          <!-- 弹窗 -->
          <div class="alert">
            <p v-show="sum.status">加入成功</p>
            <p v-show="sum.s">请选择种类</p>
          </div>
          <div class="gou">
            <div>
              <router-link @click="sum.fn3(sum.sum,item.number)"
                           to="/mains">立即购买</router-link>
              <router-link @click="sum.fn4(sum.sum,item.number)"
                           to="">加入购物车</router-link>
            </div>
            <span>|</span>
            <p>
              <img src="../../../public/images/DetailPages/a10.png"
                   alt="">
              <span>收藏</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="main">
        <router-link to="/zoom/product"
                     @click="sum.fn5(1)"
                     :class="sum.z===1? 'se':''">宝贝详情</router-link>
        <router-link to="/zoom/evaluation/all"
                     @click="sum.fn5(2)"
                     :class="sum.z===2? 'se':''">宝贝评价</router-link>
      </div>
      <div class="baby">
        <router-view></router-view>
      </div>
    </div>
    <FooterVue />
    <asideVue class="aside" />
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import HeaderVue from './Header.vue'
import FooterVue from './FooterVue.vue'
import asideVue from './aside.vue'
import { useStore } from 'vuex'
import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  provide,
  onBeforeMount,
} from '@vue/runtime-core'
import bus from '../../bus.js'
export default {
  name: 'ZoomVue',
  components: { HeaderVue, FooterVue, asideVue },
  setup() {
    const { proxy } = getCurrentInstance()
    const data = reactive({
      data: [],
    })
    const store = useStore()
    onBeforeMount(() => {})
    onMounted(() => {
      
      // 接收传入的值
      bus.on('detailsCliK', (x) => {
        console.log(x);
        // 获取数据
        proxy.$axios
          .post('/details', {
            other: `where goods.number=${x} `,
          })
          .then((pics) => {
            data.data = pics.data
            // console.log(data.data)
            localStorage.setItem('data', JSON.stringify(data.data))
            localStorage.setItem('z', 1)
          })
          .catch((err) => console.log(err))
      })

      setTimeout(() => {
        data.data = JSON.parse(localStorage.getItem('data'))
        sum.z = localStorage.getItem('z') * 1
        // console.log(sum.z)
        data.data[0].parameter = data.data[0].parameter.split(';')
        data.data[0].swiper = data.data[0].swiper.split(',')
        data.data[0].detailsimg = data.data[0].detailsimg.split(',')
        data.data[0].colortext = data.data[0].colortext.split(';')
        data.data[0].colorimg = data.data[0].colorimg.split(';')
        data.data[0].price = data.data[0].price.split(';')
        bus.emit('datas', data.data[0].parameter)
      }, 200)

      // 监听滚动条
      window.addEventListener('scroll', () => {
        var top = Math.floor(
          document.body.scrollTop ||
            document.documentElement.scrollTop ||
            window.pageYOffset
        )
        if (top < 400) {
          bus.emit('height', false)
        } else {
          bus.emit('height', true)
        }
      })
      bus.on('top', (x) => {
        if (x === true) {
          document.documentElement.scrollTop = 0
        }
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', () => {}) // 离开当前组件别忘记移除事件监听
    })

    // 选择的件数
    const sum = reactive({
      sum: 1,
      // 点击加入购物车的状态 弹窗
      status: false,
      // 点击立即购买的 弹窗
      s: false,
      // 用来缓存点那个那个字体变色
      z: 1,

      // 变色
      fn5(x) {
        localStorage.setItem('z', x)
        const a = localStorage.getItem('z') * 1
        sum.z = a
      },
      // 减
      fn1(x) {
        sum.sum -= x
        if (sum.sum === 0) {
          sum.sum = 1
          alert('最少选择一件')
        }
      },
      // 加
      fn2(x) {
        sum.sum += x
        if (sum.sum === 11) {
          sum.sum = 10
          alert('最多选择十件')
        }
      },
      // 立即购买
      fn3(x, y) {
        // console.log(111)
        setTimeout(() => {
          bus.emit('buy', [x, y, qie.sum])
        })
      },
      // 加入购物车
      fn4(x, y) {
        console.log(x, qie.sum, y)
        bus.emit('buyCar', [x, y, qie.sum])
        // ('buy', [x, y, qie.sum])
        // sum.status = true
        setTimeout(() => {
          sum.status = true
        })
        setTimeout(() => {
          sum.status = false
        }, 1500)
      },
    })
    // 点击切图
    let qie = reactive({
      src: '/public/images/index/a1.jpg',
      style: -1,
      sum: 0,
      fn(x, index) {
        qie.src = x
        qie.style = index
      },
      fn1(x, index) {
        qie.src = x
        qie.sum = index
      },
    })

    // 放大镜
    let top = reactive({
      topStyle: { transform: '' },
      r_img: {},
      topShow: false,
      rShow: false,
      // 鼠标进入原图空间函数
      enterHandler() {
        // 层罩及放大空间的显示
        this.topShow = true
        this.rShow = true
      },
      // 鼠标移动函数
      moveHandler(event) {
        // 鼠标的坐标位置
        let x = event.offsetX
        let y = event.offsetY
        // 层罩的左上角坐标位置，并对其进行限制：无法超出原图区域左上角
        let topX = x - 100 < 0 ? 0 : x - 100
        let topY = y - 100 < 0 ? 0 : y - 100
        // 对层罩位置再一次限制，保证层罩只能在原图区域空间内
        if (topX > 230) {
          topX = 230
        }
        if (topY > 230) {
          topY = 230
        }
        // 通过 transform 进行移动控制
        this.topStyle.transform = `translate(${topX}px,${topY}px)`
        this.r_img.transform = `translate(-${2 * topX}px,-${2 * topY}px)`
      },
      // 鼠标移出函数
      outHandler() {
        // 控制层罩与放大空间的隐藏
        this.topShow = false
        this.rShow = false
      },
    })

    return {
      top,
      qie,
      sum,
      data,
    }
  },
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.zoom {
  width: 100%;
  padding-top: 15px;
  background-image: linear-gradient(180deg, #e9ded8, #d6ebec);
  .ban {
    width: 1192px;
    margin: 0 auto;
    padding: 10px 15px 0;
    background-color: #fff;
    margin-bottom: 30px;
    border-radius: 24px;
    .banner {
      width: 100%;
      display: flex;
      padding-bottom: 40px;
      .left {
        width: 460px;
        // padding: 0 10px;
        position: relative;
        /* 放大的图片，通过定位将左上角定位到(0,0) */
        .rightImg {
          display: inline-block;
          width: 920px;
          height: 920px;
          position: absolute;
          top: 0;
          left: 0;
        }
        /* 右边的区域图片放大空间 */
        .right {
          margin-left: 412px;
          width: 460px;
          height: 460px;
          position: absolute;
          top: 0px;
          left: 80px;
          overflow: hidden;
          z-index: 55;
        }
        /* 一个最高层层罩 */
        .maskTop {
          width: 460px;
          height: 460px;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
        }
        /* 层罩，通过定位将左上角定位到(0,0) */
        .top {
          width: 230px;
          height: 230px;
          background-color: lightcoral;
          opacity: 0.4;
          position: absolute;
          top: 0;
          left: 0;
        }
        /* 原图的显示 */
        .leftImg {
          width: 460px;
          height: 460px;
          display: inline-block;
        }
        /* 原图的容器 */
        .left {
          width: 460px;
          height: 460px;
          // border: 1px solid teal;
          // float: left;
          position: relative;
        }

        .bottom {
          width: 100%;
          display: flex;
          // justify-content: space-between;
          margin-top: 10px;
          > div {
            width: 70px;
            height: 70px;
            margin: 0 8px;
            text-align: center;
            line-height: 70px;
            border: 1px solid #fff;
            img {
              width: 68px;
              height: 68px;
            }
          }
        }
      }
      .right {
        padding: 0 15px;

        > p {
          color: rgba(0, 0, 0, 0.4);
          font-size: 14px;
          margin: 20px 0;
        }
        .bg {
          width: 420px;
          line-height: 36px;
          background: url(../../../public/images/DetailPages/a7.png) center
            no-repeat;
          display: flex;
          justify-content: space-between;
          padding: 0 15px;
          border-radius: 14px;
          p {
            color: #fff;
            font-size: 20px;
          }
        }
        .price {
          display: flex;
          align-items: center;
          margin-top: 25px;
          p:nth-child(1) {
            color: rgb(255, 79, 0);
            span {
              font-size: 20px;
            }
          }
          p:nth-child(2) {
            width: 150px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 15px;
            margin-left: 10px;
            background-color: rgb(255, 80, 0);
            color: rgb(255, 255, 255);
            font-size: 14px;
          }
        }
        .nav {
          position: relative;
          width: 255px;
          height: 42px;
          border-radius: 21px;
          border: 1px solid #eee;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-top: 20px;
          > p {
            width: 25%;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #eee;

            img {
              transform: translateY(4px);
            }
          }
          > p:nth-child(4) {
            border-right: none;
          }
          .la {
            display: none;
            .xia {
              position: absolute;
              top: 55px;
              left: -1px;
              z-index: 10;
              display: flex;

              .left {
                width: 705px;
                border-radius: 15px;
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, 0.08);
                padding: 15px;
                > div {
                  display: flex;
                  align-items: center;
                }
                > div:nth-child(3) {
                  padding-bottom: 20px;
                  border-bottom: 1px solid #eee;
                }
                > h3 {
                  margin-top: 20px;
                }
                > div:nth-child(5) {
                  justify-content: space-evenly;
                  > div {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    p {
                      width: 33%;
                      text-align: left;
                    }
                  }
                }
              }
              .right {
                height: 180px;
                border-radius: 15px;
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, 0.08);
                position: relative;
                margin-left: 5px;
                img {
                  padding-top: 25px;
                  width: 100px;
                  height: auto;
                }
                p {
                  width: 100%;
                  text-align: center;
                }
              }
            }
          }
        }
        .nav:hover {
          background-color: #f5f5f5;
        }
        .nav:hover > p {
          color: #ff5000;
        }
        .nav:hover .la {
          display: block;
        }
        .pei {
          margin: 20px 0;
        }
        .fen {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          > span {
            color: #7f7f7f;
          }
          > div {
            width: 160px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            margin-left: 20px;
            background-color: rgba(0, 0, 0, 0.06);
            img {
              width: 30px;
              height: 30px;
            }
            p {
              color: #333;
              margin-left: 5px;
              font-size: 14px;
            }
          }
        }
        .sum {
          margin-top: 20px;
          display: flex;
          align-items: center;
          span {
            color: #7f7f7f;
            margin-left: 15px;
          }
          p {
            width: 36px;
            height: 36px;
            margin-left: 5px;
            text-align: center;
            line-height: 36px;
            background-color: rgba(0, 0, 0, 0.06);
          }
          p:nth-child(2) {
            margin-left: 40px;
          }
        }
        .alert {
          position: absolute;
          top: 355px;
          left: 1040px;
          z-index: 4;
          p {
            width: 100px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;
            border-radius: 25px;
          }
        }
        .gou {
          margin-top: 20px;
          display: flex;
          align-items: center;
          > div {
            width: 288px;
            height: 48px;
            display: flex;
            a {
              width: 50%;
              text-align: center;
              line-height: 48px;
              color: #fff;
              text-decoration: none;
            }
            a:nth-child(1) {
              background: linear-gradient(
                90deg,
                rgb(255, 119, 0),
                rgb(255, 73, 0)
              );
              box-shadow: rgb(255 119 0 / 20%) 0px 9px 13px 0px;
              border-top-left-radius: 24px;
              border-bottom-left-radius: 24px;
            }
            a:nth-child(2) {
              background: linear-gradient(
                90deg,
                rgb(255, 203, 0),
                rgb(255, 148, 2)
              );
              box-shadow: rgb(255 203 0 / 20%) 0px 9px 13px 0px;
              border-top-right-radius: 24px;
              border-bottom-right-radius: 24px;
            }
          }
          > span {
            color: #eee;
            margin-left: 30px;
          }
          > p {
            width: 70px;
            text-align: center;
            margin-left: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;

            img {
              vertical-align: middle;
              transform: translateY(-2px);
            }
          }
          > p:hover {
            background: rgba(0, 0, 0, 0.06);
          }
        }
      }
    }
    .main {
      width: 100%;
      padding: 25px 0;
      border-bottom: 1px solid #eee;
      a {
        text-decoration: none;
        margin-left: 30px;
        color: #000;
      }
    }
  }
  .aside {
    position: fixed;
    right: 0;
    top: 200px;
    z-index: 2;
  }
}
.boder {
  border: 1px solid #ff5000 !important;
  color: #ff5000 !important;
}
.se {
  color: #f40 !important;
}
</style>