<template>
  <div>
    <h2>订单管理</h2>
    <div class="trade-father">
      <el-input v-model="ccc.value1" class="w-50 m-2" placeholder="请输入你要查询的订单号" :prefix-icon="Search" />
      <button @click="Inquire">查询</button>
      <button @click="all">查看所有订单</button>
    </div>
    <div class="content">
      <el-table :data="ddd.tableData1[0]?ddd.tableData1:tableData" :border="parentBorder" style="width: 100%">
        <el-table-column prop="date" label="日期" width="280" />
        <el-table-column prop="name" label="商品名称" width="280" />
        <el-table-column prop="price" label="价格" width="280" />
        <el-table-column prop="aaa" label="订单编号" width="380" />
        <el-table-column prop="state" label="状态" width="280" />
      </el-table>
    </div>
  </div>
</template>

<script  setup>
import { computed, ref, reactive } from "vue";
import { Search } from '@element-plus/icons-vue'
const ccc = reactive({
  value1: ''
})
// 查询按钮点击
let ddd = reactive({
  tableData1: []
})
// 点击查询
const Inquire = function () {
  for (var i = 0; i < tableData.length; i++) {
    if (tableData[i].aaa == ccc.value1) {
      ddd.tableData1 = []
      ddd.tableData1.unshift(tableData[i])
    }
  }
}
// 点击查询所有
const all = function () {
  ddd.tableData1 = []
}

const parentBorder = ref(false)
const childBorder = ref(false)


const tableData = reactive([
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    price: 199.00,
    aaa: "42141252151252155125",
    state: "未完成"
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "John",
    price: 189.00,
    aaa: "12515125215215125215",
    state: "未完成"
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Morgan",
    price: 179.00,
    aaa: "12521512512521521512",
    state: "已完成"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "6556856856856886585",
    state: "进行中"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "345634634734734",
    state: "未完成"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "870780567856743634",
    state: "已完成"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "97807807078",
    state: "未完成"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "234234242342432",
    state: "已完成"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "457455474575474574",
    state: "未完成"
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Jessy",
    price: 169.00,
    aaa: "768679867967967867",
    state: "已完成"
  },
])
</script>

<style>
/* .el-table .el-table__cell {
  z-index: initial;
} */
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
</style>