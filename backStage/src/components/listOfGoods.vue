<template>
  <el-main>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="商品名称" prop="date" />
      <el-table-column label="介绍" prop="name" />
      <el-table-column label="价格" prop="name" />
      <!-- <el-table-column label="图片" prop="name" /> -->
      <el-table-column label="图片" align="center">
        <template #default="scope">

          <el-image style="width: 130px;
height: 100px" :src="scope.row.aaa" :preview-src-list="[scope.row.aaa]" :hide-on-click-modal="true"
            :close-on-press-escape="true" :z-index="10" />

        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};

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

<style lang="less" scoped>
.el-table .el-table__cell {
  z-index: initial;
}
</style>