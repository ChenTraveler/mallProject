<template>
  <div v-cloak>
    <el-row class="tac">
      <el-col :span="12">
        <div class="father">
          <div class="father3">
            <el-icon size="36px" class="icon">
              <Management />
            </el-icon>
            <h1 class="mb-2 title1">
              施华洛世奇后台管理系统</h1>
          </div>

          <div class="box-father">
            <div class="box">
              <img :src="pic.pic2" alt="">
            </div>
            <button @click="exit">退出</button>
          </div>
        </div>
        <!-- 侧边栏区域 -->
        <div class="father2">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#363d3d"
            unique-opened @select='select' :default-active="active">
            <router-link to="/listOfUsers">
              <el-menu-item index="1" :body="body">
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
              <router-link to="manage">
                <el-menu-item index="3-2">分类管理</el-menu-item>
              </router-link>
            </el-sub-menu>
            <router-link to="/data">
              <el-menu-item index="4">
                <el-icon>
                  <setting />
                </el-icon>
                <span>数据统计</span>
              </el-menu-item>
            </router-link>
            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <Stamp />
                </el-icon>
                <span>个人中心</span>
              </template>
              <!-- <router-link to="/userInfo">
                <el-menu-item index="5-1">个人基本信息</el-menu-item>
              </router-link> -->
              <router-link :to="{ 
              name:'pass',
              }">
                <el-menu-item index="5-2">修改密码</el-menu-item>
              </router-link>
            </el-sub-menu>
          </el-menu>
          <!-- 内容区域 -->
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script  setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

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
import { computed, ref, provide, getCurrentInstance } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
// 解密token文件
import jwt_decode from "jwt-decode";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
let { uname } = jwt_decode(localStorage.getItem("token"));

// 菜单激活
const active = localStorage.getItem('active')
const select = (v) => {
  console.log(v)
  localStorage.setItem('active', v)
}
const router = useRouter();
const handleOpen = (key, keyPath) => { };
const handleClose = (key, keyPath) => { };

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => { };
const handleDelete = (index, row) => { };

// 退出登入按钮
const exit = () => {
  localStorage.removeItem("token");
  router.push({
    path: "/login",
  });
};


const pic = ref({ pic2: '' })

const fn = 2

proxy.$axios
  .post("/api/udata", { other: 'where users.username="' + uname + '"' })
  .then((data) => {
    console.log(data.data)
    pic.value.pic2 = 'http://192.168.119.1/' + data.data[0].headphoto
    console.log(pic)
  })
  .catch((err) => {

  });

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
[v-cloak] {
  display: none;
}
.father {
  width: 100%;
  background-color: #363d3d;
  color: #fff;
  height: 113px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  box-sizing: border-box;
  justify-content: space-between;
}
.title1 {
  margin-left: 23px;
  font-size: 36px;
}
.tac {
  display: block;
}
.el-menu {
  min-width: 225px;
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
  height: 856px;
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
  margin-top: 4px;
}
.father > div > button {
  width: 75px;
  height: 37px;
  background-color: red;
  color: #fff;
  margin-right: 23px;
  line-height: 17px;
}
.box {
  width: 75px;
  height: 75px;
  background-color: red;
  border-radius: 50%;
  margin-right: 40px;
}
.box img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
.box-father {
  display: flex;
  align-items: center;
}
</style>