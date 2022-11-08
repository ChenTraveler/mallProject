<template>
<div>
  <el-row class="tac">
    <el-col :span="12">
      <div class="father">
        <el-icon size="50px"><Management /></el-icon>
      <h1 class="mb-2 title1">
        施华洛世奇后台管理系统</h1>
     </div>
     <!-- 侧边栏区域 -->
     <div class="father2">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color = "#363d3d"
        unique-opened
        router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group title="分类一">
            <el-menu-item index="1-1">111</el-menu-item>
            <el-menu-item index="1-2">222</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分类二">
            <el-menu-item index="1-3">333</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>444</template>
            <el-menu-item index="1-4-1">111</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Crop /></el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item-group title="分类一">
            <el-menu-item index="2-1">111</el-menu-item>
            <el-menu-item index="2-2">222</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分类二">
            <el-menu-item index="2-3">333</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>444</template>
            <el-menu-item index="2-4-1">111</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><ShoppingBag /></el-icon>
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
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Notebook /></el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item-group title="分类一">
            <el-menu-item index="4-1">111</el-menu-item>
            <el-menu-item index="4-2">222</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分类二">
            <el-menu-item index="4-3">333</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="4-4">
            <template #title>444</template>
            <el-menu-item index="4-4-1">111</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><DataAnalysis /></el-icon>
            <span>数据统计</span>
          </template>
          <el-menu-item-group title="分类一">
            <el-menu-item index="5-1">111</el-menu-item>
            <el-menu-item index="5-2">222</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分类二">
            <el-menu-item index="5-3">333</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="5-4">
            <template #title>444</template>
            <el-menu-item index="5-4-1">111</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
      <!-- 内容区域 -->
      <el-main>
        <el-table :data="filterTableData" style="width: 100%" >
    <el-table-column label="商品名称" prop="date" min-width="100" align="center"/>
    <el-table-column label="介绍" prop="name" min-width="100" align="center"/>
    <el-table-column label="价格" prop="name" min-width="100" align="center"/>
    <el-table-column label="图片" align="center">
      <template #default="scope">
      <el-image style="width: 130px;
       height: 100px"
        :src="scope.row.aaa"
        :preview-src-list="[scope.row.aaa]"
        :hide-on-click-modal="true" 
        :close-on-press-escape="true"
        :z-index="10"
         />
    </template>
    </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
      </el-main>
    </div>
    </el-col>
  </el-row>
</div>
</template>
<script lang="ts" setup>
// 引用小图标
import {Management,User,Crop,ShoppingBag,Notebook,DataAnalysis} from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index, row) => {
}
const handleDelete = (index, row) => {
}


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    aaa:'https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg'
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
    aaa:'https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg'
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
    aaa:'https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg'
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    aaa:'https://n.sinaimg.cn/translate/200/w1080h720/20180909/IcUS-hivtsyk4014010.jpg'
  },
]

</script>
<style>
*{
  margin: 0;
  padding: 0;
}
.father{
  width: 100%;
  background-color: #363d3d;
  color: #fff;
  height: 150px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
}
.title1 {
  margin-left: 30px;
}
.tac{
  display: block;
}
.el-menu {
  width: 300px;
}
.el-col-12 {
  max-width: 100%;
  height: 100%;
}
.el-sub-menu__title{
  color: #fff;
}
.el-menu-item{
  color: #fff;
}
.el-menu--vertical{
  height: 883px;
}
.el-header{
  padding: 0;
}
.father2 {
  display: flex;
}
.el-table .el-table__cell{
  z-index: initial;
}


</style>