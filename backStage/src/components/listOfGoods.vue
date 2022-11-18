<template>
  <div class="BigFather">
    <h2>订单管理</h2>
    <div class="trade-father">
      <el-input v-model="ccc.value1"
                class="w-50 m-2"
                placeholder="请输入你要查询的订单号"
                :prefix-icon="Search" />
      <button @click="ok('cx')">查询</button>
      <button @click="ok('all')">查看所有订单</button>
      <button @click="ok('ywc')">已完成</button>
      <button @click="ok('djs')">待结算</button>
      <button @click="ok('wfk')">未付款</button>
      <button @click="ok('jxz')">进行中</button>
    </div>
    <div class="content">
      <el-table :data="ddd.tableData1.slice((fy.currentPage-1)*fy.pageSize,fy.currentPage*fy.pageSize)"
                :border="parentBorder"
                style="width: 100%">
        <el-table-column prop="orderid"
                         label="订单编号"
                         align="center"
                         min-width="180" />
        <el-table-column prop="stime"
                         label="提交时间"
                         align="center"
                         min-width="280" />
        <el-table-column prop="title"
                         label="商品名称"
                         align="center"
                         min-width="180" />
        <el-table-column prop="num"
                         label="购买数量"
                         align="center"
                         min-width="80" />

        <el-table-column prop="ftime"
                         label="完成时间"
                         align="center"
                         min-width="180" />
        <el-table-column prop="state"
                         label="状态"
                         align="center"
                         min-width="180" />

      </el-table>
    </div>
    <!-- 分页器 -->

    <div class="demo-pagination-block">
      <el-pagination v-model:currentPage="fy.currentPage"
                     v-model:page-size="fy.pageSize"
                     :page-sizes="[3, 5, 8, 20]"
                     :small="fy.small"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total=fy.sss
                     @size-change="fy.handleSizeChange"
                     @current-change="fy.handleCurrentChange" />
    </div>

  </div>

</template>

<script  setup>
import { computed, ref, reactive, getCurrentInstance } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance()

const fy = reactive({
  pageSize: 20,
  currentPage: 1,
  small: false,
  handleSizeChange: () => {},
  handleCurrentChange: () => {},
  sss: 5,
})
let ddd = reactive({
  datay: [],
  cx: 'all',
  tableData1: computed(() => {
    const ppp = {
      ywc: (i) => i.state == '已完成',
      wfk: (i) => i.state == '未付款',
      jxz: (i) => i.state == '进行中',
      djs: (i) => i.state == '待结算',
      all: (i) => i,
      cx: (i) => i.orderid.includes(ccc.value1),
    }
    return ddd.datay.filter((i) => {
      return ppp[ddd.cx](i)
    })
  }),
  c: () => {
    fy.sss = ddd.datay.length
  },
})

const ccc = reactive({
  value1: '',
})
// 四个点击事件
const ok = function (e, f, g) {
  ddd.c()
  ddd.cx = e
}

const parentBorder = ref(false)
const childBorder = ref(false)

// 获取数据
proxy.$axios
  .post('/seldata', { table: 'cart' })
  .then((d) => {
    ddd.datay = d.data
  })
  .catch((err) => console.log(err))
</script>

<style>
.trade-father {
  display: flex;
  align-items: center;
  margin-left: 68px;
}
.trade-father button{
  min-width: 100px;
}
.trade-father div:nth-child(2) {
  margin-left: 15px;
}
.trade-father button:nth-child(2) {
  width: 75px;
  height: 26px;
  background-color: #fff;
  color: black;
  text-align: center;
  line-height: 7.5px;
  margin-left: 15px;
}
.trade-father button:nth-child(3) {
 min-width: 150px;
}
.trade-father button:nth-child(4) {
  background-color: red;
  color: #fff;
  margin-left: 45%;
}
.trade-father button:nth-child(5) {
  background-color: red;
  color: #fff;
  margin-left: 1%;
}
.trade-father button:nth-child(6) {
  background-color: red;
  color: #fff;
  margin-left: 1%;
}
.trade-father button:nth-child(7) {
  background-color: red;
  color: #fff;
  margin-left: 1%;
}
.trade-father button:nth-child(3) {
  width: 150px;
  height: 26px;
  background-color: #fff;
  color: black;
  text-align: center;
  line-height: 7px;
  margin-left: 15px;
}
h2 {
  padding: 23px;
}
.content {
  background-color: #fff;
  margin: 23px 68px;
}
.w-50 {
  width: 230px;
}
.red {
  color: red;
}
.delete {
  background-color: #fa6a6c;
  width: 100px;
  height: 36px;
}
.demo-pagination-block {
  width: 650px;
  margin: 0 auto;
}
.BigFather {
  width: 100%;
  overflow: hidden;
}
</style>