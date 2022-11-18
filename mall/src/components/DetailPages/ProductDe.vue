<template>
  <!-- 宝贝详情页 -->
  <div class="product">
    <!-- {{datas.datas}} -->
    <div class="center">
      <div class="head">
        <div>
          <p v-for="(item,i) in datas.datas"
             :key="i">{{item}}</p>
        </div>

      </div>
      <!-- 可点击的图片 -->
      <div class="img">
        <div class="a1">
          <div class="tou">
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a23.png"
                   alt="">
            </router-link>
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a24.jpg"
                   alt="">
            </router-link>
          </div>
          <div class="main">
            <div class="top">
              <img src="../../../public/images/DetailPages/a39.png"
                   alt="">
            </div>
            <div class="center">
              <router-link to="/">
                <img src="../../../public/images/DetailPages/a25.jpg"
                     alt="">
                <p>加购有惊喜></p>
              </router-link>
              <router-link to="/">
                <img src="../../../public/images/DetailPages/a26.png"
                     alt="">
                <p>新客入会享好礼></p>
              </router-link>
            </div>
            <div class="footer">
              <router-link to="/">
                <img src="../../../public/images/DetailPages/a27.jpg"
                     alt="">
              </router-link>
            </div>
          </div>
        </div>
        <div class="a2">
          <div class="head">
            <div class="img">
              <router-link to="/">
                <img src="../../../public/images/DetailPages/a28.png"
                     alt="">
              </router-link>
              <router-link to="/">
                <img src="../../../public/images/DetailPages/a29.png"
                     alt="">
              </router-link>
              <router-link to="/">
                <img src="../../../public/images/DetailPages/a30.jpg"
                     alt="">
              </router-link>
            </div>
          </div>
          <div class="main">
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a31.png"
                   alt="">
            </router-link>
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a32.png"
                   alt="">
            </router-link>
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a33.png"
                   alt="">
            </router-link>
          </div>
        </div>
        <!-- 固定的图片 -->
        <div class="a3">
          <img src="../../../public/images/DetailPages/a13.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a14.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a15.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a16.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a17.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a18.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a19.jpg"
               alt="">
          <img src="../../../public/images/DetailPages/a20.jpg"
               alt="">
        </div>
        <!-- 买家须知 -->
        <div class="a4">
          <div class="head">
            <router-link to="/">
              <span></span>
              <h2>买家须知</h2>
              <span></span>
            </router-link>
          </div>
          <div class="img">
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a34.png"
                   alt="">
              <h2>退换货</h2>
            </router-link>
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a35.png"
                   alt="">
              <h2>关于色差</h2>
            </router-link>
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a36.png"
                   alt="">
              <h2>关于尺寸</h2>
            </router-link>
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a37.png"
                   alt="">
              <h2>发票</h2>
            </router-link>
          </div>
          <div class="fotter">
            <router-link to="/">
              <img src="../../../public/images/DetailPages/a38.png"
                   alt="">
            </router-link>
          </div>
        </div>
        <div class="a5">
          <img src="../../../public/images/DetailPages/a22.png"
               alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '../../bus.js'
import { reactive } from '@vue/runtime-core'
export default {
  name: 'ProductDe',
  setup() {
    let datas = reactive({
      datas: [],
    })
    setTimeout(() => {
      let a = JSON.parse(localStorage.getItem('data'))
      datas.datas = a[0].parameter.split(';')
    }, 500)

    return {
      datas,
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
.product {
  width: 100%;
  margin-top: 50px;
  .center {
    width: 790px;
    margin: 20px auto 0;
    .head {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      > div {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        p {
          width: 33%;
          color: #4e4e4e;
          font-size: 12px;
        }
      }
    }
    .img {
      width: 100%;
      padding: 15px 20px 0;
      .a1 {
        width: 100%;
        .tou {
          width: 100%;
          a {
            width: 50%;
            display: inline-block;
            img {
              border-radius: 15px;
              width: 100%;
              height: 350px;
            }
          }
        }
        .main {
          width: 100%;
          padding: 10px 15px;
          background-color: #a81e36;
          border-radius: 15px;
          a {
            text-decoration: none;
          }
          .top {
            width: 100%;
            img {
              width: 100%;
            }
          }
          .center {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            a {
              width: 50%;
              text-align: center;
              color: #fff;
              font-size: 20px;
            }
          }
          .footer {
            width: 100%;
            margin: 10px auto;
            a {
              width: 100%;
              display: inline-block;
              text-align: center;
              img {
                width: 660px;
                margin: 0 auto;
              }
            }
          }
        }
      }
      .a2 {
        width: 100%;
        .head {
          width: 100%;
          background-color: #e8e8e8;
          .img {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
          }
        }
        .main {
          width: 100%;
          background-color: #d8ba94;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          padding: 10px 0;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }
      }
      .a3 {
        width: 100%;
        margin-top: 10px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .a4 {
        width: 100%;
        margin-top: -4px;
        background-color: #f0f0e4;
        .head {
          width: 100%;
          padding: 20px 0;
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            span {
              display: inline-block;
              width: 30px;
              height: 3px;
              line-height: 3px;
              background-color: #000;
            }
            h2 {
              margin: 0 15px;
              color: #000;
            }
          }
        }
        .img {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          a {
            width: 25%;
            text-align: center;
            text-decoration: none;
            h2 {
              color: #000;
            }
          }
        }
        .fotter {
          width: 100%;
          text-align: center;
          padding: 30px 0;
        }
      }
      .a5 {
        width: 100%;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>