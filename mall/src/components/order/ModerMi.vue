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
        <p>商品操作</p>
        <p>实付款</p>
        <p>交易状态</p>
        <p>交易操作</p>
      </div>
    </div>
    <ul>
      <li v-for="(emit) in data.list"
          :key="emit.id">
        <!-- 日期、订单号 -->
        <div class="activity">
          <span class="date">{{emit.stime}}</span>
          <span>{{emit.orderid}}</span>
        </div>
        <!-- 商品 -->
        <div class="shop">
          <!-- 单选按钮 -->
          <!-- <div class="radio">

            <input type="checkbox"
                   :checked=emit.flag
                   @click="radio(emit.id)">
          </div> -->
          <!-- 商品详情 -->
          <div class="shopmsg">
            <!-- 商品图片 -->
            <router-link to="/shopcar">
              <img :src="url + emit.img"
                   alt="">
            </router-link>
            <!-- 商品介绍 -->
            <div class="character">
              <router-link to="/shopcar"
                           class="jieshao">
                {{emit.title}}
              </router-link>
              <span>
                {{emit.sort}}
              </span>
            </div>

            <!-- 单价 -->
            <div class="unit">
              <span>
                ￥{{emit.price}}
              </span>
            </div>

            <!-- 数量 -->
            <div class="numb">
              <span>
                {{emit.num}}
              </span>
            </div>

            <!-- 商品操作 -->
            <div class="sale">
              <span>
                申请售后
              </span>
            </div>

          </div>

          <!-- 实际付款 -->
          <div class="reality">
            <span class="money">
              ￥{{emit.num*emit.price}}
            </span>
            <span class="yun">
              (含运费:￥0.00)
            </span>
          </div>

          <!-- 交易状态 -->
          <div class="state">
            <span>
              {{emit.state}}
            </span>
          </div>

          <!-- 删除订单 -->
          <div class="del"
               @click="hint">
            <span>
              删除
            </span>
          </div>
        </div>

        <!-- 保险服务 -->
        <div class="insure">
          <p>保险服务</p>
          <p class="maney">￥0.00</p>
        </div>

        <!-- 遮罩层提示框 -->
        <div class="zhe"
             :style="zhe === true ? 'display:block' : 'display:none' ">
          <div class="hint">
            <div class="hint_font">
              <span>
                是否删除该订单
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

      </li>
    </ul>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import { computed, reactive, getCurrentInstance, watch, ref } from 'vue'
