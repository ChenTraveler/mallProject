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
      <button @click="ok('wwc')">未完成</button>
      <button @click="ok('jxz')">进行中</button>
    </div>
    <div class="content">
      <el-table :data="ddd.tableData1.slice((fy.currentPage-1)*fy.pageSize,fy.currentPage*fy.pageSize)"
                :border="parentBorder"
                style="width: 100%">
        <el-table-column prop="date"
                         label="日期"
                         min-width="180" />
        <el-table-column prop="name"
                         label="商品名称"
                         min-width="180" />
        <el-table-column prop="price"
                         label="价格"
                         min-width="180" />
        <el-table-column prop="aaa"
                         label="订单编号"
                         min-width="280" />
        <el-table-column prop="state"
                         label="状态"
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
import { computed, ref, reactive } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
const fy = reactive({
  pageSize: 20,
  currentPage: 1,
  small: false,
  handleSizeChange: () => {},
  handleCurrentChange: () => {},
  sss: 11,
})
let ddd = reactive({
  cx: 'all',
  tableData1: computed(() => {
    const ppp = {
      ywc: (i) => i.state == '已完成',
      wwc: (i) => i.state == '未完成',
      jxz: (i) => i.state == '进行中',
      all: (i) => i,
      cx: (i) => i.aaa.includes(ccc.value1),
    }
    return tableData.filter((i) => {
      return ppp[ddd.cx](i)
    })
  }),
  c: () => {
    fy.sss = tableData.length
  },
})

const ccc = reactive({
  value1: '',
})
// 四个点击事件
const ok = function (e, f, g) {
  ddd.c()
  // if(e==='cx'&& ccc.value1===''){
  //  return false
  // }
  ddd.cx = e
}

const parentBorder = ref(false)
const childBorder = ref(false)

const tableData = reactive([
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    price: 199.0,
    aaa: '42141252151252155125',
    state: '未完成',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'John',
    price: 189.0,
    aaa: '12515125215215125215',
    state: '未完成',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Morgan',
    price: 179.0,
    aaa: '12521512512521521512',
    state: '已完成',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '6556856856856886585',
    state: '进行中',
  },
  {
    id: 5,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '345634634734734',
    state: '未完成',
  },
  {
    id: 6,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '870780567856743634',
    state: '进行中',
  },
  {
    id: 7,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '97807807078',
    state: '未完成',
  },
  {
    id: 8,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '234234242342432',
    state: '已完成',
  },
  {
    id: 9,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '457455474575474574',
    state: '未完成',
  },
  {
    id: 10,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '768679867967967867',
    state: '已完成',
  },
  {
    id: 11,
    date: '2016-05-01',
    name: 'Jessy',
    price: 169.0,
    aaa: '768679867967967867',
    state: '已完成',
  },
])
</script>

<style>
.trade-father {
  display: flex;
  align-items: center;
  margin-left: 68px;
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
  margin: 0 500px;
}
.BigFather{
  width: 100%;
  overflow: hidden;
}
</style>