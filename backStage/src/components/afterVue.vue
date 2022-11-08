<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <div class="father">
          <div class="father3">
            <el-icon size="50px" class="icon">
              <Management />
            </el-icon>
            <h1 class="mb-2 title1">
              施华洛世奇后台管理系统</h1>
          </div>
          <button>退出</button>
        </div>
        <!-- 侧边栏区域 -->
        <div class="father2">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#363d3d" unique-opened>
            <router-link to="/listOfUsers">
              <el-menu-item index="1">
                <el-icon>
                  <User />
                </el-icon>
                <span>用户管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/listOfGoods">
              <el-menu-item index="2">
                <el-icon>
                  <Flag />
                </el-icon>
                <span>订单管理</span>
              </el-menu-item>
            </router-link>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <ShoppingBag />
                </el-icon>
                <span>商品管理</span>
              </template>
              <el-menu-item-group title="分类一">
                <el-menu-item index="3-1">111</el-menu-item>
                <el-menu-item index="3-2">222</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分类二">
                <el-menu-item index="3-3">333</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="3-4">
                <template #title>444</template>
                <el-menu-item index="3-4-1">111</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="4">
              <el-icon>
                <setting />
              </el-icon>
              <span>数据统计</span>
            </el-menu-item>
            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <Stamp />
                </el-icon>
                <span>个人中心</span>
              </template>
              <el-menu-item index="4-1">111</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <!-- 内容区域 -->
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
// 引用小图标
import {
  Management,
  User,
  Crop,
  ShoppingBag,
  Notebook,
  DataAnalysis,
  Stamp,
  Flag,
} from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {};
const handleClose = (key: string, keyPath: string[]) => {};

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {};
const handleDelete = (index, row) => {};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    aaa: "https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
    aaa: "https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
    aaa: "https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
    aaa: "https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg",
  },
];
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.father {
  width: 100%;
  background-color: #363d3d;
  color: #fff;
  height: 150px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  justify-content: space-between;
}
.title1 {
  margin-left: 30px;
}
.tac {
  display: block;
}
.el-menu {
  width: 300px;
}
.el-col-12 {
  max-width: 100%;
  height: 100%;
}
.el-sub-menu__title {
  color: #fff;
}
.el-menu-item {
  color: #fff;
}
.el-menu--vertical {
  height: 883px;
}
.el-header {
  padding: 0;
}
.father2 {
  display: flex;
}
.el-table .el-table__cell {
  z-index: initial;
}
.father3 {
  display: flex;
  align-content: center;
}
/* 小图标 */
.icon {
  margin-top: 5px;
}
.father > button {
  width: 100px;
  height: 50px;
  background-color: red;
  color: #fff;
  margin-right: 30px;
}
</style>