import bus from '../../bus.js'
export default {
  setup() {
    // 解构代理
    const { proxy } = getCurrentInstance()

    const { uname } = jwt_decode(localStorage.getItem('token'))

    const data = reactive({
      //定义空数组接收数据
      data: [],
      list: [],
    })

    //监听data数据变化达成全选按钮变化
    watch(
      data.data,
      (n, o) => {
        let selectLength = data.data.reduce(function (previous, current) {
          return previous + (current.flag == true ? 1 : 0)
        }, 0)
        if (selectLength == data.data.length) {
          selectLength = true
        } else {
          selectLength = false
        }
        bus.emit('selectLength', selectLength)
      },
      { deep: true }
    )

    // 查找并获取数据
    proxy.$axios
      .post('/seldata', {
        table: 'cart',
        other: `where username='${uname}' and submit='t' and isshow='t'`,
      })
      .then((d) => {
        // data.data=d.data.filter((i)=>{
        //   return i.submit==='f'
        // })
        data.data = d.data
        data.list = data.data
        // console.log(data.data)
      })
      .catch((err) => console.log(err))

    // 全选bus值接收
    bus.on('allSelect', (v) => {
      data.data.forEach((item) => {
        item.flag = v
      })
    })

    // 单选按钮
    const radio = (id) => {
      data.data.forEach((item) => {
        if (item.id == id) {
          item.flag = !item.flag
        }
      })
    }

    // 控制遮罩层状态
    let zhe = ref(false)
    // 遮罩层弹出
    function hint() {
      zhe.value = true
    }
    // 取消
    function nos() {
      zhe.value = false
    }
    // 删除
    const del = (id) => delData(id)

    //删除选中
    bus.on('delSelect', () => delData())

    // 删除数据
    function delData(id) {
      let delArrId = []
      // console.log(delArrId);
      // console.log(delArrId[0]);
      if (id) {
        console.log(id)
        data.list = data.list.filter((item) => {
          delArrId.push(id)
          return item.id != id
        })
        zhe.value = false
      } else {
        // console.log('ssss')
        data.list = data.list.filter((item) => {
          if (item.flag == true) {
            delArrId.push(item.id)
          }
          return item.flag != true
        })
        zhe.value = false
      }
      console.log(delArrId)
      // 发起删除数据库请求
      delArrId.forEach((i) => {
        proxy.$axios
          .post('/updcart', { setStr: `isshow='f'`, id: `${i}` })
          .then((data) => {
            console.log(data)
          })
          .catch((err) => console.log(err))
      })
    }

    //搜索
    // bus.on('search', (v) => {
    //   proxy.$axios.post('/seldata', { table: 'cart', other: `title/+ ${v}` }).then(data => {
    //     console.log(data)
    //   })
    // })

    //过滤筛选
    bus.on('sizer', (v) => {
      // console.log(v);
      if (v === '所有订单') {
        data.list = data.data.filter((i) => {
          return i
        })
        // console.log(data.list);
      }
      if (v === '未付款') {
        data.list = data.data.filter((i) => {
          return i.state === '未付款'
        })
        // console.log(data.list);
      }
      if (v === '进行中') {
        data.list = data.data.filter((i) => {
          return i.state === '进行中'
        })
      }
      if (v === '已完成') {
        data.list = data.data.filter((i) => {
          return i.state === '已完成'
        })
      }
    })
    const url = ref('http://localhost:3000/')
    return {
      data,
      radio,
      del,
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
  padding: 30px 0px;
  border-bottom: 1px solid #999;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  .nav {
    color: #3c3c3c;
    font-size: 13px;
    font-weight: 700;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
  }

  .msg {
    margin-left: 100px;
  }

  .right {
    display: flex;

    p {
      margin: 0 45px;
    }
  }

  ul {
    list-style: none;
    margin-top: -10px;

    li {
      height: 210px;
      padding: 0 0px;
      margin: 30px 0 0 0;
      background-color: #e8e8e8;

      // 日期、订单号
      .activity {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-bottom: 1px solid #999;

        img {
          height: 16px;
        }

        span {
          font-size: 12px;
          margin-left: 20px;
        }

        .date {
          font-weight: 700;
        }
      }

      .shop {
        height: 120px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #999;

        .radio {
          height: 80px;
          line-height: 80px;
        }

        // 商品详情
        .shopmsg {
          display: flex;
          margin-left: 20px;

          img {
            width: 80px;
            height: 80px;
          }

          .character {
            display: flex;
            flex-direction: column;

            span {
              font-size: 12px;
              margin: 15px 0 0 10px;
              color: #999;
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

          .unit {
            height: 80px;
            line-height: 80px;
            padding-left: 95px;
          }

          .numb {
            height: 80px;
            line-height: 80px;
            padding-left: 80px;
          }

          .sale {
            height: 80px;
            line-height: 80px;
            padding-left: 100px;
          }
        }

        .reality {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0 10px 45px;

          span {
            height: 20px;
            font-size: 14px;
          }

          .yun {
            color: #999;
          }
        }

        .state {
          font-size: 14px;
          padding-left: 70px;
        }

        .del {
          font-size: 14px;
          padding-left: 95px;
          font-size: 16px;
          color: #333;

          span:hover {
            color: #f40;
            text-decoration: underline;
          }
        }
      }

      .insure {
        height: 40px;
        width: 430px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
      }

      .zhe {
        background-color: rgba(0, 0, 0, 0.1);
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
</style>