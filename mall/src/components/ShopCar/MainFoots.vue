<template>
  <div class="banner">
    <div class="left">
      <p>
        <input type="checkbox"
               :checked="allcheck"
               @click="checkAll">
        <span>全选</span>
      </p>
      <span class="del"
            @click="hint(sum)">删除已选宝贝</span>
    </div>
    <div class="right">
      <p class="selected">已选商品<span class="shu">{{pitch}}</span>件</p>
      <p class="total">合计（不含运费）：</p>
      <p class="price"><span>￥</span>{{sum}}</p>
      <p :class="sum===0 ?  'close_01' : 'close' "
         @click="account(sum)">结算</p>
      <!-- 遮罩层提示框 -->
      <div class="zhe"
           :style="zhe === true ? 'display:block' : 'display:none' ">
        <div class="hint">
          <div class="hint_font">
            <span>
              是否删除选中商品
            </span>
          </div>
          <div class="anniu">
            <p class="oks"
               @click="delSelect">确定</p>
            <p class="nos"
               @click="nos">取消</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import bus from '../../bus.js'
import { useRouter } from 'vue-router'
export default {
  components: {},
  setup() {
    const $router = useRouter()

    const store = useStore()
    let allcheck = computed(() => {
      return store.state.allcheck
    })
    // 总价
    const sum = computed(() => {
      return store.state.sum * 1
    })
    // 全选
    function checkAll() {
      store.commit('CHECKALL', allcheck)
      // console.log(!allcheck);
    }

    //选中商品
    const pitch = computed(() => {
      return store.state.radio * 1
    })
    // 结算
    function account(sum) {
      // console.log(sum)
      if (sum !== 0) {
        store.commit('ACCOUNT')
        // console.log(sum,store.state.ids);
        setTimeout(() => {
          bus.emit('account', [sum, store.state.ids])
        })
        $router.push('/mains')
        localStorage.setItem('list', JSON.stringify([]))
      }
    }

    // 控制遮罩层状态
    const zhe = ref(false)
    // 遮罩层弹出
    function hint(v) {
      if (v !== 0) {
        zhe.value = true
      }
    }
    // 取消
    function nos() {
      zhe.value = false
    }
    // 确定删除
    function delSelect(id) {
      zhe.value = false
      store.commit('DELSELECT')
    }
    return {
      sum,
      allcheck,
      checkAll,
      delSelect,
      pitch,
      account,
      zhe,
      hint,
      nos,
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner {
  width: 1200px;
  height: 75px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  .left {
    width: 180px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .del:hover {
      color: #f40;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin-left: 20px;
    }

    .selected {
      font-size: 14px;
      margin-right: 80px;

      .shu {
        color: #f40;
        font-weight: 700;
        font-size: 20px;
        margin: 0 5px;
      }
    }

    .total {
      font-size: 12px;
      margin-right: -5px;
    }

    .price {
      width: 180px;
      color: #ff5000;
      font-size: 22px;
      font-weight: 500;
    }

    .close {
      width: 74px;
      height: 42px;
      line-height: 42px;
      color: #fff;
      background: #FF5000;
      border-radius: 21px;
      text-align: center;
      font-size: 16px;
    }

    .close_01 {
      width: 74px;
      height: 42px;
      line-height: 42px;
      color: #fff;
      background: #aaa;
      border-radius: 21px;
      text-align: center;
      font-size: 16px;
    }

    .zhe {
      background-color: rgba(0, 0, 0, 0.4);
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
</style>

