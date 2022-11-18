<template>
  <div class="banner">
    <ul>
      <li v-for="(item,index) in list.data"
          :key="index"
          :class="list.isnav==index?'lis':''"
          @click="list.nav(index)">
        {{item.nums}}
      </li>
    </ul>
    <div class="search">
      <!-- <input type="text" v-model="searchText" placeholder="输入订单号或者商品名称进行搜索">
      <span @click="search">
        订单搜索
      </span> -->
      <!-- 全选和删除已选 -->
      <div class="handleQuan">
        <!-- <div class="checkAll">
          <input type="checkbox" v-model="allChecked" @change="allSelect">
          <p>
            全选
          </p>
        </div>
        <p class="delCheck" @click="hint">
          删除已选
        </p> -->
      </div>
      <!-- 遮罩层提示框 -->
      <div class="zhe"
           :style="zhe === true ? 'display:block' : 'display:none' ">
        <div class="hint">
          <div class="hint_font">
            <span>
              是否删除选中订单
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
import { reactive, ref } from 'vue'
import bus from '../../bus.js'
export default {
  components: {},
  setup() {
    // 头部选项卡
    const list = reactive({
      data: [
        { nums: '所有订单' },
        { nums: '未付款' },
        { nums: '进行中' },
        { nums: '已完成' },
      ],
      isnav: 0,
      nav(index) {
        list.isnav = index
        bus.emit('sizer', list.data[index].nums)
      },
    })

    // 全选状态
    let allChecked = ref(false)
    // 全选事件
    const allSelect = () => {
      allChecked.value = !allChecked.value
      bus.emit('allSelect', !allChecked.value)
    }
    //全选状态改变
    bus.on('selectLength', (v) => {
      allChecked.value = v
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
    //删除选中
    const delSelect = () => {
      bus.emit('delSelect')
      if (allChecked.value !== false) {
        allChecked.value = !allChecked.value
      }
      zhe.value = false
    }
    // 搜索
    let searchText = ref()
    const search = () => {
      bus.emit('search', searchText.value)
    }

    return {
      list,
      allChecked,
      allSelect,
      delSelect,
      search,
      searchText,
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
  height: 115px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0px;
  border-bottom: 1px solid #999;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    height: 50px;

    li {
      margin-left: 20px;
      width: 100px;
      text-align: center;
      border-right: 1px solid #333;
      box-sizing: border-box;
      font-weight: 700;
    }

    .lis {
      margin-left: 20px;
      width: 100px;
      text-align: center;
      border-right: 1px solid #333;
      box-sizing: border-box;
      font-weight: 700;
      color: #f40;
    }

    li:hover {
      color: #f40;
      text-decoration: underline;
    }

    li:last-child {
      border-right: none;
    }
  }

  .search {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-top: 3px solid #333;
    padding-left: 50px;
    display: flex;
    align-items: center;

    input {
      height: 30px;
      width: 220px;
    }

    span {
      display: inline-block;
      width: 80px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      background-color: #f5f5f5;
      border: 1px solid #999;
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

          span {
            border: none;
            background-color: #fff;
            width: 100%;
          }
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

  .handleQuan {
    height: 60px;
    display: flex;
    align-items: center;

    .checkAll {
      display: flex;
      align-items: center;
      margin-left: 0px;

      input {
        width: 15px;
        height: 15px;
      }
    }

    .delCheck {
      margin-left: 90px;
      font-size: 17px;
      font-weigh: 600;
    }

    .delCheck:hover {
      color: #f40;
      text-decoration: underline;
    }
  }
}
</style>

