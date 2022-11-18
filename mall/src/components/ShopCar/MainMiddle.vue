<template>
  <div class="banner">
    <div class="nav">
      <div class="left">
        <!-- <input type="checkbox">
        <span>全选</span> -->
        <span class="msg">商品信息</span>
      </div>
      <div class="right">
        <p>单价</p>
        <p>数量</p>
        <p>金额</p>
        <p>操作</p>
      </div>
    </div>
    <ul>
      <li v-for="(emit) in list"
          :key="emit.id">
        <!-- 活动 -->
        <div class="activity">
          <img src="../../../public/images/shopcar/shop01.png"
               alt="">
          <span>12.11 20点开享,每满300减50</span>
        </div>
        <!-- 商品 -->
        <div class="shop">
          <!-- 单选按钮 -->
          <p class="radio">
            <input type="checkbox"
                   :checked="emit.flag==='f' ? false : true"
                   @click="radio(emit.id)">
          </p>
          <!-- 商品详情 -->
          <p class="shopmsg">
            <router-link to="/shopcar">
              <img :src="url + emit.img"
                   alt="">
            </router-link>
            <router-link to="/shopcar"
                         class="jieshao">
              {{emit.title}}
            </router-link>
          </p>
          <!-- 类别 -->
          <p class="sort">
            {{emit.guige}}
          </p>
          <!-- 单价 -->
          <p class="unit">
            <span>￥</span><span>{{emit.price}}</span>
          </p>
          <!-- 数量 -->
          <p class="quantity">
            <span class="shu">
              <!-- 减号 -->
              <span class="sub"
                    @click="add.sub(emit.id)">-</span>
              <!-- 数量 -->
              <input type="text"
                     :value=emit.num
                     @blur="manual(emit.id,$event)" />
              <!-- 加号 -->
              <span class="add"
                    @click="add.add(emit.id)">+</span>
            </span>
            <span class="xian">
              限购{{emit.mostnum}}件
            </span>
          </p>
          <!-- 金额 -->
          <p class="sum">
            <span>￥</span><span>{{emit.num*emit.price}}</span>
          </p>
          <!-- 操作 -->
          <p class="handle">
            <span @click="hint">删除</span>
          </p>
          <!-- 遮罩层提示框 -->
          <div class="zhe"
               :style="zhe === true ? 'display:block' : 'display:none' ">
            <div class="hint">
              <div class="hint_font">
                <span>
                  是否删除该商品
                </span>
              </div>
              <div class="anniu">
                <p class="oks"
                   @click="del(emit.id)">确定</p>
                <p class="nos"
                   @click="nos">取消</p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <!-- 购物车为空时 -->
      <div class="empty"
           v-if="empty">
        <p>购物车里空空的，啥也没有</p>
        <p>
          <router-link to="/index"
                       class="stroll">点击去逛逛</router-link>
        </p>
      </div>
    </ul>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import throttile from '../../throttile.js'
import bus from '../../bus.js' // 引入mitt
export default {
  setup() {
    // 解构代理
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const url = ref('http://192.168.3.21:3000/')
    //判断购物车是否为空
    let empty = computed(() => {
      return store.state.empty
    })

    // 查找并获取数据
    proxy.$axios
      .post('/seldata', {
        table: 'cart',
        other: `where submit='f' and state='待结算'`,
      })
      .then((d) => {
        // 将数据传给vuex
        console.log(d.data)
        proxy.$store.commit('GETDATA', d.data)
      })
      .catch((err) => console.log(err))

    //获取数据
    const list = computed(() => {
      return store.state.data
    })
    // console.log(list);

    //  改变单选状态
    function radio(id) {
      store.commit('RADIO', id)
    }
    const add = reactive({
      // 数量加
      add: throttile(function (id) {
        store.commit('ADD', id)
        console.log(111)
      }, 10),
      // 数量减
      sub: throttile(function (id) {
        store.commit('SUB', id)
      }, 10),
    })
    // 控制遮罩层状态
    const zhe = ref(false)
    // 遮罩层弹出
    function hint() {
      zhe.value = true
    }
    // 取消
    function nos() {
      zhe.value = false
    }
    // 确定删除
    function del(id) {
      zhe.value = false
      store.commit('DEL', id)
    }
    //手动输入数量
    function manual(id, e) {
      store.commit('MANUAL', [id, e.target.value])
    }
    return {
      store,
      add,
      list,
      radio,
      del,
      manual,
      empty,
      zhe,
      hint,
      nos,
      url,
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 0px 20px;
  border-bottom: 1px solid #999;

  .nav {
    color: #3c3c3c;
    font-size: 13px;
    font-weight: 700;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .msg {
    margin-left: 100px;
  }

  .right {
    display: flex;

    p {
      margin: 0 60px;
    }
  }

  ul {
    list-style: none;
    margin-top: -10px;
    padding-bottom: 20px;

    .empty {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      background-color: #ececec;

      .stroll {
        color: #f40;
      }

      .stroll:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    li {
      height: 170px;
      padding: 0 20px;
      margin: 30px 0 0 0;
      background-color: #e8e8e8;
      border-radius: 20px;

      // 活动
      .activity {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 95px;
        border-bottom: 1px solid #999;

        img {
          height: 16px;
        }

        span {
          font-size: 12px;
        }
      }

      .shop {
        height: 120px;
        display: flex;
        align-items: center;

        // 商品详情
        .shopmsg {
          display: flex;
          margin-left: 10px;

          img {
            width: 80px;
            height: 80px;
          }

          .jieshao {
            width: 239px;
            font-size: 12px;
            color: #3c3c3c;
            text-decoration: none;
            margin-left: 10px;
          }

          .jieshao:hover {
            color: #ff5000;
            text-decoration: underline;
          }
        }

        // 类别
        .sort {
          width: 148px;
          text-align: center;
          color: #9c9c9c;
          font-size: 12px;
          margin-left: 10px;
        }

        // 单价
        .unit {
          font-size: 12px;
          color: #3c3c3c;
          font-weight: 700;
          margin-left: 120px;
        }

        // 数量
        .quantity {
          width: 80px;
          margin-left: 90px;

          .shu {
            display: block;
            width: 80px;
            border: 1px solid #efbba9;
            display: flex;
            justify-content: space-between;
            background-color: #fff0e7;

            input {
              width: 41px;
              height: 25px;
              text-align: center;
            }

            .add {
              color: #f40;
              width: 20px;
              text-align: center;
              line-height: 25px;
              box-sizing: border-box;
            }

            .add:hover {
              border: 1px solid #f40;
              cursor: pointer;
            }

            .sub {
              color: #f40;
              width: 20px;
              text-align: center;
              line-height: 25px;
              box-sizing: border-box;
            }

            .sub:hover {
              border: 1px solid #f40;
              cursor: pointer;
            }
          }

          .xian {
            display: block;
            width: 80px;
            border: 1px solid #efbba9;
            background-color: #fff0e7;
            text-align: center;
            color: #f40;
          }
        }

        // 金额
        .sum {
          width: 100px;
          color: #f40;
          font-size: 14px;
          font-weight: 700;
          margin-left: 85px;
        }

        // 操作
        .handle {
          color: #3c3c3c;
          margin-left: 55px;
        }

        .handle:hover {
          color: #f40;
          text-decoration: underline;
          cursor: pointer;
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
    }
  }
}
</style>