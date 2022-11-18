<template>
  <!-- 侧边导航栏 -->
  <div class="list">
    <div class="nav">
      <div class="head">
        <h2>宝贝排行榜</h2>
      </div>
      <div class="top">
        <p>销售量</p>
        <p>收藏数</p>
      </div>
      <!-- 商品 -->
      <div class="main">
        <div v-for="(item,index) in list.list"
             :key="index"
             class="shop">
          <div class="left">
            <div>
              <img :src="item.src"
                   alt="">
              <!-- 鼠标悬浮的时候显示图片 -->
              <div class="zhe">
                <img :src="item.src"
                     alt="">
              </div>
            </div>
          </div>

          <div class="right">
            <router-link to=""
                         class="title">{{item.title}}</router-link>
            <p>{{item.price}}</p>
            <p>已收藏<span>{{item.sum}}</span>笔</p>
          </div>
        </div>
      </div>
      <!-- 查看更多 -->
      <div class="gen">
        <router-link to=""
                     class="geng">
          <p>查看更多宝贝</p>
          <img src="../../../public/images/fenye/a8.png"
               alt="">
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'TopVue',
  setup() {
    const list = reactive({
      list: [
        {
          src: '../../public/images/fenye/a3.jpg',
          title: '【双十一】施华洛世奇',
          price: '￥1250.00',
          sum: 580158,
        },
        {
          src: '../../public/images/fenye/a4.jpg',
          title: '【双十一】施华洛世奇',
          price: '￥995.00',
          sum: 301322,
        },
        {
          src: '../../public/images/fenye/a5.jpg',
          title: '【双十一】施华洛世奇',
          price: '￥995.00',
          sum: 265080,
        },
        {
          src: '../../public/images/fenye/a6.jpg',
          title: '【双十一】施华洛世奇',
          price: '￥995.00',
          sum: 143312,
        },
        {
          src: '../../public/images/fenye/a7.jpg',
          title: '【双十一】施华洛世奇',
          price: '￥1250.00',
          sum: 580158,
        },
      ],
    })
    return {
      list,
    }
  },
}
</script>

<style lang="less" scoped>
.list {
  width: 190px;
  margin: -10px auto 20px;
  border: 1px solid #ccc;
  .nav {
    width: 100%;
    .head {
      background-color: #000;
      h2 {
        color: #fff;
        font-size: 14px;
        margin-left: 16px;
        line-height: 25px;
        margin-block-start: 0em;
        margin-block-end: 0em;
      }
    }
    .top {
      display: flex;
      p {
        width: 50%;
        text-align: center;
        margin-block-start: 0em;
        margin-block-end: 0em;
        color: #666;
      }
    }
    .main {
      width: 100%;
      .shop {
        display: flex;
        border-bottom: 1px dotted #ebebeb;
        padding: 10px;
        .left {
          z-index: 8;
          position: relative;
          > div {
            > img {
              width: 42px;
              height: 42px;
            }
            .zhe {
              width: 130px;
              height: 130px;
              position: absolute;
              left: 48px;
              top: 0;
              border: 1px solid #000;
              display: none;
              img {
                width: 130px;
                height: 130px;
              }
            }
          }
        }
        .left:hover .zhe {
          display: block;
        }
        .right {
          margin-left: 5px;
          .title {
            text-decoration: none;
            font-size: 12px;
            color: #666;
          }
          .title:hover {
            text-decoration: underline;
          }
          p {
            margin-block-start: 0em;
            margin-block-end: 0em;
          }
          p:nth-child(2) {
            color: red;
            font-size: 12px;
          }
          p:nth-child(3) {
            color: #666;
            font-size: 12px;
            span {
              color: #c97;
            }
          }
        }
      }
    }
    .gen {
      width: 100%;
      .geng {
        width: 100px;
        text-decoration: none;
        background-color: #e5e5e5;
        color: #666;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px 0;
        margin-left: 23%;
        p {
          font-size: 12px;
        }
      }
    }
  }
}
</style>